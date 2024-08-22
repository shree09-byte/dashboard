import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryPageComponent } from "./category-page/category-page.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CategoryPageComponent,CommonModule , HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard';
}
