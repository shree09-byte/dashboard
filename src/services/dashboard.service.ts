import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Widget { 
  widgetName: string;
  widgetText: string;
}

export interface Category {
  categoryName: string;
  widgets: Widget[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private categoriesUrl = 'assets/categories.json'; // URL to JSON file

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<{ categories: Category[] }>(this.categoriesUrl).pipe(
      map(response => response.categories),
      catchError(this.handleError<Category[]>('getCategories', []))
    );
  }

  getWidgetData(widgetId: string): Observable<{ title: string; content: string }> {
    const widgetData: { [key: string]: { title: string; content: string } } = {
      widget1: { title: 'Widget 1', content: 'This is widget 1 content.' },
      widget2: { title: 'Widget 2', content: 'This is widget 2 content.' },
      widget3: { title: 'Widget 3', content: 'This is widget 3 content.' },
      widget4: { title: 'Widget 4', content: 'This is widget 4 content.' }
    };
    
    return of(widgetData[widgetId]);
  }

  addWidget(categoryName: string, widgetName: string, widgetText: string): Observable<void> {
    return this.getCategories().pipe(
      map(categories => {
        const category = categories.find(cat => cat.categoryName === categoryName);
        if (category) {
          const newWidget: Widget = { widgetName, widgetText };
          category.widgets.push(newWidget);
        }
      })
    );
  }

  removeWidget(categoryName: string, widgetName: string): Observable<void> {
    return this.getCategories().pipe(
      map(categories => {
        const category = categories.find(cat => cat.categoryName === categoryName);
        if (category) {
          category.widgets = category.widgets.filter(widget => widget.widgetName !== widgetName);
        }
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
