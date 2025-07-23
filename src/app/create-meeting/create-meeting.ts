import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-meeting',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-meeting.html',
  styleUrls: ['./create-meeting.css']
})
export class CreateMeeting {
  // Form data
  meetingTopic = 'Quarterly Planning Session';
  participants = 12;
  meetingDescription = 'Discussion of Q3 goals and resource planning for upcoming projects.';
  
  // Calendar state
  selectedDate: Date | null = new Date(2023, 6, 16); // July 16, 2023
  selectedTime = '1:00 PM';
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendarDays: any[] = [];
  
  // Time slots
  timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  // Confirmation data
  get confirmationDate(): string {
    if (!this.selectedDate) return 'Not selected';
    return this.selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  get confirmationTime(): string {
    if (!this.selectedTime) return 'Not selected';
    
    // Calculate end time (1 hour later)
    const timeParts = this.selectedTime.split(':');
    let hour = parseInt(timeParts[0]);
    const period = timeParts[1].split(' ')[1];
    
    if (period === 'PM' && hour < 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    const endHour = (hour + 1) % 24;
    const endPeriod = endHour >= 12 ? 'PM' : 'AM';
    const displayHour = endHour % 12 || 12;
    
    return `${this.selectedTime} - ${displayHour}:00 ${endPeriod}`;
  }
  
  constructor() {
    this.generateCalendar();
  }
  
  // Generate calendar for current month
  generateCalendar(): void {
    this.calendarDays = [];
    
    // Get first day of month and number of days
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay(); // 0 = Sunday
    
    // Previous month days
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    
    // Fill in previous month days
    for (let i = startDay; i > 0; i--) {
      this.calendarDays.push({
        day: prevMonthLastDay - i + 1,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = this.currentYear === today.getFullYear() && 
                     this.currentMonth === today.getMonth() && 
                     i === today.getDate();
                     
      const isSelected = this.selectedDate && 
                       this.selectedDate.getDate() === i && 
                       this.selectedDate.getMonth() === this.currentMonth && 
                       this.selectedDate.getFullYear() === this.currentYear;
                     
      this.calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isToday: isToday,
        isSelected: isSelected
      });
    }
  }
  
  // Select a date
  selectDate(day: any): void {
    if (!day.isCurrentMonth) return;
    
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day.day);
    this.generateCalendar();
  }
  
  // Select a time slot
  selectTime(time: string): void {
    this.selectedTime = time;
  }
  
  // Navigate to previous month
  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }
  
  // Navigate to next month
  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }
  
  // Reset form
  resetForm(): void {
    this.meetingTopic = '';
    this.participants = 0;
    this.meetingDescription = '';
    this.selectedDate = null;
    this.selectedTime = '';
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }
  
  // Schedule meeting
  scheduleMeeting(): void {
    if (!this.meetingTopic || !this.participants || !this.selectedDate || !this.selectedTime) {
      alert('Please fill all required fields');
      return;
    }
    
    // Here you would typically call an API service
    console.log('Scheduling meeting:', {
      topic: this.meetingTopic,
      participants: this.participants,
      date: this.selectedDate,
      time: this.selectedTime,
      description: this.meetingDescription
    });
    
    // Show success message
    alert('Meeting scheduled successfully!');
  }
}