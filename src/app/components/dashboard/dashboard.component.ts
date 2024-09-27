import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { ContactService, Contact } from '../../services/contact.service';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ModalComponent } from '../modal/modal.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule, RouterModule, SearchBarComponent, ModalComponent, ContactFormComponent],
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';

  isModalOpen: boolean = false;
  modalType: 'add' | 'edit' = 'add';
  currentContact!: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    console.log('DashboardComponent initialized');
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.filteredContacts = contacts;
      console.log('Contacts loaded:', contacts);
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.filteredContacts = this.contacts.filter(contact => {
      // Implementa la lógica de filtrado aquí (busca en todos los campos)
      const termLower = term.toLowerCase();
      return (
        contact.name.toLowerCase().includes(termLower) ||
        contact.company?.toLowerCase().includes(termLower) ||
        contact.phones?.some(phone => phone.includes(term)) ||
        contact.emails?.some(email => email.toLowerCase().includes(termLower)) ||
        contact.addresses?.some(address => address.toLowerCase().includes(termLower))
      );
    });
  }

  openAddModal(): void {
    this.modalType = 'add';
    this.currentContact = {
      id: this.contacts.length + 1,
      name: '',
      // Inicializa otros campos
    };
    this.isModalOpen = true;
  }
  
  openEditModal(contact: Contact): void {
    this.modalType = 'edit';
    this.currentContact = { ...contact }; // Crea una copia del contacto
    this.isModalOpen = true;
  }

  deleteContact(contact: Contact): void {
    this.contactService.deleteContact(contact.id);
    this.refreshContacts();
  }
  
  closeModal(): void {
    this.isModalOpen = false;
  }
  
  saveContact(contact: Contact): void {
    if (this.modalType === 'add') {
      this.contactService.addContact(contact);
    } else if (this.modalType === 'edit') {
      this.contactService.updateContact(contact);
    }
    this.refreshContacts();
    this.closeModal();
  }
  
  refreshContacts(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.onSearch(this.searchTerm); // Aplica el filtro de búsqueda actual
    });
  }
}
