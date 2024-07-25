const myLibrary = []; // Array donde almacenaremos los libros introducidos por el usuario
const booksReaded = [];
const booksNotReaded = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
};

// Selecciona el boton 'Total Books' en el DOM y agregamos un event click para llamar la funcion que muestra todos los libros
document.getElementById('total-books-btn').addEventListener('click', () => {
  displayBooks();
});

document.getElementById('read-books-btn').addEventListener('click', () => {
  displayReadBooks();
});

document.getElementById('unread-books-btn').addEventListener('click', () => {
  displayUnreadBooks();
});

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook); // Se almacena el nuevo libro (newBook) al Array myLibrary
  displayBooks();
  document.getElementById('library').style.display = 'grid'; // Después de agregar el libro, muestra las tarjetas
}

function displayBooks() { // función que se encarga de mostrar los libros almacenados en el array 'myLibrary'
  const libraryDiv = document.getElementById('library'); // Obtenemos el la referencia del elemento HTML con id 'Library'
  libraryDiv.innerHTML = ''; // Se limpia el contenido del libraryDiv para que no se acumulen las visualizaciones anteriores.

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.dataset.index = index; // Se asigna el índice del libro como un atributo data-index al bookCard. Esto es útil para identificar el libro en futuras interacciones (como eliminar o cambiar el estado de lectura).
    bookCard.classList.add('book-card'); // Agregamos nombre de clase para estilos css.
    bookCard.innerHTML = // Se establece el contenido HTML de la tarjeta, incluyendo detalles del libro (título, autor, páginas, y estado de lectura) y dos botones: uno para eliminar el libro (Remove) y otro para cambiar su estado de lectura (Toggle Read Status).
    `
    <p><span class="label">Title</span>: ${book.title}</p>
    <p><span class="label">Author</span>: ${book.author}</p>
    <p><span class="label">Pages</span>: ${book.pages}</p>
    <p><span class="label">Read</span>: <span class="${book.isRead ? 'read' : 'unread'}">${book.isRead ? 'Read' : 'Unread'}</span></p>
    <div class="button-container">
      <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
      <button class="toggle-btn" onclick="toggleReadStatus(${index} )">Toggle Read Status</button>
    </div>
    `;
    libraryDiv.appendChild(bookCard);
  });
}

function displayReadBooks() {
  const libraryDiv = document.getElementById('library');
  libraryDiv.innerHTML = '';

  myLibrary.forEach((book, index) => {
    if(book.isRead) {
      const bookCard = document.createElement('div');
      bookCard.dataset.index = index;
      bookCard.classList.add('book-card');
      bookCard.innerHTML = `
        <p><span class="label">Title</span>: ${book.title}</p>
        <p><span class="label">Author</span>: ${book.author}</p>
        <p><span class="label">Pages</span>: ${book.pages}</p>
        <p><span class="label">Read</span>: <span class="${book.isRead ? 'read' : 'unread'}">${book.isRead ? 'Read' : 'Unread'}</span></p>
        <div class="button-container">
          <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
          <button class="toggle-btn" onclick="toggleReadStatus(${index} )">Toggle Read Status</button>
        </div>
      `;
      libraryDiv.appendChild(bookCard);
    }
  });
}

function displayUnreadBooks() {
  const libraryDiv = document.getElementById('library');
  libraryDiv.innerHTML = '';

  myLibrary.forEach((book, index) => {
    if(!book.isRead) {
      const bookCard = document.createElement('div');
      bookCard.dataset.index = index;
      bookCard.classList.add('book-card');
      bookCard.innerHTML = `
        <p><span class="label">Title</span>: ${book.title}</p>
        <p><span class="label">Author</span>: ${book.author}</p>
        <p><span class="label">Pages</span>: ${book.pages}</p>
        <p><span class="label">Read</span>: <span class="${book.isRead ? 'read' : 'unread'}">${book.isRead ? 'Read' : 'Unread'}</span></p>
        <div class="button-container">
          <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
          <button class="toggle-btn" onclick="toggleReadStatus(${index} )">Toggle Read Status</button>
        </div>
      `;
      libraryDiv.appendChild(bookCard);
    }
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1); // Elimina un elemento desde la posición index del array
  displayBooks();
}

function toggleReadStatus(index) {
  // Obtenemos el objeto Book del arreglo usando su índice
  const book = myLibrary[index];
  // Llamamos al método toggleReadStatus del objeto Book para invertir su valor
  book.toggleReadStatus();
  // Actualizamos la visualización llamando a displayBooks
  displayBooks();
}

// Evento para abrir el formulario
document.getElementById('new-book-btn').addEventListener('click', () => {
  document.getElementById('library').style.display = 'none'; // Oculta las tarjetas existentes
  document.getElementById('new-book-form').style.display = 'block'; // Muestra el formulario

});

// Evento para agregar un libro nuevo
document.getElementById('new-book-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que se envía el formulario

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  addBookToLibrary(title, author, pages, isRead);

  document.getElementById('new-book-form').reset();
  document.getElementById('new-book-form').style.display = 'none'; // Oculta el formulario
  document.getElementById('library').style.display = 'grid'; // Muestras las tarjetas
});

// Evento para cerrar el formulario
document.getElementById('close-form-btn').addEventListener('click', () => {
  document.getElementById('new-book-form').style.display = 'none';
  document.getElementById('library').style.display = 'grid'; // Muestra las tarjetas
});