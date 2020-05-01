import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseService } from './services/course.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoursesListComponent, CreateCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CourseService],
  exports: [CoursesListComponent, CreateCourseComponent]
})
export class CourseModule { }
