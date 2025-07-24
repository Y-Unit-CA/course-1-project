import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router'; // Import RouterModule and NavigationEnd

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet], // Add required imports
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})

export class App {
  title = 'Client and Meeting Management App';
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
