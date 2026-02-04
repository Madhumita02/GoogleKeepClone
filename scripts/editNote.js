import { state } from "./notesData.js";

export function handleNoteClick(e){
    const noteClicked = e.target.closest(".note_card");
    if(!noteClicked ) return;

    console.log(noteClicked.className);
    const noteId = noteClicked.dataset.id;

    editNote(noteId)
}

function editNote(noteId) {

    const noteClicked =  document.querySelector(`.note_card[data-id="${noteId}"]`);
    // so only if u put backticks on the outermost quotes it will
    // read it as such if you put "" or '' as the outermost and you 
    // wont get the value of noteId but it will take it as data-id="${noteId}" where?

    const overlay = document.getElementById("note_overlay")

    overlay.classList.remove("hidden");
    noteClicked.classList.add("note_card--expanded");  

}