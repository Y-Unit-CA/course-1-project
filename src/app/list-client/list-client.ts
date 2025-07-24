// list-client.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-client.html',
  styleUrls: ['./list-client.css']
})
export class ListClient implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';
  activeFilter = 'all';
  stats = {
    total: 0,
    vip: 0,
    activeProjects: 5,
    revenue: 42800
  };

  filters = [
    { id: 'all', name: 'All Clients' },
    { id: 'active', name: 'Active' },
    { id: 'prospects', name: 'Prospects' },
    { id: 'vip', name: 'VIP' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => {
          this.clients = data;
          this.filteredClients = [...data];
          this.isLoading = false;
          this.calculateStats();
        },
        error: (err) => {
          this.errorMessage = 'Failed to load clients. Please try again later.';
          this.isLoading = false;
          console.error('API Error:', err);
        }
      });
  }

  calculateStats(): void {
    this.stats.total = this.clients.length;
    this.stats.vip = this.clients.filter(client => client.id % 3 === 0).length;
  }

  applyFilter(): void {
    let filtered = [...this.clients];
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.company.name.toLowerCase().includes(term)
      );
    }
    
    if (this.activeFilter === 'vip') {
      filtered = filtered.filter(client => client.id % 3 === 0);
    } else if (this.activeFilter === 'active') {
      filtered = filtered.filter(client => client.id % 2 === 0);
    } else if (this.activeFilter === 'prospects') {
      filtered = filtered.filter(client => client.id % 5 === 0);
    }
    
    this.filteredClients = filtered;
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  formatPhone(phone: string): string {
    return phone.split(' ')[0];
  }

  getStatusClass(client: any): string {
    return client.id % 3 === 0 ? 'bg-warning' : 'bg-success';
  }

  getStatusText(client: any): string {
    return client.id % 3 === 0 ? 'VIP' : 'Active';
  }
}