import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'simplilearn-course-1-project-client-management-app';
}

// Service with HttpClient
posts: Post[] = [];

onGetData(): void {
  this.dataService.getPosts().subscribe({
      next: (data) => {
      console.log(data);
      this.posts = data;
    },
    
    error: (err) => {
    console.error('Error: ${ JSON.stringify(err) }')
    },
  }
);

console.log("onGetData() executed!");
}

// Dependency Injection
constructor(private router: Router, private dataService: Data) {
  console.log('App component constructor executed!');
}