import { NgModule } from '@angular/core';
import { MailConfirmModule } from './mail-confirm/mail-confirm.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';


@NgModule({
    imports: [
        // Authentication
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        MailConfirmModule
    ]
})
export class AuthenticationModule {

}
