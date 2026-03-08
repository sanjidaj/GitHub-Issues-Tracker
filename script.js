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
        console.log(json.data);
        displayIssue(json.data);
});
};
 
const displayIssue = (issues) =>{

    const cardSection = document.getElementById("card-section");
    // cardSection.innerHTML = "";
    // console.log(postContainer);



    issues.forEach(issue => {
       const labelsBadge = issue.labels.map(label => `
      <p class="border ${label === "bug" ? "border-[#FECACA] text-[#EF4444] bg-[#FEECEC]" : "border-[#FDE68A] text-[#D97706] bg-[#FFF8DB]"} flex gap-2 px-2 py-1 items-center rounded-2xl text-[12px] uppercase">
      <img src="${label === "bug" ? "assets/BugDroid.png" : "assets/helpWanted.png"}" alt="${label}">
      ${label}</p>`).join("");
        
        const issueCard = document.createElement("div");
        // issueCard.className = ""
        issueCard.innerHTML =`<div class="issue-card bg-white p-3 h-60 w-60 object-cover space-y-1 rounded-md shadow-2xl">   
                <div class="flex justify-between">
                    <img class="status" src="assets/Open-Status.png" alt="${issue.status}">
                    <p  class="priority text-[12px] uppercase border border-[#FECACA] text-[#EF4444] bg-[#FEECEC] px-2 py-1 rounded-2xl ">${issue.priority}</p>
                </div>
                <div>
                    <h2  class="title text-[14px] font-semibold">${issue.title}</h2>
                    <p class="description text-[#64748B] text-[12px] ">${issue.description}</p>
                </div>
                <div class="flex gap-2">
                    ${labelsBadge}
                </div>
                <div class="divider"></div>
                <div>
                    <p class="id text-[#64748B] text-[12px]" >#${issue.id} by ${issue.author}</p>
                    <time class="text-[#64748B] text-[12px]"datetime="2024-01-15T10:30:00Z" >${issue.createdAt}</time>
                </div>
           </div>
        ` ;
        

        cardSection.appendChild(issueCard);

    });
};
loadIssues();