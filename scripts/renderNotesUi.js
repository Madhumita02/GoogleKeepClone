import {  notesContainer } from "./htmlElements.js";

export function new_checkbox() {
    // const noteCard = document.createElement("div");
    // noteCard.classList.add("note_card");

    // noteCard.innerHTML = `
    
    // `
    alert("Yet to work on");
}

export function new_note(note){
    const noteCard = document.createElement("div");
    noteCard.classList.add("note_card");
    noteCard.dataset.id = note.id;

    // remember u cant write multi line stuff with "" and ''
    noteCard.innerHTML = `
    <input type="text" class="note_title" placeholder="Title" readonly/>
        <input type="text" class="note_description" placeholder="Description" readonly/>
        <textarea class="note_content" placeholder="Write your note here..." readonly></textarea>
    `
    notesContainer.appendChild(noteCard);
}