import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  imports: [CommonModule, FormsModule],
})
export class ContactFormComponent {
  @Input() contact: Contact = {
    id: 0,
    name: '',
    // Inicializa otros campos si es necesario
  };
  @Output() saveContact = new EventEmitter<Contact>();

  onSubmit(): void {
    this.saveContact.emit(this.contact);
  }
}
