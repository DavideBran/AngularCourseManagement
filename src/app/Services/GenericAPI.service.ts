import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})


// generic API caller, this class will do all the call (Get, Delete, Post, Put, Patch) to every API 
export class GenericAPIService{

    constructor(private http: HttpClient) { }

    // Specific Request Creator
    get<T>(url: string, options?: any, withCredential?: boolean) {
        return this.makeRequest<T>('GET', url, undefined, options, withCredential);
    }

    delete<T>(url: string, options?: any, withCredential?: boolean) {
        return this.makeRequest<T>('DELETE', url, options, withCredential);
    }

    post<T>(url: string, body: any, options?: any, withCredential?: boolean) { 
        return this.makeRequest<T>('POST', url, body, options, withCredential);
    }

    patch<T>(url: string, body: any, options?: any, withCredential?: boolean) { 
        return this.makeRequest<T>('PATCH', url, body, options, withCredential);
    }

    put<T>(url: string, body: any, options?: any, withCredential?: boolean) { 
        return this.makeRequest<T>('PUT', url, body, options, withCredential);
    }



    // Generic Request Creator
    makeRequest<T>(method: string, url: string, body?: any, options?: any, withCredential?: boolean) {
        method = method.toUpperCase();

        // Checking if the body is present or not (it depend on the method of the call i wanna do)
        if (method == 'DELETE' || method == 'GET') {
            if (body) {
                throw new Error('Delete And Get do not Require A body');
            }
        }
        else if (!body) {
            throw new Error('Post, Put and Patch Require A Body for The request');
        }

        // Checking the presence of the Options
        if (!options) options = {};
        
        if (!options.params) options.params = {};
    

        // Checking if the Credential are needed
        if (withCredential) {
            const token = window.localStorage.getItem('token');
            if (token) {
                options.params.token = token;
            } else {
                options.withCredential = withCredential
            }
        }

        if (body) options.body = body;

        // To make the HTTPClient "observe" the body of the response we use the options.observe = 'body' so it will observe only the 
        // body of the response and not the other metadata for example
        options.observe = 'body';

        return this.http.request<T>(method, url, options) as Observable<T>;
    }
}