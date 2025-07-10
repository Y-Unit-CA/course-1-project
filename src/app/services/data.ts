import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Data {
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }
  getPosts() {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
