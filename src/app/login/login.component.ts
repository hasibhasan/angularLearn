import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service'; 
import { AuthenticationService } from '../services/authentication.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    data; any;
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService) { }
 
    ngOnInit() {
        // reset login status
        this.userService.getData().subscribe(data => {this.data = data;console.log(this.data);});           
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}