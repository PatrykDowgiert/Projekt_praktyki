// W pliku: src/app/components/survey-fill/survey-fill.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Dodajemy Router
import { SurveyService } from '../../services/survey';

// 1. Importujemy narzędzia do formularzy
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-fill',
  standalone: true,
  // 2. Dodajemy ReactiveFormsModule do importów
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './survey-fill.html',
  styleUrls: ['./survey-fill.css']
})
export class SurveyFillComponent implements OnInit {

  public survey: any = null;
  public isLoading = true;
  public error: string | null = null;

  // 3. Dodajemy główną "pudełko" na nasz formularz odpowiedzi
  public responseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private fb: FormBuilder, // 4. Wstrzykujemy FormBuilder
    private router: Router // Wstrzykujemy Router do przekierowania po wysłaniu
  ) {
    // Inicjalizujemy pusty formularz, aby uniknąć błędów
    this.responseForm = this.fb.group({});
  }

  ngOnInit(): void {
    const idFromUrl = this.route.snapshot.paramMap.get('id');

    if (idFromUrl) {
      const surveyId = +idFromUrl;

      this.surveyService.getSurveyById(surveyId).subscribe(
        (data) => {
          this.survey = data;
          this.isLoading = false;
          console.log('Pobrano dane ankiety:', this.survey);
          
          // 5. Po pobraniu danych, ZBUDUJ formularz
          this.buildResponseForm(this.survey);
        },
        (err) => {
          console.error('Błąd pobierania ankiety:', err);
          this.error = 'Nie udało się załadować ankiety.';
          this.isLoading = false;
        }
      );
    } else {
      this.error = 'Brak ID ankiety w adresie URL.';
      this.isLoading = false;
    }
  }

  // 6. Ta metoda dynamicznie buduje formularz na podstawie danych
  buildResponseForm(survey: any): void {
    // Nasz formularz będzie miał DTO: { surveyId: ..., answers: [...] }
    this.responseForm = this.fb.group({
      surveyId: [survey.surveyId], // Zapisujemy ID ankiety
      answers: this.fb.array([]) // Tablica na odpowiedzi
    });

    // Pętla przez wszystkie strony i pytania, aby zbudować płaską listę odpowiedzi
    survey.pages.$values.forEach((page: any) => {
      page.questions.$values.forEach((question: any) => {
        // Dla każdego pytania, dodaj nową "grupę odpowiedzi" do tablicy 'answers'
        this.answers.push(this.newAnswerGroup(question));
      });
    });

    console.log("Zbudowano formularz:", this.responseForm.value);
  }

  // Getter ułatwiający dostęp do tablicy 'answers'
  get answers(): FormArray {
    return this.responseForm.get('answers') as FormArray;
  }

  // Tworzy FormGrupę dla pojedynczej odpowiedzi
  // DTO: { questionId: ..., answerValue: ... }
  newAnswerGroup(question: any): FormGroup {
    return this.fb.group({
      questionId: [question.questionId], // Zapisujemy ID pytania
      answerValue: [null, Validators.required], // Pole na odpowiedź, wymagane
      
      // Dodajemy też te pola (jako wyłączone), aby łatwo
      // wyświetlić je w HTML bez skomplikowanych pętli
      questionText: [{ value: question.questionText, disabled: true }],
      questionType: [{ value: question.questionType, disabled: true }]
    });
  }

  // 7. Pusta metoda, aby błąd w HTML zniknął (zaraz ją uzupełnimy)
// W pliku: src/app/components/survey-fill/survey-fill.ts

// ... (wszystkie importy i góra komponentu zostają bez zmian) ...
// ... (constructor, ngOnInit, buildResponseForm, getters... wszystko zostaje) ...

  // --- ZAKTUALIZOWANA METODA onSubmit ---

// W pliku: src/app/components/survey-fill/survey-fill.ts

  onSubmit(): void {
    if (!this.responseForm.valid) {
      console.error('Formularz niepoprawny! Wypełnij wszystkie odpowiedzi.');
      return;
    }

    // Pobieramy surowe wartości z tablicy 'answers'
    const rawAnswers = this.responseForm.get('answers')?.value as any[];

    // --- TO JEST KLUCZOWA POPRAWKA ---
    // Musimy ręcznie zmapować odpowiedzi, aby upewnić się,
    // że 'answerValue' ZAWSZE jest stringiem.
    const formattedAnswers = rawAnswers.map(ans => {
      return {
        questionId: ans.questionId,
        // Używamy String(), aby zamienić 'true' na "true", a 123 na "123"
        answerValue: String(ans.answerValue) 
      };
    });
    // --- KONIEC POPRAWKI ---

    // Tworzymy finalny obiekt DTO, używając naszej nowej, sformatowanej tablicy
    const responseData = {
      surveyId: this.responseForm.get('surveyId')?.value,
      answers: formattedAnswers // Używamy 'formattedAnswers' zamiast surowych
    };
    
    console.log('Wysyłanie sformatowanych odpowiedzi do API:', responseData);

    // Cała reszta zostaje bez zmian
    this.surveyService.submitResponse(responseData).subscribe(
      (response) => {
        console.log('Odpowiedzi zostały zapisane!', response);
        alert('Dziękujemy za wypełnienie ankiety!');
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Błąd podczas zapisywania odpowiedzi:', error);
        alert('Wystąpił błąd. Spróbuj ponownie.');
      }
    );
  }
}