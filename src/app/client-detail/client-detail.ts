// client-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-detail.html',
  styleUrls: ['./client-detail.css']
})
export class ClientDetail implements OnInit {
  client: any = null;
  isLoading = true;
  errorMessage = '';
  clientId: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

 ngOnInit() {
    // Get ID from route parameters
    this.clientId = this.route.snapshot.paramMap.get('id');
    
    if (!this.clientId) {
      this.errorMessage = 'Invalid client ID';
      this.isLoading = false;
      return;
    }

    this.fetchClientDetails();
  }

 fetchClientDetails() {
    this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${this.clientId}`)
      .subscribe({
        next: (data) => {
          this.client = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('API Error:', err);
          this.errorMessage = 'Failed to load client details. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  retry() {
    this.isLoading = true;
    this.errorMessage = '';
    this.fetchClientDetails();
  }
}