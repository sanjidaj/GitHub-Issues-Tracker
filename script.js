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

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const buttons = [allBtn,openBtn,closedBtn];
function clickBtn(activeBtn){
    buttons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-default");
    });
    activeBtn.classList.add("btn-primary");
    activeBtn.classList.remove("btn-default");

}
allBtn.addEventListener("click",(event) =>{
    clickBtn(allBtn);
    loadIssues();
});
openBtn.addEventListener("click",(event) =>{
    clickBtn(openBtn);
    loadIssues();
});
closedBtn.addEventListener("click",(event) =>{
    clickBtn(closedBtn);
    loadIssues();
});




 const loadingSpinner = document.getElementById("loading-spinner");

 const loadIssues = () => {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
     .then((res) => res.json())
     .then(json => {
        loadingSpinner.classList.add("hidden");
        displayIssue(json.data);
});
};
 
const displayIssue = (issues) =>{

    const cardSection = document.getElementById("card-section");
    // cardSection.innerHTML = "";
    // console.log(postContainer);



    issues.forEach(issue => {
       const labelsBadge = issue.labels.map(label => `
      <p class="border ${label === "bug" ? "border-[#FECACA] text-[#EF4444] bg-[#FEECEC]" : "border-[#FDE68A] text-[#D97706] bg-[#FFF8DB]"} flex gap-0.5 px-2  items-center rounded-2xl text-[10px] uppercase text-nowrap">
      <img src="${label === "bug" ? "assets/BugDroid.png" : "assets/helpWanted.png"}" alt="${label}">
      ${label}</p>`).join("");
      let priorityBadge;
      if(issue.priority === "high"){
        priorityBadge = "border text-[#EF4444] bg-[#FEECEC]";
      }
      else if(issue.priority === "low"){
        priorityBadge = "border text-[#9CA3AF] bg-[#EEEFF2]";
      }
      else{
         priorityBadge = "border  text-[#F59E0B] bg-[#FFF6D1]";
      }
      let statusImg ;
      if(issue.status === "open"){
        statusImg = "assets/Open-Status.png";
      }
      else{
        statusImg = "assets/Closed-Status.png";
      }
      const date = new Date(issue.createdAt).toLocaleDateString();
      let borderStatus;
      if(issue.status === "open"){
        borderStatus = "border-t-5 border-[#00A96E]";
      }
      else{
        borderStatus = "border-t-5 border-[#A855F7]";
      }

        
        const issueCard = document.createElement("div");

        issueCard.innerHTML =`<div class="issue-card bg-white p-3 h-60 w-60  space-y-2 rounded-md shadow-2xl  ${borderStatus} flex flex-col ">   
                <div class="grow space-y-2">
                <div class="flex justify-between ">
                    <img class="status w-5 h-5 rounded-full object-cover" src="${statusImg}" alt="${issue.status}">
                    <p  class="priority text-[10px] uppercase px-3 py-1 rounded-2xl ${priorityBadge}">${issue.priority}</p>
                </div>
                <div>
                    <h2  class="title text-[14px] font-semibold line-clamp-2">${issue.title}</h2>
                    <p class="description text-[#64748B] text-[12px] line-clamp-2">${issue.description}</p>
                </div>
                <div class="flex gap-1">
                    ${labelsBadge}
                </div>
                </div>
                <div class="divider"></div>
                <div>
                    <p class="id text-[#64748B] text-[12px]" >#${issue.id} by ${issue.author}</p>
                    <time class="text-[#64748B] text-[12px]"datetime="${issue.createdAt}" >${date}</time>
                </div>
           </div>
        ` ;
        

        cardSection.appendChild(issueCard);

    });
};
loadIssues();