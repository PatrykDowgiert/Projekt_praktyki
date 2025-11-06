// W pliku: ApkaFrontend/src/app/services/survey.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private apiUrl = 'http://localhost:5129/api';

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/surveys`);
  }

  createSurvey(surveyData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/surveys`, surveyData);
  }

  getSurveyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/surveys/${id}`);
  }

  submitResponse(responseData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/responses`, responseData);
  }

  // --- POPRAWKA: NOWA METODA MUSI BYĆ TUTAJ ---
  // (WEWNĄTRZ klasy, PRZED ostatnim '}')

  // Metoda do pobierania WYNIKÓW ankiety po jej ID
  getSurveyResults(id: number): Observable<any> {
    // Użyj http.get() do wywołania /api/responses/{id}
    return this.http.get<any>(`${this.apiUrl}/responses/${id}`);
  }

  deleteSurvey(id: number): Observable<any> {
    // Użyj http.delete()
    return this.http.delete<any>(`${this.apiUrl}/surveys/${id}`);
  }

} // <-- TO JEST OSTATNI NAWIAS KLASY