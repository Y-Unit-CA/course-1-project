// create-meeting.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.html',
  styleUrls: ['./create-meeting.css']
})
export class CreateMeeting {
  schedulerForm: FormGroup;
  minDate: Date = new Date();
  timeSlots: string[] = this.generateTimeSlots();

  constructor(private fb: FormBuilder) {
    this.schedulerForm = this.fb.group({
      topic: ['', [Validators.required, Validators.maxLength(100)]],
      participants: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  private generateTimeSlots(): string[] {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour}:00`, `${hour}:30`);
    }
    return slots;
  }

  onSubmit(): void {
    if (this.schedulerForm.valid) {
      const formValue = this.schedulerForm.value;
      const meetingData = {
        topic: formValue.topic,
        participants: formValue.participants,
        datetime: new Date(
          formValue.date.getFullYear(),
          formValue.date.getMonth(),
          formValue.date.getDate(),
          parseInt(formValue.time.split(':')[0]),
          parseInt(formValue.time.split(':')[1])
        )
      };
      console.log('Scheduled Meeting:', meetingData);
      // Add your submission logic here (e.g., API call)
    }
  }
}