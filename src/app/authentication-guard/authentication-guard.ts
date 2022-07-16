import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionService
    ) {
    }

    canActivate(): boolean {
        if (!this.sessionService.activeSession()) {
            return true;
        }

        this.router.navigate(['/home']);
        return false;
    }
}