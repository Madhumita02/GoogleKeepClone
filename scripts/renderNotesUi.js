import {  notesContainer } from "./htmlElements.js";
import { state } from "./notesData.js";
import { saveNotes } from "./saveNotes.js";
import { isTrash } from "./htmlElements.js";

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
    <div class="note_header">
        ${isTrash.isTrash ?
            `
            <button class="restore_note">Restore</button>
            <button class="permanent_delete_note">Delete Forever</button>
            `
            :
            `
            <span class="drag_handle" draggable="true">⋮⋮</span>
            <button class="delete_note">Delete</button>
            `
        }     
    </div>

    <input type="text" class="note_title" placeholder="Title" readonly/>
        <input type="text" class="note_description" placeholder="Description" readonly/>
        <textarea class="note_content" placeholder="Write your note here..." readonly></textarea>
    `

    noteCard.querySelector(".note_title").value = note.title;
    noteCard.querySelector(".note_description").value = note.description;
    noteCard.querySelector(".note_content").value = note.content;

    notesContainer.appendChild(noteCard);
}

export function renderNotes() {

    const main = document.querySelector("main");
    
    notesContainer.innerHTML="";

    if(!isTrash.isTrash){
        cleanNotes();
        sortNotes();
    }

    // if (isTrash.isTrash) {
    //     const heading = document.createElement("h2");
    //     heading.textContent = "Recycle Bin";
    //     main.prepend(heading);
    // }

    if(!isTrash.isTrash) {

        for(let note of state.notes) {

            if(note.type === "checklist") {
                console.log("Yet to work on checklist rendering");
                continue;
            }

            if(note.isDeleted) continue;

            new_note(note);

        }

    } else {

                for(let note of state.notes) {

            if(note.type === "checklist") {
                console.log("Yet to work on checklist rendering");
                continue;
            }

            if(!note.isDeleted) continue;

            new_note(note);

        }

    }

    // console.log("rendered notes.");
}

function cleanNotes() {

    const cleanedNotes = [];

    for(let note of state.notes) {
        
        if(note.type ==="checklist") {
            cleanedNotes.push(note);
            continue;
        }

        const t = note.title.trim();
        const d = note.description.trim();
        const c = note.content.trim();

        if(note.isEditing === false && !t && !d && !c) {
            continue;
        }

        cleanedNotes.push(note);
    }

    state.notes = cleanedNotes;
}

function sortNotes() {
    const pinned = [];
    const normal = [];

    for(let note of state.notes) {
        if(note.isPinned===true) {
            pinned.push(note);
        } else {
            normal.push(note);
        }
    }
    
    pinned.sort((a, b) => a.pinOrder - b.pinOrder);
    normal.sort((a, b) => a.order - b.order);
    // This basically means if u return a negative 
    // number b>a +ve num then a>b and 0 means both
    // are equal. And with this sort will sort the 
    // numbers as numbers instead of as strings.


    const orderedNotes =pinned.concat(normal);
    state.notes = orderedNotes;
    saveNotes();

}