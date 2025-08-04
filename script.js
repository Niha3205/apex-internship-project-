function search() {
  const query = document.getElementById('searchInput').value;
  if (query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  } else {
    alert("Please enter a search term.");
  }
}

function lucky() {
  window.open("https://www.google.com/doodles", "_blank");
}

function showPopup() {
  alert("Welcome to the ApexPlanet Internship Program! Make sure to complete your daily tasks and submit them on time.");
}
