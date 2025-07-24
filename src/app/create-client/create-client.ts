import { Component } from '@angular/core';

@Component({
  selector: 'app-create-client',
  imports: [],
  templateUrl: './create-client.html',
  styleUrl: './create-client.css'
})
export class CreateClient {

  onSubmit() {
    console.log('Client Added Successfully');
  }
}

