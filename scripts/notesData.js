import { updateNoteOnServer } from "./serverSync.js";

export const state = {
    notes : [],
}

export async function loadNotes(){
   const user = JSON.parse(localStorage.getItem("loggedInUser"));
   if(!user) return;

   const localKey = `notes_${user.id}`;
   const local = JSON.parse(localStorage.getItem(localKey)) || [];

   try{
      const res = await fetch(`http://localhost:3000/notes?userId=${user.id}`);
      const server = await res.json();

      const {merged, toUpload} = mergeNotes(local, server)

      state.notes = merged;
      localStorage.setItem(localKey, JSON.stringify(merged));

      syncNotes(toUpload);

   }catch{
      state.notes = local;
   }
}


function mergeNotes(localNotes, serverNotes){

   const map = new Map();
   const toUpload = [];

   localNotes.forEach(note=>{
      map.set(String(note.id), note);
   });

   serverNotes.forEach(serverNote=>{
      const id = String(serverNote.id);
      const localNote = map.get(id);

      if(!localNote){
         map.set(id, serverNote);
         return;
      }

      const localTime = Number(localNote.modifiedAt || 0);
      const serverTime = Number(serverNote.modifiedAt || 0);

      if(localTime > serverTime){
         toUpload.push(localNote);
      }
      else if(serverTime > localTime){
         map.set(id, serverNote);
      }
   });

   return {
      merged: Array.from(map.values()),
      toUpload
   };
}



function syncNotes(notes){
   notes.forEach(note=>{
      updateNoteOnServer(note);
   });
}
