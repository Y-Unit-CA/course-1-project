import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';


export const routes: Routes = [
    { path: '', component: Home },  // passing with no parameters
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect any unknown paths to home
];
