// list-meeting.component.ts
import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-meeting',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-meeting.html',
  styleUrls: ['./list-meeting.css']
})
export class ListMeeting implements OnInit {
  meetings: any[] = [];
  filteredMeetings: any[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';
  statusFilter = 'all';
  sortField = 'date';
  sortDirection = 'desc';

  // Computed properties for statistics
  totalMeetings = computed(() => this.filteredMeetings.length);
  confirmedMeetings = computed(() => 
    this.filteredMeetings.filter(m => m.status === 'confirmed').length
  );
  pendingMeetings = computed(() => 
    this.filteredMeetings.filter(m => m.status === 'pending').length
  );
  upcomingMeetings = computed(() => 
    this.filteredMeetings.filter(m => new Date(m.date) > new Date()).length
  );

  // Mock clients for display (in a real app, you'd fetch from your API)
  clients = [
    { id: 1, name: 'Leanne Graham', company: 'Bret Inc' },
    { id: 2, name: 'Ervin Howell', company: 'Antonette LLC' },
    { id: 3, name: 'Clementine Bauch', company: 'Samantha Enterprises' },
    { id: 4, name: 'Patricia Lebsack', company: 'Karianne Group' },
    { id: 5, name: 'Chelsey Dietrich', company: 'Kamren Industries' }
  ];

  // Filters for the meeting list
  filters = [
    { id: 'all', name: 'All Meetings' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'past', name: 'Past' },
    { id: 'today', name: 'Today' }
  ];

  // Sort options
  sortOptions = [
    { id: 'date', name: 'Date' },
    { id: 'client', name: 'Client' },
    { id: 'title', name: 'Title' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // In a real app, you would fetch meetings from your API
    // For now, we'll use mock data
    this.loadMeetings();
  }

  loadMeetings(): void {
    this.isLoading = true;
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock meeting data
      this.meetings = [
        {
          id: 1,
          title: 'Quarterly Strategy Session',
          clientId: 1,
          date: new Date('2023-12-15T10:00:00'),
          duration: 90,
          participants: 8,
          description: 'Discussion of Q1 goals and strategy',
          status: 'confirmed'
        },
        {
          id: 2,
          title: 'Product Demo',
          clientId: 3,
          date: new Date('2023-12-18T14:30:00'),
          duration: 60,
          participants: 5,
          description: 'Demo of new features for client',
          status: 'confirmed'
        },
        {
          id: 3,
          title: 'Contract Renewal',
          clientId: 2,
          date: new Date('2023-12-20T09:00:00'),
          duration: 45,
          participants: 3,
          description: 'Renewal discussion and terms negotiation',
          status: 'pending'
        },
        {
          id: 4,
          title: 'Team Alignment',
          clientId: 5,
          date: new Date('2023-12-22T11:00:00'),
          duration: 60,
          participants: 6,
          description: 'Alignment on project deliverables',
          status: 'confirmed'
        },
        {
          id: 5,
          title: 'Year-End Review',
          clientId: 4,
          date: new Date('2023-12-28T13:00:00'),
          duration: 120,
          participants: 10,
          description: 'Annual performance review and planning',
          status: 'pending'
        },
        {
          id: 6,
          title: 'Technical Workshop',
          clientId: 3,
          date: new Date('2024-01-05T10:00:00'),
          duration: 180,
          participants: 12,
          description: 'Hands-on technical training session',
          status: 'confirmed'
        }
      ];
      
      this.filteredMeetings = [...this.meetings];
      this.applyFilters();
      this.isLoading = false;
    }, 1000);
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  }

  getClientCompany(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.company : 'Unknown Company';
  }

  applyFilters(): void {
    const now = new Date();
    
    let filtered = [...this.meetings];
    
    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(meeting => meeting.status === this.statusFilter);
    }
    
    // Apply date filters
    if (this.statusFilter === 'upcoming') {
      filtered = filtered.filter(meeting => new Date(meeting.date) > now);
    } else if (this.statusFilter === 'past') {
      filtered = filtered.filter(meeting => new Date(meeting.date) < now);
    } else if (this.statusFilter === 'today') {
      filtered = filtered.filter(meeting => {
        const meetingDate = new Date(meeting.date);
        return meetingDate.toDateString() === now.toDateString();
      });
    }
    
    // Apply search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(meeting => 
        meeting.title.toLowerCase().includes(term) ||
        meeting.description.toLowerCase().includes(term) ||
        this.getClientName(meeting.clientId).toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = this.getSortValue(a);
      const bValue = this.getSortValue(b);
      
      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    this.filteredMeetings = filtered;
  }

  getSortValue(meeting: any): any {
    switch (this.sortField) {
      case 'date': return new Date(meeting.date);
      case 'client': return this.getClientName(meeting.clientId);
      case 'title': return meeting.title;
      default: return meeting.id;
    }
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  setFilter(filter: string): void {
    this.statusFilter = filter;
    this.applyFilters();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed': return 'badge bg-success';
      case 'pending': return 'badge bg-warning';
      case 'cancelled': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  }
}