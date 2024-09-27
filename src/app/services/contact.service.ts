import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Contact {
  id: number;
  name: string;
  notes?: string;
  birthday?: Date;
  website?: string;
  company?: string;
  phones?: string[];
  emails?: string[];
  addresses?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts: Contact[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      company: 'Empresa XYZ',
      phones: ['123456789', '987654321'],
      emails: ['juan@example.com'],
      addresses: ['Calle Falsa 123'],
    },
    {
      id: 2,
      name: 'Ana López',
      company: 'Otra Empresa',
      phones: ['987654321', '123456789'],
      emails: ['algo@gmail.com'],
      addresses: ['Av. Principal 456'],
    },
    {
      id: 3,
      name: 'Pedro Rodríguez',
      company: 'La Otra Empresa',
      phones: ['123456789'],
      emails: ['some@gmail.com'],
      addresses: ['Calle Falsa 123'],
    },
    // Agrega más contactos dummy aquí
  ];

  constructor() { }

  getContacts(): Observable<Contact[]> {
    return of(this.contacts);
  }

  getContactById(id: number): Observable<Contact | undefined> {
    const contact = this.contacts.find(c => c.id === id);
    return of(contact);
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }
}
