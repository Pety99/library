const modal = document.getElementById("popup");
const btn = document.getElementById("addBook");
const span = document.getElementsByClassName("close")[0];
const close = document.querySelector('.close-window')
const form = document.querySelector('.form');

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

close.addEventListener('click', () =>{
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

form.addEventListener('submit', addBook)

function addBook(event){
    event.preventDefault();              // won't reload the page
    myB = Array.from(document.querySelectorAll('.modal-content input')).reduce((acc, input) => {acc[input.id] = input.value; return acc;}, {});
    const inRead = document.querySelector('#inRead');
    myB.inRead = inRead.checked;        // the .value is not correct for this field, needs .checked instead
    addBookToLibrary(new Book(myB.inTitle, myB.inAuthor, myB.inPages, myB.inRead, uuidv4()));
    modal.style.display = "none";       // hides the form
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
