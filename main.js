const myLibrary = []; // Array donde almacenaremos los libros introducidos por el usuario

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toogleReadStatus = function() {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook); // Se almacena el nuevo libro (newBook) al Array myLibrary
  displayBooks();
}

function displayBooks() { // función que se encarga de mostrar los libros almacenados en el array 'myLibrary'
  const libraryDiv = document.getElementById('Library'); // Obtenemos el la referencia del elemento HTML con id 'Library'
  libraryDiv.innerHTML = ''; // Se limpia el contenido del libraryDiv para que no se acumulen las visualizaciones anteriores.

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.dataset.index = index; // Se asigna el índice del libro como un atributo data-index al bookCard. Esto es útil para identificar el libro en futuras interacciones (como eliminar o cambiar el estado de lectura).
    bookCard.innerHTML = // Se establece el contenido HTML de la tarjeta, incluyendo detalles del libro (título, autor, páginas, y estado de lectura) y dos botones: uno para eliminar el libro (Remove) y otro para cambiar su estado de lectura (Toggle Read Status).
    `
      <p>Title: ${book.title}<p>
      <p>Author: ${book.author}<p>
      <p>Pages: ${book.pages}<p>
      <p>Read: ${book.isRead}<p>
      <button onclick="removeBook(${index})">Remove</button>
      <button onclick="toogleReadStatus(${index})">Toogle Read Status</button>
    `;
    libraryDiv.appendChild(bookCard);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1); // Elimina un elemento desde la posición index del array
  displayBooks();
}

function toogleReadStatus(index) {
  myLibrary[index].toogleReadStatus()
  displayBooks();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  document.getElementById('new-book-form').style.display = 'block';
});

document.getElementById('new-book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  addBookToLibrary(title, author, pages, isRead);

  document.getElementById('new-book-form').reset;
  document.getElementById('new-book-form').style.display = 'none';
});