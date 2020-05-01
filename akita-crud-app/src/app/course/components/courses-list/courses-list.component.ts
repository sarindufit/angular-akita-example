import { CourseQuery } from './../../store/course.query';
import { CourseService } from './../../services/course.service';
import { CourseState } from './../../store/course.store';
import { tap, switchMap, filter } from 'rxjs/operators';
import { Course } from './../../model/course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit, OnDestroy {

  courseToBeUpdated: Course;

  isUpdateActivated = false;

  listCoursesSub: Subscription;

  deleteCourseSub: Subscription;

  updateCourseSub: Subscription;

  cstate: CourseState;

  courses$: Observable<Course[]> = this.courseQuery.selectAll();

  constructor(private courseService: CourseService, private courseQuery: CourseQuery) {
  }

  ngOnInit() {
    this.listCoursesSub = this.courseQuery.selectAreCoursesLoaded$.pipe(
      filter(areCoursesLoaded => !areCoursesLoaded),
      switchMap(areCoursesLoaded => {
        if (!areCoursesLoaded) {
          return this.courseService.getAllCourses();
        }
      })
    ).subscribe(result => {});
  }

  deleteCourse(courseId: string) {
    this.deleteCourseSub = this.courseService.deleteCourse(courseId).subscribe(result => {
      console.log(result);
    });
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm) {
    this.updateCourseSub = this.courseService.updateCourse(
      this.courseToBeUpdated.id, updateForm.value).subscribe(result => console.log(result)
    );
    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }

  ngOnDestroy() {
    if (this.listCoursesSub) {
      this.listCoursesSub.unsubscribe();
    }

    if (this.deleteCourseSub) {
      this.deleteCourseSub.unsubscribe();
    }

    if (this.updateCourseSub) {
      this.updateCourseSub.unsubscribe();
    }
  }
}
