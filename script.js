const signInBtn = document.getElementById("sign-in-btn")
 if(signInBtn){
    signInBtn.addEventListener("click",(event) =>{
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
}

 const loadIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
     .then((res) => res.json())
     .then(json => {
        console.log(json);
        // displayIssue(json);
});
};
 
// const displayIssue = (issues) =>{

//     const cardSection = document.getElementById("card-section");
//     cardSection.innerHTML = "";
//     // console.log(postContainer);



//     issues.forEach(issue =>{
    
//         const issueCard = document.createElement("div");
//         issueCard.innerHTML = ` <div id="issue-card" class="">   
//                 <div>
//                     <img id="status" src="assets/Open-Status.png" alt="">
//                     <p id="priority">High</p>
//                 </div>
//                 <div>
//                     <h2 id="title">Fix navigation menu on mobile devices</h2>
//                     <p id="description">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
//                 </div>
//                 <div id="labels">
//                     <p>Bug</p>
//                     <p>Help Wanted</p>
//                 </div>
//                 <hr>
//                 <div>
//                     <p id="author">john_doe</p>
//                     <time datetime="2024-01-15T10:30:00Z">1/15/2024</time>
//                 </div>
//            </div>`;
        

//         cardSection.append(issueCard);

//     })
// };
loadIssues();