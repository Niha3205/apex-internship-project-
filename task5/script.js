// Movie Explorer script with streaming links
const API_KEY = 'thewdb';
const featuredList = ['Avengers','Inception','Batman','Interstellar','The Matrix','Titanic'];

// DOM
const featuredEl = document.getElementById('featured');
const resultsSection = document.getElementById('resultsSection');
const resultsEl = document.getElementById('results');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const modalBackdrop = document.getElementById('modalBackdrop');

// helper: fetch by search
async function fetchMoviesBySearch(q){
  try{
    const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${API_KEY}`);
    const data = await res.json();
    return data;
  }catch(e){ console.error(e); return null; }
}

// helper: fetch details by id
async function fetchMovieById(id){
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`);
  const data = await res.json();
  return data;
}

// render movie card
function makeCard(movie){
  const div = document.createElement('div');
  div.className = 'card';
  const img = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image';
  div.innerHTML = `
    <img src="${img}" alt="${movie.Title} poster">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    <button class="btn" onclick="openDetails('${movie.imdbID}')">View</button>
  `;
  return div;
}

// open modal with details + streaming links
async function openDetails(id){
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  modalBody.innerHTML = '<p style="color:var(--muted)">Loading...</p>';
  const data = await fetchMovieById(id);
  if(!data || data.Response === 'False'){ 
    modalBody.innerHTML = '<p style="color:var(--muted)">Details not available</p>'; 
    return; 
  }

  const poster = data.Poster && data.Poster!=='N/A' ? data.Poster : 'https://via.placeholder.com/400x600?text=No+Image';
  const safeTitle = encodeURIComponent(data.Title);

  modalBody.innerHTML = `
    <div class="modal-poster"><img src="${poster}" alt="${data.Title} poster"></div>
    <div class="modal-body">
      <h2>${data.Title} <small style="color:var(--muted)">(${data.Year})</small></h2>
      <div class="meta">Genre: ${data.Genre} • Runtime: ${data.Runtime} • Rated: ${data.Rated}</div>
      <div class="meta">IMDB Rating: ${data.imdbRating} • Votes: ${data.imdbVotes}</div>
      <p class="plot">${data.Plot}</p>
      <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
        <a class="btn" href="https://www.imdb.com/title/${data.imdbID}" target="_blank">View on IMDb</a>
        <a class="btn" href="https://www.justwatch.com/us/search?q=${safeTitle}" target="_blank">Watch on JustWatch</a>
        <a class="btn" href="https://www.youtube.com/results?search_query=${safeTitle}+full+movie" target="_blank">Search on YouTube</a>
      </div>
    </div>
  `;
}

// close modal
function closeModalFn(){ 
  modal.setAttribute('aria-hidden','true'); 
  document.body.style.overflow = ''; 
  modalBody.innerHTML = ''; 
}
closeModal.addEventListener('click', closeModalFn);
modalBackdrop.addEventListener('click', closeModalFn);

// render featured movies
async function loadFeatured(){
  featuredEl.innerHTML = '';
  for(const title of featuredList){
    const data = await fetchMoviesBySearch(title);
    if(data && data.Search){
      const movie = data.Search[0];
      featuredEl.appendChild(makeCard(movie));
    }
  }
}

// search handler
searchBtn.addEventListener('click', async ()=>{
  const q = searchInput.value.trim();
  if(!q){ alert('Please enter a movie name'); return; }
  resultsSection.style.display = 'block';
  resultsEl.innerHTML = '<p style="color:var(--muted)">Searching...</p>';
  const data = await fetchMoviesBySearch(q);
  if(!data || data.Response === 'False'){ 
    resultsEl.innerHTML = '<p style="color:var(--muted)">No results found</p>'; 
    return; 
  }
  resultsEl.innerHTML = '';
  data.Search.forEach(m=> resultsEl.appendChild(makeCard(m)));
});

// allow Enter key
searchInput.addEventListener('keydown', (e)=>{ 
  if(e.key==='Enter'){ e.preventDefault(); searchBtn.click(); } 
});

// load featured on start
loadFeatured();

// CONTACT form logic (contact.html)
if(typeof document !== 'undefined' && document.getElementById('contactForm')){
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMsg = document.getElementById('formMsg');
    if(!name||!email||!message){ 
      formMsg.textContent='⚠️ Fill all fields'; 
      formMsg.style.color='#f44336'; 
      return; 
    }
    if(!/^[^@]+@[^@]+\\.[^@]+$/.test(email)){ 
      formMsg.textContent='⚠️ Invalid email'; 
      formMsg.style.color='#f44336'; 
      return; 
    }
    formMsg.textContent='✅ Message sent!'; 
    formMsg.style.color='#2ecc71';
    form.reset();
    setTimeout(()=>formMsg.textContent='',2500);
  });
  document.getElementById('clearBtn').addEventListener('click', ()=>{ 
    form.reset(); 
    document.getElementById('formMsg').textContent=''; 
  });
}
