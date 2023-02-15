import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	localId: string;
	expiresIn: string;
	registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	user = new BehaviorSubject<User>(null);
	private tokenExpirationTimer: any;

	constructor(private http: HttpClient, private router: Router) { }

	signup(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATdOIjqJlbhaj_fLBfushmmiV0dQgB3Bw',
			{
				email,
				password,
				returnSecureToken: true,
			}
		).pipe(catchError(this.handleError), tap(data => this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn))) 
	}

	login(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATdOIjqJlbhaj_fLBfushmmiV0dQgB3Bw',
			{
				email,
				password,
				returnSecureToken: true,
			}).pipe(catchError(this.handleError), tap(data => this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn)))
	}

	autoLogin() {
		const userData = JSON.parse(localStorage.getItem('userData'));
		if(!userData) return;

		const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

		if (loadedUser.token) {
			this.user.next(loadedUser);
			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
			this.autoLogout(expirationDuration);
		}
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = 'Unknown error';
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}
		switch (errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				errorMessage = 'This email exists already';
				break;
			case 'EMAIL_NOT_FOUND':
				errorMessage = 'This email was not found';
				break;
			case 'INVALID_PASSWORD':
				errorMessage = 'This password is not correct';
				break;
		}

		return throwError(errorMessage);
	}

private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
	const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
	const user = new User(
		email, 
		userId, 
		token, 
		expirationDate);

		this.user.next(user);
		this.autoLogout(expiresIn * 1000);
		localStorage.setItem('userData', JSON.stringify(user));
}

autoLogout(expirationDuration: number) {
 this.tokenExpirationTimer = setTimeout(() => {
	this.logout();
}, expirationDuration)
}

logout(){
	this.user.next(null);
	this.router.navigate(['/auth']);
	localStorage.removeItem('userData');

	if(this.tokenExpirationTimer) {
		clearTimeout(this.tokenExpirationTimer);
	}
}

}