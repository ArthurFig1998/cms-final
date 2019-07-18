import { Component } from "@angular/core";
import { DocumentsService } from "./documents/documents.service";
import { DataStorageService } from "./shared/data-storage.service";

@Component({
  selector: "cms-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  constructor(
    private documentService: DocumentsService,
    private dataStorage: DataStorageService
  ) {}
  onSaveData() {
    this.dataStorage.storeDocuments();
    this.dataStorage.storeContacts();
  }

  onFecthData() {
    this.dataStorage.fetchDocuments();
    this.dataStorage.fetchContacts();
  }
}
