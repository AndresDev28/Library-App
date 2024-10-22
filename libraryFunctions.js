import { Book } from "./script.js";
import { myLibrary } from "./script.js";
export function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook); // Se almacena el nuevo libro (newBook) al Array myLibrary
  return myLibrary;
  }

  