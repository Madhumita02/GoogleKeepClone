import { editNoteModal, searchNotes, recycleBinHeading, toggleTrash, addNewButton, overlay, notesContainer, createTxt, createCheckList, noteType } from "./htmlElements.js";
import { finalSaveAndCleanUp } from "./editNote.js";
import { createNote } from "./createNewNotesArray.js";
import { isTrash } from "./htmlElements.js";
import { renderNotes } from "./rendernotesui.js";
import { saveNotes } from "./saveNotes.js";
import { filterSearchNotes } from "./searchNotes.js";
import { state } from "./notesData.js";
import { handleNoteClick } from "./handleNoteClick.js";

export function eventListeners() {

    
    let draggedNote = null;

    console.log(toggleTrash, addNewButton, overlay, noteType);

    toggleTrash.addEventListener("click", (e) => {
        isTrash.isTrash = !isTrash.isTrash;

        if(isTrash.isTrash) {
            toggleTrash.textContent = "Home Page";
            addNewButton.disabled = true;
            addNewButton.classList.add("disabled");
            recycleBinHeading.classList.remove("hidden");
        } else {
            toggleTrash.textContent = "Trash";
            addNewButton.disabled = false;
            addNewButton.classList.remove("disabled");
            recycleBinHeading.classList.add("hidden");
        }

        renderNotes();

    });

    addNewButton.addEventListener("click", () => {
        overlay.classList.remove("hidden");
        noteType.classList.remove("hidden");
        editNoteModal.classList.add("hidden");
    });
    // apparently just button.onclick = somefunc or onclick inside HTML 
    // tag doesnt handle multiple parallel handlers(in this case clicks)
    // also event names in addEventListener do not use 'on' so its "click" not "onclick"

    editNoteModal.addEventListener("click", e => { e.stopPropagation(); })
    noteType.addEventListener("click", e => { e.stopPropagation(); });

    overlay.addEventListener("click", (e) => {

        if (!editNoteModal.classList.contains("hidden")) {
            finalSaveAndCleanUp();
        }

        overlay.classList.add("hidden");
        noteType.classList.add("hidden");
        editNoteModal.classList.add("hidden");
        editNoteModal.innerHTML = "";

    })

    createTxt.addEventListener("click", ()=>{
    noteType.classList.add("hidden");
    editNoteModal.classList.remove("hidden");
    createNote("text");
    })

    createCheckList.addEventListener("click", () => {
    noteType.classList.add("hidden");
    overlay.classList.add("hidden");
    alert("yet to work on!");
    // editNoteModal.classList.remove("hidden");
    // createNote("checklist");
    })

    notesContainer.addEventListener("click", handleNoteClick);

    notesContainer.addEventListener("dragstart", (e) => {
        
        if(!isTrash.isTrash) {
            const noteCard = e.target.closest(".note_card");
            if(!noteCard) return;

            draggedNote = noteCard;

            e.dataTransfer.setData("text/plain", "note");

            noteCard.classList.add("dragging");
        }
    })

    notesContainer.addEventListener("dragover", (e)=> {
        
        if(!isTrash.isTrash) {
            e.preventDefault();

            if(!draggedNote) return;
        }

    })

    notesContainer.addEventListener("dragenter", (e) => {

            if(!isTrash.isTrash) {

            const targetCard = e.target.closest(".note_card");
            if(!targetCard || targetCard === draggedNote) return;

            const targetNote = state.notes.find(n => n.id === Number(targetCard.dataset.id) );

            if (targetNote?.isPinned) return; 

            const draggedIsJustBefore = (  draggedNote.nextElementSibling === targetCard);
            
            if(draggedIsJustBefore) {
                targetCard.insertAdjacentElement("afterend", draggedNote);
                //insert the dragged note after the target note as siblings
            } else {
                notesContainer.insertBefore(draggedNote, targetCard);
                //insert the dragged note before targetcard inside the parent class notesContainer
            }
        }
    })

    notesContainer.addEventListener("dragend", (e) => {

        if(!isTrash.isTrash) {
            const noteCard = e.target.closest(".note_card");
            if(!noteCard) return;

            draggedNote = null;

            noteCard.classList.remove("dragging");

            const cards = notesContainer.querySelectorAll(".note_card");

            let order = 0;

            for (const card of cards) {
                const note = state.notes.find(n => n.id === Number(card.dataset.id));

                if (!note) continue;
                if (note.isPinned) continue; 

                note.order = order++;
            }

            saveNotes();
            renderNotes();

        }  

    })

    searchNotes.addEventListener("input", (e) =>{
         filterSearchNotes(e.target.value);
    });

    searchNotes.addEventListener("drop", (e) => {
    e.preventDefault();
    });

}