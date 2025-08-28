import { Component, OnInit } from '@angular/core';
import { CourseReserveService } from '../../services/course-reserve.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  isLoading = false;
  errorMessage = '';
  constructor(private courseService: CourseReserveService) {}

  ngOnInit(): void {
    this.loadCourses();
  }
  loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.isLoading = false;
        console.log(res);
        
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.errorMessage = 'خطا در دریافت دوره‌ها';
        this.isLoading = false;
      }
    });
  }

  reserve(courseId: number | string) {
    this.courseService.reserveCourse(courseId).subscribe({
      next: (res) => {
        console.log('Course reserved successfully:', res);
        this.loadCourses(); 
      },
      error: (err) => {
        console.error('Error reserving course:', err);
      }
    });
  }

  cancelReservation(reservationId: number | string) {
    this.courseService.cancelReservation(reservationId).subscribe({
      next: (res) => {
        console.log('Reservation canceled:', res);
        this.loadCourses();
      },
      error: (err) => {
        console.error('Error canceling reservation:', err);
      }
    });
  }
}
