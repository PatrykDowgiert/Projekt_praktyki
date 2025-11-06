import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { SurveyService } from '../../services/survey';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './survey-create.html',
  styleUrls: ['./survey-create.css']
})
export class SurveyCreateComponent implements OnInit {

  surveyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router 
  ) {
    this.surveyForm = this.fb.group({}); 
  }
  
  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      pages: this.fb.array([])
    });
    this.addPage();
  }

  get pages(): FormArray {
    return this.surveyForm.get('pages') as FormArray;
  }

  newPage(pageNumber: number): FormGroup {
    return this.fb.group({
      pageNumber: [pageNumber],
      questions: this.fb.array([])
    });
  }

  addPage(): void {
    const pageNumber = this.pages.length + 1;
    this.pages.push(this.newPage(pageNumber));
    this.addQuestion(this.pages.length - 1);
  }

  getQuestions(pageIndex: number): FormArray {
    return this.pages.at(pageIndex).get('questions') as FormArray;
  }

  newQuestion(questionOrder: number): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      questionType: [1, Validators.required],
      questionOrder: [questionOrder]
    });
  }

  addQuestion(pageIndex: number): void {
    const questionOrder = this.getQuestions(pageIndex).length + 1;
    this.getQuestions(pageIndex).push(this.newQuestion(questionOrder));
  }
  

  onSubmit(): void {
    if (!this.surveyForm.valid) {
      console.error('Formularz jest niepoprawny! Wypełnij wymagane pola.');
      return;
    }

    const surveyData = this.surveyForm.value;
    
    console.log('Wysyłanie danych do API:', surveyData);

    this.surveyService.createSurvey(surveyData).subscribe(
      (response) => {
        console.log('Ankieta została zapisana!', response);
        
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Błąd podczas zapisywania ankiety:', error);
      }
    );
  }
}