// QUIZ
const questions = [
  { q:"Which HTML tag creates a link?", c:["<a>","<link>","<href>","<url>"], a:0 },
  { q:"CSS property to change text color?", c:["color","font-size","bgcolor","font-color"], a:0 },
  { q:"JS function to select element by ID?", c:["getElementById()","querySelectorAll()","idSelect()","findById()"], a:0 },
  { q:"Which tag is used for the largest heading?", c:["<h6>","<heading>","<h1>","<head>"], a:2 },
  { q:"Which CSS property controls text size?", c:["text-size","font-style","font-size","text-font"], a:2 },
  { q:"How do you write a comment in JavaScript?", c:["<!-- -->","//","##","**"], a:1 },
  { q:"Which attribute gives alternate text for an image?", c:["alt","title","src","longdesc"], a:0 },
  { q:"Which CSS property makes text bold?", c:["font-weight","text-bold","bold","font-style"], a:0 }
];
let currentQ=0,score=0;
const qtext=document.getElementById("qtext"),
      choices=document.getElementById("choices"),
      counter=document.getElementById("counter"),
      prevBtn=document.getElementById("prevBtn"),
      nextBtn=document.getElementById("nextBtn"),
      quizBox=document.getElementById("quizBox");

function renderQ(){
  const q=questions[currentQ];
  qtext.textContent=q.q;
  choices.innerHTML="";
  q.c.forEach((choice,i)=>{
    let btn=document.createElement("button");
    btn.textContent=choice;
    btn.onclick=()=>{if(i===q.a) score++; nextQ();};
    choices.appendChild(btn);
  });
  counter.textContent=`Question ${currentQ+1} / ${questions.length}`;
  prevBtn.style.display=currentQ===0?"none":"inline-block";
}
function nextQ(){currentQ++; if(currentQ<questions.length) renderQ(); else showScore();}
function prevQ(){if(currentQ>0){currentQ--; renderQ();}}
function showScore(){
  quizBox.innerHTML=`
    <div class="score-card">
      <h2>🎉 Quiz Completed!</h2>
      <p>Your Score: <strong>${score} / ${questions.length}</strong></p>
      <button class="btn" onclick="location.reload()">Restart Quiz</button>
    </div>`;
}
nextBtn?.addEventListener("click",nextQ);
prevBtn?.addEventListener("click",prevQ);
if(qtext) renderQ();

// DOG API
if(document.getElementById("dogBtn")){
  document.getElementById("dogBtn").onclick=async()=>{
    let r=await fetch("https://dog.ceo/api/breeds/image/random");
    let d=await r.json();
    document.getElementById("dogArea").innerHTML=
      `<img src="${d.message}" alt="dog">`;
  };
}

// CONTACT FORM
if(document.getElementById("contactForm")){
  document.getElementById("contactForm").onsubmit=e=>{
    e.preventDefault();
    const name=document.getElementById("name").value,
          email=document.getElementById("email").value,
          message=document.getElementById("message").value,
          msg=document.getElementById("formMsg");
    if(!name||!email||!message){
      msg.textContent="⚠️ Fill all fields";
      msg.style.color="red"; return;
    }
    msg.textContent="✅ Message sent!";
    msg.style.color="green";
    e.target.reset();
    setTimeout(()=>msg.textContent="",2000);
  };
}
