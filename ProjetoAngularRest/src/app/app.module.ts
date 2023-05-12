import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes}from'@angular/router';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add.component';
import { GuardRotaGuard } from './service/guard-rota.guard';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxCurrencyModule } from "ngx-currency";




export const appRouters: Routes =[
  {path: 'home', component: HomeComponent, canActivate: [GuardRotaGuard]},
  {path: 'login', component: LoginComponent},
  {path:'userlista', component: UsuarioComponent, canActivate: [GuardRotaGuard]},
  {path:'' , component: LoginComponent},
  { path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardRotaGuard] },
  { path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardRotaGuard] },
  ];

export const routes : ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionsMask : Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgxCurrencyModule
    
    
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
