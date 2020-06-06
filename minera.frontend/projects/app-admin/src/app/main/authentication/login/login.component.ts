import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { fuseAnimations } from "../../../../@fuse/animations";
import { FuseConfigService } from "../../../../@fuse/services/config.service";
import { LoginService } from "../../services/login.service";
import { LoginModel } from "../../models/login-model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs/operators";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage = false;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private service: LoginService,
        private route: ActivatedRoute,
        private routerLink: Router,
        private _snackBar: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            // email: ['', [Validators.required, Validators.email]],
            login: ["", [Validators.required]],
            senha: ["", [Validators.required]]
        });
        if (localStorage.getItem("token")) {
            this.routerLink.navigateByUrl("/");
        }
    }

    login() {
        const body = {
            username: this.loginForm.get('login').value,
            password: this.loginForm.get('senha').value
          }
        this.service.login(body).subscribe((response) => {
            if (response.token != null && response.token != undefined) {
                this.routerLink.navigate(["/monitoramento/"]);
                this.service.setToken(response.token);
            } else {
                this.errorMessage = true;
            }

        });
    }

    private _subscribeAction(): (value: any) => void {
        return res => {

            this.service.setToken(JSON.stringify(res.data.token));

            this.service.getUsuario().subscribe(
                (res: any) => {
                    console.log("-->" + res.data)
                    if (res.data && res.data.nome) {

                        this.service.setUser({
                            usuario: JSON.stringify(res.data.nome).replace(
                                /"/g,
                                ""
                            )
                        });
                    } else {
                        // this.service.setUser({
                        //     operador: JSON.stringify(
                        //         res.data.operador.nome
                        //     ).replace(/"/g, ""),
                        //     tipoUsuario: JSON.stringify(
                        //         res.data.tipoUsuario
                        //     ).replace(/"/g, "")
                        // });
                    }

                    this.routerLink.navigateByUrl("/monitoramento");
                }
            );
        };
    }
}
