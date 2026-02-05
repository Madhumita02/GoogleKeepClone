import { notesContainer } from "./htmlElements.js";

export function filterSearchNotes(input) {

    const searchText = input.toLowerCase().trim();
    
    const notes = notesContainer.querySelectorAll('.note_card');

    notes.forEach(note => {
        const title = note.querySelector('.note_title')?.value.toLowerCase().trim() || '';
        const description = note.querySelector('.note_description')?.value.toLowerCase().trim() || '';
        const content = note.querySelector('.note_content')?.value.toLowerCase().trim() || '';

        if (!searchText || title.includes(searchText) || description.includes(searchText) || content.includes(searchText)) {
            note.classList.remove('hidden'); 
        } else {
            note.classList.add('hidden'); 
        }
    });

}