let myLibrary = [];

function Book(title, author, pages, read) { 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return title + " by " + author + ", " + pages + " pages, " + read;
  }
}

function addBookToLibrary() {
  let title = window.prompt("Title:");
  let author = window.prompt("Author:");
  let pages = window.prompt("Pages:");
  let read = window.prompt("Read Status: (read or not read yet)");

  myLibrary.push(new Book(title, author, pages, read));

  showBooks()
}

function showBooks() {
  const div = document.getElementById("Books");
  
  if (div != null) {
    while (div.firstChild) {
      div.removeChild(div.lastChild);
    }
  }

  for (i = 0; i < myLibrary.length; i++)
  {
    if (myLibrary[i] == null) {
      continue;
    }

    const card = document.createElement('div');
    const title = document.createElement('h4');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    card.className = "card";
    card.id = i;

    title.innerHTML = myLibrary[i].title;
    author.innerHTML = myLibrary[i].author;
    pages.innerHTML = myLibrary[i].pages;
    read.innerHTML = myLibrary[i].read;

    deleteBtn.innerHTML = "delete";
    deleteBtn.onclick = function() {deleteBook(this);};

    if (myLibrary[i].read == "read") {
      readBtn.innerHTML = "not read";
    }
    else if (myLibrary[i].read == "not read") {
      readBtn.innerHTML = "read";
    }
    readBtn.onclick = function() {toggleRead(this);};
    
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(deleteBtn);
    card.appendChild(readBtn);

    div.appendChild(card);
  }
}

function deleteBook(delBtn) {
  delete myLibrary[delBtn.parentNode.id];

  myLibrary = myLibrary.sort();

  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[myLibrary.lastIndexOf()] == null) {
      myLibrary.pop();
    }
  }
  
  console.log(myLibrary);

  showBooks();
}

function toggleRead(readBtn) {
  if (myLibrary[readBtn.parentNode.id].read == "read") {
    myLibrary[readBtn.parentNode.id].read = "not read";
  }
  else if (myLibrary[readBtn.parentNode.id].read == "not read") {
    myLibrary[readBtn.parentNode.id].read = "read";
  }

  showBooks();
}

function addDefaultBooks() {
  myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 320, "read"));
  myLibrary.push(new Book("Dune", "Frank Herbert", 412, "not read"));
}

window.onload = function() {
  addDefaultBooks();
  showBooks();
}