import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(term: string): void {
    this.search.emit(term);
  }
}
