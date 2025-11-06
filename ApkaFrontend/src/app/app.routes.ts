// W pliku: src/app/app.routes.ts

import { Routes } from '@angular/router';
import { SurveyCreateComponent } from './components/survey-create/survey-create';
import { SurveyListComponent } from './components/survey-list/survey-list';
import { SurveyFillComponent } from './components/survey-fill/survey-fill';

// 1. Zaimportuj nowy komponent
import { SurveyResultsComponent } from './components/survey-results/survey-results';

export const routes: Routes = [
    { path: '', component: SurveyListComponent },
    { path: 'create', component: SurveyCreateComponent },
    { path: 'survey/:id', component: SurveyFillComponent },
    
    // 2. Dodaj nową trasę dla wyników
    { path: 'results/:id', component: SurveyResultsComponent },
];