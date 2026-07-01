const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));


let notes = [];


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/notes", (req, res) => {
    res.json(notes);
});


app.post("/notes", (req, res) => {

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const note = {
        id: Date.now(),
        title: title,
        content: content,
        createdAt: new Date().toISOString()
    };

    console.log(note);   

    notes.push(note);

    

    res.status(201).json(note);

});


app.get("/notes/search", (req, res) => {

    const date = req.query.date;

    if (!date) {
        return res.status(400).json({
            message: "Please select a date."
        });
    }

    const filteredNotes = notes.filter(note => {

        const noteDate = note.createdAt.split("T")[0];

        return noteDate === date;

    });

    res.json(filteredNotes);

});


app.delete("/notes/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = notes.findIndex(note => note.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes.splice(index, 1);

    res.json({
        message: "Note deleted successfully"
    });

});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});