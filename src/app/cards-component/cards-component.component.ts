import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cards-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cards-component.component.html',
  styleUrl: './cards-component.component.scss'
})
export class CardsComponentComponent {

    @Input() isOpen: boolean = false;
    @Output() closePanel: EventEmitter<any> = new EventEmitter<any>();
    @Output() widgetsConfirmed = new EventEmitter<string[]>();


  constructor() {}

  
    activeTab: string = 'Dashboard 1'; // Default active tab
    

    tabs = [
      { id: 'Dashboard 1', label: 'Dashboard 1', widgets: [
        { id: 'widget1', label: 'Widget 1', selected: false },
        { id: 'widget2', label: 'Widget 2', selected: false }
      ]},
      { id: 'Dashboard 2', label: 'Dashboard 2', widgets: [
        { id: 'widget3', label: 'Widget 3', selected: false },
        { id: 'widget4', label: 'Widget 4', selected: false }
      ]}
    ];
  
    setActiveTab(tabId: string) {
      this.activeTab = tabId;
    }
  
    isTabActive(tabId: string): boolean {
      return this.activeTab === tabId;
    }
  
    confirmSelection() {
      const selectedWidgetIds = this.tabs
        .flatMap(tab => tab.widgets)
        .filter(widget => widget.selected)
        .map(widget => widget.id);
  
      this.widgetsConfirmed.emit(selectedWidgetIds);
      this.closePanel.emit();
    }

    
}
