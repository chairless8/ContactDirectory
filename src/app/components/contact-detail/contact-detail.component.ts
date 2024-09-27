import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService, Contact } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
  imports: [CommonModule, RouterModule],
})
export class ContactDetailComponent implements OnInit {
  contact?: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContactById(id).subscribe(contact => this.contact = contact);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
