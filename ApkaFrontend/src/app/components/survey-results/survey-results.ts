// W pliku: src/app/components/survey-results/survey-results.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Potrzebny do @if, @for
import { ActivatedRoute } from '@angular/router'; // Do czytania ID z URL
import { SurveyService } from '../../services/survey'; // Nasz serwis

@Component({
  selector: 'app-survey-results',
  standalone: true,
  imports: [CommonModule], // Dodaj CommonModule
  templateUrl: './survey-results.html',
  styleUrls: ['./survey-results.css']
})
export class SurveyResultsComponent implements OnInit {

  public results: any = null; // Zmienna na wyniki
  public isLoading = true;
  public error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    // 1. Odczytaj ID z adresu URL
    const idFromUrl = this.route.snapshot.paramMap.get('id');

    if (idFromUrl) {
      const surveyId = +idFromUrl; // Konwertuj na liczbę

      // 2. Wywołaj nową metodę z serwisu
      this.surveyService.getSurveyResults(surveyId).subscribe(
        (data) => {
          // SUKCES!
          this.results = data;
          this.isLoading = false;
          console.log('Pobrano wyniki:', this.results);
        },
        (err) => {
          // BŁĄD!
          console.error('Błąd pobierania wyników:', err);
          this.error = 'Nie udało się załadować wyników.';
          this.isLoading = false;
        }
      );
    } else {
      this.error = 'Brak ID ankiety w adresie URL.';
      this.isLoading = false;
    }
  }
}