import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Contact } from "../contacts.model";
import { ContactService } from "../contact.service";
import { Subscription } from "rxjs";

@Component({
  selector: "cms-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  term: string;
  private subscription: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactChangeEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );

    this.contactService.getContacts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ///Chnages here from contactSelectedEvent to cntactChangeEvent and emit() for next()
  onSelected(contact: Contact[]) {
    this.contactService.contactChangeEvent.next(contact);
  }

  onKeyPress(value: string) {
    this.term = value;
  }
}
