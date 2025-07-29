import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Activity {
  description: string;
  time: string;
  category: string;
  type: 'client' | 'meeting';
}

interface Meeting {
  time: string;
  title: string;
  client: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
    
export class Home implements OnInit {
  // Dashboard statistics
  totalClients = 24;
  totalMeetings = 156;
  upcomingMeetings = 8;
  completedMeetings = 12;
  
  recentActivities: Activity[] = [];
  todaysMeetings: Meeting[] = [];
  
  // Loading states
  isLoading = true;
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  private loadDashboardData(): void {
    // Simulate loading data - replace with actual service calls
    setTimeout(() => {
      this.loadRecentActivities();
      this.loadTodaysSchedule();
      this.isLoading = false;
    }, 1000);
  }
  
  private loadRecentActivities(): void {
    this.recentActivities = [
      {
        description: 'New client "John Smith" was added',
        time: '2 hours ago',
        category: 'Client',
        type: 'client'
      },
      {
        description: 'Meeting with Sarah Johnson scheduled for tomorrow',
        time: '4 hours ago',
        category: 'Meeting',
        type: 'meeting'
      },
      {
        description: 'Client "ABC Corp" information updated',
        time: '1 day ago',
        category: 'Client',
        type: 'client'
      },
      {
        description: 'Meeting with Tech Solutions completed',
        time: '2 days ago',
        category: 'Meeting',
        type: 'meeting'
      },
      {
        description: 'New client "Marketing Pro" was added',
        time: '3 days ago',
        category: 'Client',
        type: 'client'
      }
    ];
  }
  
  private loadTodaysSchedule(): void {
    this.todaysMeetings = [
      {
        time: '09:00',
        title: 'Project Review',
        client: 'John Smith'
      },
      {
        time: '11:30',
        title: 'Client Onboarding',
        client: 'New Ventures LLC'
      },
      {
        time: '14:30',
        title: 'Quarterly Planning',
        client: 'ABC Corp'
      },
      {
        time: '16:00',
        title: 'Initial Consultation',
        client: 'Potential Client'
      }
    ];
  }
  
  getBadgeClass(type: string): string {
    const badgeClasses: { [key: string]: string } = {
      'client': 'bg-primary',
      'meeting': 'bg-warning'
    };
    return badgeClasses[type] || 'bg-secondary';
  }
}