// client-detail.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-detail.html',
  styleUrls: ['./client-detail.css']
})
export class ClientDetail {
  client: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe({
        next: (data) => {
          this.client = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load client details. Please try again later.';
          this.isLoading = false;
        }
      });
  }
}