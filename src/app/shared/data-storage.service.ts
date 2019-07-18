import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DocumentsService } from "../documents/documents.service";
import { Document } from "../documents/document.model";
import { ContactService } from "../contacts/contact.service";
import { Contact } from "../contacts/contacts.model";
import { MessagesService } from "../messages/messages.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private documentService: DocumentsService,
    private contactService: ContactService
  ) {}

  fetchDocuments() {
    this.documentService.getDocuments();
    // success => (documents: Document[]) => {
    //   this.documents = documents;
    //   this.maxDocumentId = this.getMaxId();
    // },
    // error => (error: any) => {
    //   console.log("Something went wrong!");
    // }
  }

  fetchContacts() {
    this.contactService.getContacts();
    // success => (documents: Document[]) => {
    //   this.documents = documents;
    //   this.maxDocumentId = this.getMaxId();
    // },
    // error => (error: any) => {
    //   console.log("Something went wrong!");
    // }
  }

  // initMessages() {
  //   this.http
  //     .get<Message[]>("https://arthur-cms-5be9e.firebaseio.com/messages.json")
  //     .subscribe(message => {
  //       console.log("I'm being called - initMessages");
  //       this.messageService.setMessages(message);
  //     });
  // }

  // storeMessages() {
  //   const messages = JSON.stringify(this.messageService.getMessages());
  //   this.http
  //     .put("https://arthur-cms-5be9e.firebaseio.com/messages.json", messages)
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }

  storeDocuments() {
    // const documents = JSON.stringify(this.getDocuments());
    const documents = JSON.stringify(this.documentService.getDocuments());
    this.http
      .put("http://localhost:3000/documents", documents)
      .subscribe(response => {
        console.log(response);
      });
  }

  storeContacts() {
    // const documents = JSON.stringify(this.getDocuments());
    const contacts = JSON.stringify(this.contactService.getContacts());
    this.http
      .put("http://localhost:3000/contacts", contacts)
      .subscribe(response => {
        console.log(response);
      });
  }
}
