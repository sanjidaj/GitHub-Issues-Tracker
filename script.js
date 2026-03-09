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
};

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
    count();
});
openBtn.addEventListener("click",(event) =>{
    clickBtn(openBtn);
    loadIssues("open");
});
closedBtn.addEventListener("click",(event) =>{
    clickBtn(closedBtn);
    loadIssues("closed");
});

const allCardSection = document.getElementById("card-section");
const totalCount = document.getElementById("total-count");

function count(){
    totalCount.innerText = allCardSection.children.length;
};



 const loadingSpinner = document.getElementById("loading-spinner");

 const loadIssues = (status) => {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
     .then((res) => res.json())
     .then(json => {
        loadingSpinner.classList.add("hidden");
        const filtered = status ? json.data.filter(issue => issue.status === status): json.data;
        displayIssue(filtered);
        count();
       
});
};
 
const displayIssue = (issues) =>{

    const cardSection = document.getElementById("card-section");
    cardSection.innerHTML = "";
   



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

        issueCard.innerHTML =`<div class="issue-card bg-white p-3 h-60 w-60  space-y-2 rounded-md shadow-2xl  ${borderStatus} flex flex-col" >   
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
        
        issueCard.addEventListener("click",() => openIssueModal(issue.id) );
        cardSection.appendChild(issueCard);

    });
};


 const openIssueModal = (cardId) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`;
    fetch(url)
     .then((res) => res.json())
     .then(json => {
        console.log("API response:", json);
        displayDetails(json.data);
        document.getElementById("issue-details").showModal();
        console.log(document.getElementById("issue-details"));
 });
};
const displayDetails  = (card) =>{

    const singleCard = document.getElementById("single-card");
    singleCard.innerHTML = "";

       
       const labelsBadge = card.labels.map(label => `
      <p class="border ${label === "bug" ? "border-[#FECACA] text-[#EF4444] bg-[#FEECEC]" : "border-[#FDE68A] text-[#D97706] bg-[#FFF8DB]"} flex gap-0.5 px-2  items-center rounded-2xl text-[10px] uppercase  text-nowrap">
      <img src="${label === "bug" ? "assets/BugDroid.png" : "assets/helpWanted.png"}" alt="${label}">
      ${label}</p>`).join("");
      let priorityBadge;
      if(card.priority === "high"){
        priorityBadge = "border  text-white bg-[#EF4444]";
      }
      else if(card.priority === "low"){
        priorityBadge = "text-white bg-[#9CA3AF]";
      }
      else{
         priorityBadge = "text-white bg-[#F59E0B]";
      }
      let statusColor ;
      if(card.status === "open"){
        statusColor = "bg-[#00A96E]";
      }
      else{
         statusColor = "bg-[#A855F7]";
      }
      const date = new Date(card.createdAt).toLocaleDateString();
     

    const cardDetails = document.createElement("div");
    cardDetails.innerHTML = `
            <div class="modal-box space-y-3">
                <h2 class="title font-bold text-[24px]">${card.title}</h2>
                <div class="flex gap-2 items-center">
                    <p class="${statusColor} text-white text-[12px] rounded-full px-2 py-1 ">${card.status}</p>
                    <p class="assignee text-[#64748B] text-[12px]">${card.status} by ${card.assignee}</p>
                    <time class="text-[#64748B] text-[12px]"datetime="${card.createdAt}" >${date}</time>
                </div>
                <div class ="space-y-2">
                    <div class="flex gap-1">
                    ${labelsBadge}
                    </div>
                    <p class="description  text-[#64748B] text-[12px] line-clamp-2">${card.description}</p>
                </div>
                <div class="card bg-base-300 rounded-box grid h-20 place-items-center grid-cols-2">
                    <p>Assignee:<br> <span class="font-bold">${card.assignee}</span></p>
                    <p>Priority:<br> <span class="text-[12px] uppercase px-2 py-1 rounded-2xl ${priorityBadge}">${card.priority}</span></p>
                </div>

                <div class="modal-action">
                    <form method="dialog">
                
                        <button class="btn btn-primary">Close</button>
                    </form>
                </div>
            </div>`

       singleCard.appendChild(cardDetails);


};
loadIssues();
