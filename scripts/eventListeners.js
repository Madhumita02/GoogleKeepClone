import { editNoteModal,recycleBinHeading, toggleTrash, addNewButton, overlay, notesContainer, createTxt, createCheckList, noteType } from "./htmlElements.js";
import { handleNoteClick, finalSaveAndCleanUp } from "./editNote.js";
import { createNote } from "./createNewNotesArray.js";
import { isTrash } from "./htmlElements.js";
import { renderNotes } from "./rendernotesui.js";

export function eventListeners() {

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


}