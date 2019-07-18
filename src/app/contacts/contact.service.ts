import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contacts.model";
import { Subject } from "rxjs";
import { Params } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactChangeEvent = new Subject<Contact[]>();
  maxContactId: number;
  maxId: number = 0;
  currentId: number;
  contactsListClone: Contact[];
  newContactId: number;

  private contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(
        "http://localhost:3000/contacts"
      )
      .subscribe(
        (response: any) => {
          this.contacts = response.contacts;
          this.contactChangeEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getContact(id: string) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
    return null;
    // return this.contacts[index];
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);
    if (pos < 0) {
      return;
    }

    this.http
      .delete("http://localhost:3000/contacts/" + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.contactChangeEvent.next(this.contacts.slice());
      });

    // const strDocument = JSON.stringify(newDocument);
  }

  getMaxId(): number {
    this.contacts.forEach((contact: Contact) => {
      this.currentId = +contact.id;
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    });

    return this.maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    newContact.id = "";

    this.http
      .post<{ message: string; contact: Contact }>(
        "http://localhost:3000/contacts/",
        newContact,
        {
          headers: headers
        }
      )
      .subscribe(responseData => {
        this.contacts.push(responseData.contact);
        this.contactChangeEvent.next(this.contacts);
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    // this.documents[pos] = newDocument;
    // this.documentsListClone = this.documents.slice();
    // this.documentChangeEvent.next(this.documentsListClone);

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    // const strDocument = JSON.stringify(newDocument);

    this.http
      .put("http://localhost:3000/contacts/" + originalContact.id, newContact, {
        headers: headers
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.contactChangeEvent.next(this.contacts);
      });
  }
}
