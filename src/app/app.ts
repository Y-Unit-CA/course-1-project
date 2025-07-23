import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Data } from './services/data';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected title = 'simplilearn-course-1-project-client-management-app';

  posts: Post[] = [];

  constructor(private router: Router, private dataService: Data) {
    console.log('App component constructor executed!');
  }

  onGetData(): void {
    this.dataService.getPosts().subscribe({
      next: (data) => {
        console.log(data);
        this.posts = data;
      },
      error: (err) => {
        console.error(`Error: ${ JSON.stringify(err) }`);
      },
    });
    console.log("onGetData() executed!");
  }
}