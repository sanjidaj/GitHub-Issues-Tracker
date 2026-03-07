const signInBtn = document.getElementById("sign-in-btn")
 .addEventListener("click",(event) =>{
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const defaultUsername = "admin";
    const defaultPassword = "admin123";

    if(usernameInput === defaultUsername && passwordInput === defaultPassword){

        window.location.href = "home.html";

    }
    else{
        alert("Invalid credentials!");
    }

 });