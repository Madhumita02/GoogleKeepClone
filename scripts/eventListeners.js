import { editNoteModal, trash, addNewButton, overlay, notesContainer, createTxt, createCheckList, noteType } from "./htmlElements.js";
import { handleNoteClick, finalSaveAndCleanUp } from "./editNote.js";
import { createNote } from "./createNewNotesArray.js";

export function eventListeners() {

    console.log(trash, addNewButton, overlay, noteType);

    trash.addEventListener("click", () => {alert("Yet to work on")});

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