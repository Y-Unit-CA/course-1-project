// app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CreateClient } from './create-client/create-client';
import { ListClient } from './list-client/list-client';
import { CreateMeeting } from './create-meeting/create-meeting';
import { ListMeeting } from './list-meeting/list-meeting';
import { ClientDetail } from './client-detail/client-detail';

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
    path: 'clientDetail/:id',  // Use parameter for client id
    component: ClientDetail,
    data: { tab: 'clientDetail' }
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