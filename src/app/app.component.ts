import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "./shared/data-storage.service";

@Component({
  selector: "cms-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(public dataStorage: DataStorageService) {}
  ngOnInit() {
    this.dataStorage.fetchDocuments();
    this.dataStorage.fetchContacts();
  }
}
