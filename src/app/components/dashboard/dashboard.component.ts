import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContactService, Contact } from '../../services/contact.service';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ModalComponent } from '../modal/modal.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    SearchBarComponent,
    ModalComponent,
    ContactFormComponent,
  ],
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';

  isModalOpen: boolean = false;
  modalType: 'add' | 'edit' = 'add';
  currentContact!: Contact;

  // Variables para la paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.refreshContacts();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1; // Reiniciar a la primera página al realizar una búsqueda
    this.refreshContacts();
  }

  refreshContacts(): void {
    this.contactService
      .getContacts(this.searchTerm, this.currentPage)
      .subscribe(
        (response) => {
          this.contacts = response.data;
          this.filteredContacts = this.contacts;
          this.totalItems = response.total;
          this.itemsPerPage = response.per_page;
          this.currentPage = response.current_page;
          this.totalPages = response.last_page;
        },
        (error) => {
          console.error('Error al obtener contactos:', error);
        }
      );
  }

  openAddModal(): void {
    this.modalType = 'add';
    this.currentContact = {
      name: '',
      notes: '',
      birthday: '',
      website: '',
      company: '',
      phones: [],
      emails: [],
      addresses: [],
    };
    this.isModalOpen = true;
  }

  openEditModal(contact: Contact): void {
    this.modalType = 'edit';
    this.currentContact = { ...contact }; // Crea una copia del contacto
    this.isModalOpen = true;
  }

  deleteContact(contact: Contact): void {
    if (contact.id !== undefined) {
      this.contactService.deleteContact(contact.id).subscribe(
        () => {
          this.refreshContacts();
        },
        (error) => {
          console.error('Error al eliminar el contacto:', error);
        }
      );
    } else {
      console.error('El contacto no tiene un ID válido.');
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveContact(contact: Contact): void {
    if (this.modalType === 'add') {
      this.contactService.addContact(contact).subscribe(
        () => {
          this.refreshContacts();
          this.closeModal();
        },
        (error) => {
          console.error('Error al agregar el contacto:', error);
        }
      );
    } else if (this.modalType === 'edit') {
      this.contactService.updateContact(contact).subscribe(
        () => {
          this.refreshContacts();
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el contacto:', error);
        }
      );
    }
  }

  // Métodos para la paginación
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.refreshContacts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.refreshContacts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.refreshContacts();
    }
  }
}
