import { state } from "./notesData.js";

export function saveNotes() {
    localStorage.setItem("localstoragenotes", JSON.stringify(state.notes));
}