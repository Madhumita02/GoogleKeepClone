import { trash, addNewButton, overlay, notesContainer, createTxt, createCheckList, noteType } from "./htmlElements.js";
import { handleNoteClick } from "./editNote.js";
import { createNote } from "./createNewNotesArray.js";

export function eventListeners() {

    trash.addEventListener("click", () => {alert("Yet to work on")});

    addNewButton.addEventListener("click", () => {
        overlay.classList.remove("hidden");
        noteType.classList.remove("hidden");
    });
    // apparently just button.onclick = somefunc or onclick inside HTML 
    // tag doesnt handle multiple parallel handlers(in this case clicks)
    // also event names in addEventListener do not use 'on' so its "click" not "onclick"

    overlay.addEventListener("click", (e) => {
    if(e.target === overlay){
        overlay.classList.add("hidden");
        noteType.classList.add("hidden");
    }
    })

    createTxt.addEventListener("click", ()=>{
    overlay.classList.add("hidden");
    noteType.classList.add("hidden");
    createNote("text");
    })

    createCheckList.addEventListener("click", () => {
    overlay.classList.add("hidden");
    noteType.classList.add("hidden");
    createNote("checklist");
    })

    notesContainer.addEventListener("click", handleNoteClick);


}