import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact, Address, Email, Phone } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ContactFormComponent {
  @Input() contact: Contact = {
    name: '',
    notes: '',
    birthday: '',
    website: '',
    company: '',
    phones: [],
    emails: [],
    addresses: [],
  };
  @Output() saveContact = new EventEmitter<Contact>();

  onSubmit(): void {
    this.saveContact.emit(this.contact);
  }

  addPhone(): void {
    this.contact.phones.push({ id: null, phone_number: '' });
  }

  removePhone(index: number): void {
    const phone = this.contact.phones[index];
    if (phone.id) {
      // Marcar para eliminar en el backend
      if (!this.contact['phones_to_delete']) {
        this.contact['phones_to_delete'] = [];
      }
      this.contact['phones_to_delete'].push(phone.id);
    }
    this.contact.phones.splice(index, 1);
  }

  addEmail(): void {
    this.contact.emails.push({ id: null, email: '' });
  }

  removeEmail(index: number): void {
    const email = this.contact.emails[index];
    if (email.id) {
      // Marcar para eliminar en el backend
      if (!this.contact['emails_to_delete']) {
        this.contact['emails_to_delete'] = [];
      }
      this.contact['emails_to_delete'].push(email.id);
    }
    this.contact.emails.splice(index, 1);
  }

  addAddress(): void {
    this.contact.addresses.push({
      id: null,
      address_line: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    });
  }

  removeAddress(index: number): void {
    const address = this.contact.addresses[index];
    if (address.id) {
      // Marcar para eliminar en el backend
      if (!this.contact['addresses_to_delete']) {
        this.contact['addresses_to_delete'] = [];
      }
      this.contact['addresses_to_delete'].push(address.id);
    }
    this.contact.addresses.splice(index, 1);
  }

  trackByIndex(index: number, item: any): number {
    return item.id || index;
  }
}
