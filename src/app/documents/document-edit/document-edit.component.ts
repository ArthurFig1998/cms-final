import { Component, OnInit } from "@angular/core";
import { DocumentsService } from "../documents.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Document } from "../document.model";
import { DataStorageService } from "src/app/shared/data-storage.service";

@Component({
  selector: "cms-document-edit",
  templateUrl: "./document-edit.component.html",
  styleUrls: ["./document-edit.component.css"]
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      if (this.id === null || this.id === undefined) {
        this.editMode = false;
        return;
      }

      let document = this.documentService.getDocument(this.id);

      if (!document) {
        return;
      }

      this.originalDocument = document;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(document));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url,
      value.children
    );

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.editMode = false;
    this.router.navigate(["/documents"], { relativeTo: this.route });
    this.documentService.getDocuments();
    // this.dataStorage.storeDocuments();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(["/documents"], { relativeTo: this.route });
  }
}
