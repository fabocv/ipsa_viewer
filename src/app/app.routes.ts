import { Routes } from '@angular/router';
import { MainComponent } from './ipsa/components/main-component/main-component';

export const routes: Routes = [
    { path: 'ipsa', component: MainComponent },
    { path: '', redirectTo: '/ipsa', pathMatch: 'full' }
];
