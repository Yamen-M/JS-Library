const formContainer = document.querySelector('.formContainer');
const bookDisplay = document.querySelector('.books-grid');
const newBookBtn = document.getElementById('newBookBtn');
newBookBtn.addEventListener('click', addNewBook);

const myLibrary = [];


function Book(title, author, pages, status){
    
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

}

function addBookToLibrary(title, author, pages, status) {

    const newBook = new Book(title, author, pages, status);

    myLibrary.push(newBook);

    displayBooks();
}

function displayBooks() {
    bookDisplay.innerHTML = '';

    if (myLibrary.length === 0) {
        bookDisplay.innerHTML = `
            <div class="empty-library">
                <h3>Your library is empty</h3>
                <p>Add your first book using the form on the left!</p>
            </div>
        `;
        return;
    }

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        bookCard.dataset.id = book.id;

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.status}</p>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('remove');
        deleteBtn.setAttribute('data-id', book.id);
        deleteBtn.addEventListener('click', () => {
            deleteBook(book.id);
        });

        bookCard.appendChild(deleteBtn);
        bookDisplay.appendChild(bookCard);
    });
}

function deleteBook(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1); 
        displayBooks(); 
    }
}

function addNewBook(){

    formContainer.innerHTML = ''; 
    const bookForm = document.createElement("form");

    const fields = [
        { label: 'Title', type: 'text', name: 'title', placeholder: 'Enter book title' },
        { label: 'Author', type: 'text', name: 'author', placeholder: 'Enter author name' },
        { label: 'Pages', type: 'number', name: 'pages', placeholder: 'Number of pages' },
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.required = true;

        if (field.type === 'number') {
            input.min = "1";        
        }

        label.appendChild(input);

        bookForm.appendChild(label);
        bookForm.appendChild(document.createElement('br'));
    });    

    const statusLabel = document.createElement('label');
    const statusText = document.createTextNode('Mark as Read');
    const statusCheckbox = document.createElement('input');
    statusCheckbox.type = 'checkbox';
    statusCheckbox.name = 'status';
    statusLabel.appendChild(statusCheckbox);
    statusLabel.appendChild(statusText);

    bookForm.appendChild(statusLabel);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Add Book';

    bookForm.appendChild(submitBtn);

    formContainer.appendChild(bookForm);

    bookForm.addEventListener('submit', (e) =>{

        e.preventDefault();

        const formData = new FormData(bookForm);

        const title = formData.get('title');
        const author = formData.get('author');
        const pages = formData.get('pages');
        const status = statusCheckbox.checked ? 'Read' : 'Not Read';

        addBookToLibrary(title, author, pages, status);

        bookForm.reset();
    });

}

window.onload = function() {
    addBookToLibrary("Berserk", "Kentaro Miura", 1280, "Read");
    addBookToLibrary("Vinland Saga", "Makoto Yukimura", 234, "Not Read");
};