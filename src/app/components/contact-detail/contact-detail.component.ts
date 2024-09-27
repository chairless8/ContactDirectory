import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContactService, Contact, Phone, Email, Address } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  imports: [CommonModule, RouterModule],
})
export class ContactDetailComponent implements OnInit {
  contact?: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContactById(id).subscribe(contact => {
      this.contact = contact;
    });
  }
}
