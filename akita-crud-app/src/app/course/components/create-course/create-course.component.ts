import { Subscription } from 'rxjs';
import { CourseService } from './../../services/course.service';
import { CourseStore } from './../../store/course.store';
import { Course } from './../../model/course.model';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  createCourseSub: Subscription;

  constructor(private store: CourseStore, private courseService: CourseService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    const course: Course = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
    this.createCourseSub = this.courseService.createCourse(course).subscribe(result => {
      this.router.navigateByUrl('/courses');
    });
  }
}
