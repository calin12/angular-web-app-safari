import { Component, OnInit } from '@angular/core';
import {Book} from "../book";
import {BookStoreService} from "../book-store.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  booksList: Book[];
  selectedBook: Book;

  constructor(private bookStoreService: BookStoreService) {
  }

  ngOnInit() {
    this.getBooksList();
  }

  getBooksList() {
    this.bookStoreService.getBooks()
      .subscribe(books => this.booksList = books);
  }

  getBookDetails(id: number) {

    this.bookStoreService.getBook(id)
      .subscribe(book => this.selectedBook = book);
  }

  deleteBook(id: number) {
    this.bookStoreService.deleteBook(id)
      .subscribe(res => {
        console.log(res);
        this.booksList = this.booksList
          .filter(book => book.id !== id);
        if (this.selectedBook.id === id) {
          this.selectedBook = null;
        }
      });
  }
}
