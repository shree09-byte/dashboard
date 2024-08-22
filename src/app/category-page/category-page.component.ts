import { Component, OnInit } from '@angular/core';
import { DashboardService, Category } from '../../services/dashboard.service';
import { CardsComponentComponent } from '../cards-component/cards-component.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  standalone: true,
  imports: [CardsComponentComponent, CommonModule, FormsModule, HttpClientModule ],
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  isWidgetOpen = false;
  selectedCategory: any;
  categories: Category[] = [];
  searchText = '';
  activeTab: string = 'Dashboard 1';
  isSidePanelOpen = false;
  widgets: any[] = [];
  
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  filterWidgets(widgets: any[]) {
    return widgets.filter(widget => 
      widget.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  hasWidgets(widgets: any[]): boolean {
    return widgets.length > 0;
  }

  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  isTabActive(tabName: string): boolean {
    return this.activeTab === tabName;
  }

  openSidePanel() {
    this.isSidePanelOpen = true;
  }

  closeSidePanel() {
    this.isSidePanelOpen = false;
  }

  addWidgets(selectedWidgetIds: string[]) {
    selectedWidgetIds.forEach(widgetId => {
      this.dashboardService.getWidgetData(widgetId).subscribe(widgetData => {
        this.widgets.push(widgetData);
      });
    });
    this.closeSidePanel();
  }

  removeWidget(widgetToRemove: any) {
    this.widgets = this.widgets.filter(widget => widget !== widgetToRemove);
  }
}
