const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const bookDisplay = document.getElementById('bookDisplay');
    bookDisplay.innerHTML = ''; // Clear previous display
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button onclick="removeBook('${book.id}')">Remove</button>
            <button onclick="toggleRead('${book.id}')">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
        `;
        bookDisplay.appendChild(bookCard);
    });
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index > -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function toggleRead(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.read = !book.read;
        displayBooks();
    }
}

// Event listeners
document.getElementById('newBookBtn').addEventListener('click', () => {
    const form = document.getElementById('bookForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('addBookForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    document.getElementById('addBookForm').reset(); // Reset form fields
    document.getElementById('bookForm').style.display = 'none'; // Hide form
});