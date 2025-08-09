document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookForm");
    const tableBody = document.querySelector("#bookTable tbody");
    const editIndex = document.getElementById("editIndex");

    function loadBooks() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        tableBody.innerHTML = "";
        books.forEach((book, index) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>
                        <button onclick="editBook(${index})">Editar</button>
                        <button onclick="deleteBook(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        let books = JSON.parse(localStorage.getItem("books")) || [];

        if (editIndex.value) {
            books[editIndex.value] = { title, author };
            editIndex.value = "";
        } else {
            books.push({ title, author });
        }

        localStorage.setItem("books", JSON.stringify(books));
        form.reset();
        loadBooks();
    });

    window.editBook = function(index) {
        const books = JSON.parse(localStorage.getItem("books"));
        document.getElementById("title").value = books[index].title;
        document.getElementById("author").value = books[index].author;
        editIndex.value = index;
    };

    window.deleteBook = function(index) {
        let books = JSON.parse(localStorage.getItem("books"));
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        loadBooks();
    };

    loadBooks();
});
