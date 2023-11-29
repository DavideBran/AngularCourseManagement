import { Injectable } from "@angular/core";
import { GenericAPIService } from "./GenericAPI.service";
import { Subject, Subscription, catchError, map } from "rxjs";
import { IUser } from "../Contracts/IUser";


@Injectable({
    providedIn: 'root'
})

export class UserAPIService {
    private nonceURL = 'http://localhost:5228/Course/Costumer/login';
    private loginURL = 'http://localhost:5228/Course/Costumer/login/verify';
    private roleURL = 'http://localhost:5228/Course/isLabAdmin';
    private verifyURL = 'http://localhost:5228/Course/Costumer/verify';

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
                            next: (userInfo) => loginSubject.next(userInfo),
                            complete: () => loginSubscription.unsubscribe()
                        });
                },
                error: (err) => console.log(err),
                complete: () => nonceSubscription.unsubscribe()
            }
        );
        return loginSubject.asObservable();
    }

    isLabAdmin(email: string) {
        return this.APICaller.get<Response>(
            this.roleURL,
            {
                params: {
                    email: email
                },
            },
            undefined,
            "response"
        ).pipe(
            map((labAdminResponse) => labAdminResponse.ok)
        );
    }

    verifyUser(email: string) {
        return this.APICaller.get<Response>(this.verifyURL,
            {
                params: {
                    email: email
                }
            },
            undefined,
            "response"
        ).pipe(
            map((verifyResponse) => {
                if(verifyResponse.status === 200) return true; 
                if(verifyResponse.status === 401) return false; 
                else throw Error(); 
            })
        );
    }
}