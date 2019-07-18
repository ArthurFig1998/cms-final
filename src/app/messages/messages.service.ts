import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { DataStorageService } from "../shared/data-storage.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessagesService implements OnInit {
  messageChangeEvent = new Subject<Message[]>();
  private messages: Message[];
  maxMessageId: number;
  maxId: number = 0;
  currentId: number;

  constructor(
    private dataStorage: DataStorageService,
    private http: HttpClient
  ) {
    // this.messages = this.initMessages();
    console.log("Im being called - Constructor");
    this.getMessages();
    // this.initMessages();
  }

  ngOnInit() {
    this.getMessages();
    console.log("I'm being called - ngOnInit");
  }

  getMessages() {
    this.http
      .get<{ message: string; messages: Message[] }>(
        "http://localhost:3000/messages"
      )
      .subscribe(
        (response: any) => {
          this.messages = response.messages;
          this.messageChangeEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  getMessage(id: string) {
    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id === id) {
        return this.messages[i];
      }
    }
    return null;
    // return this.messages[id];
  }

  addMessage(message: Message) {
    // this.messageChangeEvent.next(this.messages.slice());
    // this.storeMessages();
    if (!message) {
      return;
    }

    message.id = "";

    // this.http
    //   .post("http://localhost:3000/messages", message, { headers: headers })
    //   .subscribe((response: any) => {
    //     this.messages.push(response.newMessage);
    //     this.storeMessages();
    //     this.messageChangeEvent.next(this.messages.slice());
    //   });

    // const messages = JSON.stringify(this.messages);

    let header = new HttpHeaders();
    header.set("Content-Type", "application/json");

    this.http
      .post("http://localhost:3000/messages", message, {
        headers: header
      })
      .subscribe(() => {
        this.messages.push(message);
        this.messageChangeEvent.next(this.messages.slice());
      });
  }

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messageChangeEvent.next(this.messages.slice());
  }

  // storeMessages() {
  //   const messages = JSON.stringify(this.messages);

  //   let header = new HttpHeaders();
  //   header.set("Content-Type", "application/json");

  //   this.http
  //     .post("http://localhost:3000/messages.json", messages, {
  //       headers: header
  //     })
  //     .subscribe(() => {
  //       this.messageChangeEvent.next(this.messages.slice());
  //     });
  // }
}
