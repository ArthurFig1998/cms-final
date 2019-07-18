import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { stringify } from "@angular/core/src/util";
import { Message } from "../message.model";
import { MessagesService } from "../messages.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Contact } from "src/app/contacts/contacts.model";

@Component({
  selector: "cms-message-edit",
  templateUrl: "./message-edit.component.html",
  styleUrls: ["./message-edit.component.css"]
})
export class MessageEditComponent implements OnInit {
  @ViewChild("subject") subjectInputRef: ElementRef;
  @ViewChild("msgText") msgTextInputRef: ElementRef;

  currentSender: Contact = new Contact(
    "5d30b4da9568cc1d64adb9d5",
    "101",
    "Arthur Fernandes de Figueiredo",
    "fig16009@byui.edu",
    "385-482-9732",
    "url.com",
    null
  );

  constructor(
    private messageService: MessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("Current Sender is: " + this.currentSender.name);
  }

  onSendMessage() {
    const newSubject = this.subjectInputRef.nativeElement.value;
    const newMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(
      "",
      newSubject,
      newMsgText,
      this.currentSender
    );
    this.messageService.addMessage(newMessage);
    this.messageService.getMessages();
    this.router.navigate(["/messages"], { relativeTo: this.route });
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }
}
