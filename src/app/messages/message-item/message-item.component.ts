import { Component, OnInit, Input, Output } from "@angular/core";
import { Message } from "../message.model";
import { Contact } from "src/app/contacts/contacts.model";
import { ContactService } from "src/app/contacts/contact.service";

@Component({
  selector: "cms-message-item",
  templateUrl: "./message-item.component.html",
  styleUrls: ["./message-item.component.css"]
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  messageSender: Contact;
  canEdit: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(
      this.message.sender.id
    );
    this.messageSender = contact;
    console.log(this.messageSender);
    // if (!contact) {
    //   console.log("Something went wrong!");
    // } else {
    //   this.messageSender = contact;
    // }
  }
}
