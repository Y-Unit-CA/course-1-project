import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMeeting } from './list-meeting';

describe('ListMeeting', () => {
  let component: ListMeeting;
  let fixture: ComponentFixture<ListMeeting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMeeting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMeeting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
