import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Contact {
  id?: number;
  name: string;
  notes?: string;
  birthday?: string;
  website?: string;
  company?: string;
  phones: Phone[];
  emails: Email[];
  addresses: Address[];
  phones_to_delete?: number[];
  emails_to_delete?: number[];
  addresses_to_delete?: number[];
}

export interface Phone {
  id: number | null;
  phone_number: string;
}

export interface Email {
  id: number | null;
  email: string;
}

export interface Address {
  id: number | null;
  address_line: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:8000/api/contacts';

  constructor(private http: HttpClient) { }

  getContacts(searchTerm?: string, page: number = 1): Observable<any> {
    let params: any = { page };
    if (searchTerm) {
      params.search = searchTerm;
    }
    return this.http.get<any>(this.apiUrl, { params });
  }

  getContactById(id: number): Observable<Contact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Contact>(url);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(updatedContact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/${updatedContact.id}`;
    return this.http.put<Contact>(url, updatedContact);
  }

  deleteContact(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
