const BASE = "http://localhost:3000/notes";

export async function createNoteOnServer(note){
   try {await fetch(BASE,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(note)
   });} catch(e) {
      console.log(e)
   }
}

export async function updateNoteOnServer(note){
   console.log("first")
   try{
      console.log("entering try in update")
      const res = await fetch(`${BASE}/${note.id}`,{
         method:"PUT",
         headers:{ "Content-Type":"application/json" },
         body: JSON.stringify(note)
      });
   console.log("updated notes on server", res)
   } catch(e){
      console.log(e)
   }
}

export async function deleteNoteFromServer(id){
   try{await fetch(`${BASE}/${id}`,{
      method:"DELETE"
   });} catch(e) {
      console.log(e)
   }
}
