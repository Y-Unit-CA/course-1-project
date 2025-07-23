import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router'; // Import RouterModule and NavigationEnd
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet], // Add required imports
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

@NgModule({
  imports: [
    // ...
    FormsModule,
    ReactiveFormsModule
  ]
})

export class App {
  activeTab = 'home';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveTab(event.url);
      }
    });
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  updateActiveTab(url: string) {
    if (url === '/') {
      this.activeTab = 'home';
    } else if (url.includes('createClient')) {
      this.activeTab = 'createClient';
    } else if (url.includes('listClient')) {
      this.activeTab = 'listClient';
    } else if (url.includes('createMeeting')) {
      this.activeTab = 'createMeeting';
    } else if (url.includes('listMeeting')) {
      this.activeTab = 'listMeeting';
    }
  }
}
