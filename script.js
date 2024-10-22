import { addBookToLibrary } from "./libraryFunctions.js";

export const myLibrary = []; // Array donde almacenaremos los libros introducidos por el usuario
const booksReaded = [];
const booksNotReaded = [];

// Refactor constructor function using a class function
export class Book { 
  constructor (title, author, pages, isRead) { 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  }

  toggleReadStatus () {
    this.isRead = !this.isRead;
    }
}

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



function displayBooks() { // función que se encarga de mostrar los libros almacenados en el array 'myLibrary'
  const libraryDiv = document.getElementById('library'); // Obtenemos el la referencia del elemento HTML con id 'Library'
  libraryDiv.innerHTML = ''; // Se limpia el contenido del libraryDiv para que no se acumulen las visualizaciones anteriores.

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.dataset.index = index; // Se asigna el índice del libro como un atributo data-index al bookCard. Esto es útil para identificar el libro en futuras interacciones (como eliminar o cambiar el estado de lectura).
    bookCard.classList.add('book-card'); // Agregamos nombre de clase para estilos css.
    bookCard.innerHTML = // Se establece el contenido HTML de la tarjeta, incluyendo detalles del libro (título, autor, páginas, y estado de lectura) y dos botones: uno para eliminar el libro (Remove) y otro para cambiar su estado de lectura (Toggle Read Status).
      `<p><span class="label">Title</span>: ${book.title}</p>
      <p><span class="label">Author</span>: ${book.author}</p>
      <p><span class="label">Pages</span>: ${book.pages}</p>
      <p><span class="label">Read</span>: <span class="${book.isRead ? 'read' : 'unread'}">${book.isRead ? 'Read' : 'Unread'}</span></p>
      <div class="button-container">
      <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
      <button class="toggle-btn" onclick="toggleReadStatus(${index} )">Toggle Read Status</button>
      </div>`;
    libraryDiv.appendChild(bookCard);

    // Agregar event listeners a los botones
    bookCard.querySelector('.remove-btn').addEventListener('click', () => removeBook(index));
    bookCard.querySelector('.toggle-btn').addEventListener('click', () => {
      book.toggleReadStatus();
      displayBooks();
    });
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
    bookCard.innerHTML = 
      `<p><span class="label">Title</span>: ${book.title}</p>
      <p><span class="label">Author</span>: ${book.author}</p>
      <p><span class="label">Pages</span>: ${book.pages}</p>
      <p><span class="label">Read</span>: <span class="${book.isRead ? 'read' : 'unread'}">${book.isRead ? 'Read' : 'Unread'}</span></p>
      <div class="button-container">
      <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
      <button class="toggle-btn" onclick="toggleReadStatus(${index} )">Toggle Read Status</button>
      </div>`; 
    libraryDiv.appendChild(bookCard);

    // Agregar event listeners a los botones
    bookCard.querySelector('.remove-btn').addEventListener('click', () => removeBook(index));
    bookCard.querySelector('.toggle-btn').addEventListener('click', () => {
        book.toggleReadStatus();
        displayReadBooks();
      });
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
      bookCard.innerHTML = 
        `<p><span class="label">Title</span>: ${book.title}</p>
        <p><span class="label">Author</span>: ${book.author}</p>
        <p><span class="label">Pages</span>: ${book.pages}</p>
        <p><span class="label">Read</span>: <span class="${book.isRead ? 'read' : 'unread'}">${book.isRead ? 'Read' : 'Unread'}</span></p>
        <div class="button-container">
        <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
        <button class="toggle-btn" onclick="toggleReadStatus(${index} )">Toggle Read Status</button>
        </div>`; 
      libraryDiv.appendChild(bookCard);

      // Agregar event listeners a los botones
    bookCard.querySelector('.remove-btn').addEventListener('click', () => removeBook(index));
    bookCard.querySelector('.toggle-btn').addEventListener('click', () => {
        book.toggleReadStatus();
        displayUnreadBooks();
      });
    }
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1); // Elimina un elemento desde la posición index del array
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

  // Validar el formulario antes de agregar el libro
  if (validateForm()) {
    return;
  }

  addBookToLibrary(title, author, pages, isRead);

  document.getElementById('new-book-form').reset();
  document.getElementById('new-book-form').style.display = 'none'; // Oculta el formulario
  document.getElementById('library').style.display = 'grid'; // Muestras las tarjetas

  displayBooks();
});

// Evento para cerrar el formulario
document.getElementById('close-form-btn').addEventListener('click', () => {
  document.getElementById('new-book-form').style.display = 'none';
  document.getElementById('library').style.display = 'grid'; // Muestra las tarjetas
});

// Validación del formulario
function validateForm() {
  let hasErros = false;

  hasErros |= validateTitle();
  hasErros |= validateAuthor();
  hasErros |= validatePages();

  if (hasErros) {
    const addBtn = document.getElementById('add-btn');
    const errorSpan = addBtn.nextElementSibling;
    errorSpan.textContent = "Uno o mas campos del formulario no están rellenados correctamente";
  }
  return hasErros;
}

function validateTitle() {
  const titleInput = document.getElementById('title');
  const title = titleInput.value.trim();
  const errorSpan = titleInput.nextElementSibling;

  if(!title) {
    errorSpan.textContent = "Por favor, introduce el título del libro"
    return true // Hay un error
  } else {
    errorSpan.textContent = "";
    return false;
  }
}

function validateAuthor() {
  const authorInput = document.getElementById('author');
  const author = authorInput.value.trim();
  const errorSpan = authorInput.nextElementSibling;

  if (!author) {
    errorSpan.textContent = "Por favor introduce el nombre del Autor"
    return true;
  } else {
    errorSpan.textContent = "";
    return false;
  }
}

function validatePages() {
  const pagesInput = document.getElementById('pages');
  const pages = pagesInput.value.trim();
  const errorSpan = pagesInput.nextElementSibling;

  if (!pages || isNaN(pages) || pages <=0) {
    errorSpan.textContent = "Por favor introduce un número válido de paginas"
    return true;
  } else {
    errorSpan.textContent = "";
    return false;
  }
}

document.getElementById('title').addEventListener('blur', validateTitle);
document.getElementById('author').addEventListener('blur', validateAuthor);
document.getElementById('pages').addEventListener('blur', validatePages);
