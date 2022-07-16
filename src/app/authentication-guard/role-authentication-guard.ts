import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
export class RoleAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private sessionService: SessionService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.sessionService.activeSession()) {
            const role = this.sessionService.getLoggedUserRole();

            if (route.data['roles'] && route.data['roles'].indexOf(role) !== -1) {
                return true;
            }

            this.router.navigate(['/home']);
        }


        this.router.navigate(['/login']);
        return false;
    }
}