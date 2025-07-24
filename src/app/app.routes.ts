import { Routes, RouterModule } from '@angular/router';
import { Home } from './home/home'; // Your actual component name
import { CreateClient } from './create-client/create-client'; 
import { ListClient } from './list-client/list-client';
import { CreateMeeting } from './create-meeting/create-meeting';
import { ListMeeting } from './list-meeting/list-meeting';


export const routes: Routes = [
    { 
        path: '', 
        component: Home,
        data: { tab: 'home' }
    },
    { 
        path: 'createClient', 
        component: CreateClient,
        data: { tab: 'createClient' }
    },
    { 
        path: 'listClient', 
        component: ListClient,
        data: { tab: 'listClient' }
    },
    { 
        path: 'createMeeting', 
        component: CreateMeeting,
        data: { tab: 'createMeeting' }
    },
    { 
        path: 'listMeeting', 
        component: ListMeeting,
        data: { tab: 'listMeeting' }
    },
    { 
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full' 
    }
];
