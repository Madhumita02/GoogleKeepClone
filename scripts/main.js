import { eventListeners } from "./eventListeners.js";
import { renderNotes } from "./renderNotesUi.js";
import { loadNotes } from "./notesData.js";

async function init() {   
  await loadNotes();
  renderNotes();  
  eventListeners();        
}

init();