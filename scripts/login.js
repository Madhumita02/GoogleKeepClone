const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(
      `http://localhost:3000/users?username=${username}`
    );

    const users = await response.json();

    if (username === "") {
    alert("Invalid username");
    return;
    }



    const user = users[0];



    if (user.password !== password) {
    alert("Wrong password");
    return;}

      localStorage.setItem("loggedInUser", JSON.stringify(user));

      window.location.href = "notes.html";
    

  } catch (e) {
    console.log("Login error:", e);
  }
});
