// W pliku: ApkaFrontend/src/app/components/survey-list/survey-list.ts

import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './survey-list.html',
  styleUrls: ['./survey-list.css']
})
export class SurveyListComponent implements OnInit {
  
  public surveys: any[] = []; 
  
  constructor(private surveyService: SurveyService) {} 

  ngOnInit(): void {
    // Ta metoda pobiera dane, gdy komponent startuje
    this.surveyService.getSurveys().subscribe(
      (data: any) => { // Dodajemy (data: any), aby uniknąć błędów
        if (data && data.$values) {
          this.surveys = data.$values;
        } else {
          this.surveys = data;
        }
      },
      (error: any) => { // Dodajemy (error: any)
        console.error('Błąd pobierania listy ankiet:', error);
      }
    );
  }

  // --- BRAKUJĄCA METODA JEST TUTAJ ---
  // Dodaj całą tę metodę
  
  public onDelete(surveyId: number): void {
    // 1. Zapytaj użytkownika o potwierdzenie
    const isConfirmed = confirm("Czy na pewno chcesz usunąć tę ankietę? Spowoduje to usunięcie WSZYSTKICH jej pytań i odpowiedzi!");

    if (!isConfirmed) {
      return; // Przerwij, jeśli użytkownik kliknął "Anuluj"
    }

    // 2. Wywołaj serwis
    this.surveyService.deleteSurvey(surveyId).subscribe(
      () => {
        // SUKCES!
        console.log(`Ankieta o ID: ${surveyId} została usunięta.`);
        
        // 3. Zaktualizuj listę w UI
        this.surveys = this.surveys.filter(survey => survey.surveyId !== surveyId);
      },
      (error: any) => { // Dodajemy (error: any)
        // BŁĄD!
        console.error('Błąd podczas usuwania ankiety:', error);
        alert('Nie udało się usunąć ankiety.');
      }
    );
  }
}