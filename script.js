let library = [];

function Book(title, author, pages, read, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.ID = id;
};

function addBookToLibrary(book){
    const books = document.querySelector('.books');
    library.push(book);
    row = createBookElement(book);
    console.log(`Creating book: ${book.ID} `)
    row.setAttribute('data-index', book.ID);
    books.appendChild(row);
    localStorage.setItem('Library', JSON.stringify(library));
};

function removeBookFromLibray(index){
    const headerRows = 2;
    const books = document.querySelector('.books');
    // find the element on the nodelist which has the index-data property set to the valeu of index
    child = Array.from(books.childNodes).filter(node => node.dataset !== undefined && node.dataset.index == index).pop();
    console.log(index)
    console.log(child)
    console.log(library)
    books.removeChild(child);
    library = library.filter( b => b.ID != index);

    localStorage.setItem('Library', JSON.stringify(library));

}

function displayLibrary(){
    library = JSON.parse(localStorage.getItem('Library'))
    if(library == null){
        library = [];
    }
    const books = document.querySelector('.books');
    library.forEach(book => {
        const row = createBookElement(book);
        row.setAttribute('data-index', book.ID);
        books.appendChild(row);
    });
}

function toggleCheckBox(id){
    let library = JSON.parse(localStorage.getItem('Library'))
    library.forEach(b => {
        if(b.ID == id){
            b.read = !b.read;
        }
    });
    localStorage.setItem('Library', JSON.stringify(library));
}

function createBookElement(book, bookIdx){
    const row = document.createElement('tr');

    const title = document.createElement('td');
    title.textContent = book.title;

    const author = document.createElement('td');
    author.textContent = book.author;

    const pages = document.createElement('td');
    pages.textContent = book.pages;

    const read = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = book.read ? true : false;
    checkbox.addEventListener('click', () => toggleCheckBox(book.ID));
    read.appendChild(checkbox);

    const deleteBook = document.createElement('td');

    const button = document.createElement('button');
    button.classList.add('btn')
    button.classList.add('btn-link')
    const i = document.createElement('i');
    i.classList.add('fa')
    i.classList.add('fa-trash')
    button.appendChild(i);

    deleteBook.appendChild(button);
    deleteBook.classList.add('delete');
    deleteBook.addEventListener('click', () => removeBookFromLibray(book.ID));

    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(read);
    row.appendChild(deleteBook);

    return row;
}

displayLibrary();

