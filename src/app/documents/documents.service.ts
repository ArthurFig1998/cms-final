import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Subject } from "rxjs";
import { Params } from "@angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DocumentsService implements OnInit {
  documentChangeEvent = new Subject<Document[]>();

  // documentSelectedEvent = new EventEmitter<Document>();
  private documents: Document[];

  maxDocumentId: number;
  currentId: number;
  documentsListClone: Document[];
  newDocId: number;

  constructor(private http: HttpClient) {
    this.getDocuments();
    console.log("this is being called - documents constructor");
  }

  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(
        "http://localhost:3000/documents"
      )
      .subscribe(
        (response: any) => {
          this.documents = response.documents;
          this.documentChangeEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getDocument(id: string) {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id === id) {
        return this.documents[i];
      }
    }
    return null;
    // return this.documents[id];
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }

    this.http
      .delete("http://localhost:3000/documents/" + document.id)
      .subscribe((response: Response) => {
        // this.documents[pos] = document;
        this.documents.splice(pos, 1);
        this.documentChangeEvent.next(this.documents.slice());
      });

    // const strDocument = JSON.stringify(newDocument);
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    newDocument.id = "";

    this.http
      .post<{ message: string; document: Document }>(
        "http://localhost:3000/documents/",
        newDocument,
        {
          headers: headers
        }
      )
      .subscribe(responseData => {
        this.documents.push(responseData.document);
        this.documentChangeEvent.next(this.documents.slice());
        // this.getDocuments();
      });
  }

  // storeDocuments() {
  //   const documents = JSON.stringify(this.getDocuments());
  //   this.http
  //     .put("http://localhost:3000/documents", documents)
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    // this.documents[pos] = newDocument;
    // this.documentsListClone = this.documents.slice();
    // this.documentChangeEvent.next(this.documentsListClone);

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    // const strDocument = JSON.stringify(newDocument);

    this.http
      .put(
        "http://localhost:3000/documents/" + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.documentChangeEvent.next(this.documents.slice());
      });
  }

  ngOnInit() {
    this.getDocuments();
    console.log("this is being called - documents ngOninit");
  }
}
