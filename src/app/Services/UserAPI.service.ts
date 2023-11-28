import { Injectable } from "@angular/core";
import { GenericAPIService } from "./GenericAPI.service";
import { Observable, Subject, Subscription } from "rxjs";
import { IUser } from "../Contracts/IUser";


@Injectable({
    providedIn: 'root'
})

export class UserAPIService {
    private nonceURL = 'http://localhost:5228/Course/Costumer/login';
    private loginURL = 'http://localhost:5228/Course/Costumer/login/verify';
    private roleURL = 'http://localhost:5228/Course/isLabAdmin';

    private async hashSHA256(password: string) {
        const buffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }


    private async getLoginRequest(email: string, password: string, nonce: string) {
        password = await this.hashSHA256(password);

        const codifiedPassword = password + nonce;

        return this.APICaller.get<IUser>(
            this.loginURL,
            {
                params: {
                    Email: email,
                    codifiedPassword: codifiedPassword
                }
            }
        );
    }

    private getUserRole(email: string) {
        return this.APICaller.get<string>(
            this.roleURL,
            {
                params: {
                    email: email
                },
            }
        );
    }

    constructor(private APICaller: GenericAPIService) { }


    async login(email: string, password: string) {
        const loginSubject: Subject<IUser> = new Subject<IUser>();


        const getNonce$ = this.APICaller.get<string>(
            this.nonceURL,
            {
                params: { email: email },
                responseType: 'text'
            }
        );

        // Starting the Login request 
        const nonceSubscription: Subscription = getNonce$.subscribe(
            {
                next: async (nonce) => {
                    // generating the login request, with the nonce
                    const login$ = await this.getLoginRequest(email, password, nonce);

                    const loginSubscription: Subscription = login$.subscribe(
                        {
                            next: (userInfo) => {
                                // Taking the userRole for the Course API (in other word checking if the role is LabAdmin)
                                const userRole$ = this.getUserRole(email);
                                const userRoleSubscription: Subscription = userRole$.subscribe(
                                    {
                                        next: () => {
                                            userInfo.role = "LABADMIN";
                                            loginSubject.next(userInfo);
                                        },
                                        error: (err) => {
                                            // if the user is NOT labAdmin the API will return 400
                                            if (err.status == 400) {
                                                loginSubject.next(userInfo);
                                            }
                                            // if the status code is not 400 somethings gone wrong
                                            else console.log(err); 
                                        },
                                        complete: () => userRoleSubscription.unsubscribe()
                                    }
                                );
                            },
                            error: (err) => console.log(err),
                            complete: () => loginSubscription.unsubscribe()
                        }
                    );

                },
                error: (err) => console.log(err),
                complete: () => nonceSubscription.unsubscribe()
            }
        );
        return loginSubject.asObservable();
    }
}