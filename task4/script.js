// FETCH RECIPES
if(document.getElementById("searchBtn")){
  document.getElementById("searchBtn").onclick=async()=>{
    const query=document.getElementById("searchInput").value.trim();
    const results=document.getElementById("results");
    if(!query){results.innerHTML="<p>⚠️ Enter a recipe name</p>";return;}
    results.innerHTML="<p>🔎 Searching...</p>";
    try{
      const res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data=await res.json();
      if(!data.meals){results.innerHTML="<p>❌ No recipes found.</p>";return;}
      results.innerHTML="";
      data.meals.forEach(meal=>{
        const card=document.createElement("div");
        card.className="recipe-card";
        card.innerHTML=`
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <button class="btn" onclick="showDetails('${meal.idMeal}')">View Recipe</button>
        `;
        results.appendChild(card);
      });
    }catch(err){
      results.innerHTML="<p>⚠️ Error fetching data</p>";
    }
  };
}

async function showDetails(id){
  const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data=await res.json();
  const meal=data.meals[0];
  const results=document.getElementById("results");
  results.innerHTML=`
    <div class="recipe-card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h2>${meal.strMeal}</h2>
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <p>${meal.strInstructions.substring(0,300)}...</p>
      <a class="btn" href="${meal.strYoutube}" target="_blank">Watch Video</a>
      <button class="btn" onclick="location.reload()">Back</button>
    </div>
  `;
}

// CONTACT FORM VALIDATION
if(document.getElementById("contactForm")){
  document.getElementById("contactForm").onsubmit=e=>{
    e.preventDefault();
    const name=document.getElementById("name").value.trim(),
          email=document.getElementById("email").value.trim(),
          msg=document.getElementById("message").value.trim(),
          formMsg=document.getElementById("formMsg");

    if(!name || !email || !msg){
      formMsg.textContent="⚠️ Please fill all fields!";
      formMsg.style.color="red"; return;
    }
    if(!/^[^@]+@[^@]+\.[^@]+$/.test(email)){
      formMsg.textContent="⚠️ Invalid email address!";
      formMsg.style.color="red"; return;
    }
    formMsg.textContent="✅ Message sent successfully!";
    formMsg.style.color="green";
    e.target.reset();
    setTimeout(()=>formMsg.textContent="",2500);
  };
}