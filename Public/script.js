let allNotes = [];

async function loadNotes() {

    const response = await fetch("/notes");

    allNotes = await response.json();

    displayNotes(allNotes);

}

function displayNotes(notes) {

    const notesDiv = document.getElementById("notes");

    notesDiv.innerHTML = "";

    if (notes.length === 0) {

        notesDiv.innerHTML = "<p>No notes found.</p>";

        return;
    }

    notes.forEach(note => {

        const date = new Date(note.createdAt).toLocaleDateString();

        notesDiv.innerHTML += `
            <div class="note">

                <h3>${note.title}</h3>

                <p>${note.content}</p>

                <small> Created: ${date}</small>

                <br>

                <button onclick="deleteNote(${note.id})">
                    Delete
                </button>

            </div>
        `;

    });

}

async function addNote() {

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;

    if (title === "" || content === "") {

        alert("Please fill all fields!");

        return;

    }

    await fetch("/notes", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            content
        })

    });

    document.getElementById("title").value = "";

    document.getElementById("content").value = "";

    loadNotes();

}

async function deleteNote(id) {

    await fetch(`/notes/${id}`, {

        method: "DELETE"

    });

    loadNotes();

}

async function searchByDate() {

    const date = document.getElementById("searchDate").value;

    if (date === "") {

        alert("Please select a date.");

        return;

    }

    const response = await fetch(`/notes/search?date=${date}`);

    const notes = await response.json();

    displayNotes(notes);

}

loadNotes();
