// create-client.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './create-client.html',
  styleUrls: ['./create-client.css']
})
export class CreateClient {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      address: this.fb.group({
        street: [''],
        city: [''],
        zipcode: ['']
      })
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      // In a real app, you would send this to your backend
      console.log('Client created:', this.clientForm.value);
      
      // Show success message
      alert('Client created successfully!');
      
      // Navigate back to client list
      this.router.navigate(['/listClient']);
    }
  }

  onCancel() {
    this.router.navigate(['/listClient']);
  }
}