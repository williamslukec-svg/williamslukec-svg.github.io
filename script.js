function getRounds() {
  return JSON.parse(localStorage.getItem("rounds") || "[]");
}

function saveRounds(r) {
  localStorage.setItem("rounds", JSON.stringify(r));
}

function addRound() {
  const r = {
    course: course.value,
    location: location.value,
    lat: Number(lat.value),
    lng: Number(lng.value),
    rating: Number(rating.value),
    score: Number(score.value),
    date: new Date()
  };

  const rounds = getRounds();
  rounds.push(r);
  saveRounds(rounds);
  alert("Round added");
  location.reload();
}

function updateStats() {
  const rounds = getRounds();
  totalRounds.innerText = rounds.length;

  const year = new Date().getFullYear();
  yearRounds.innerText =
    "Rounds this year: " +
    rounds.filter(r => new Date(r.date).getFullYear() === year).length;
}

function loadMap() {
  const map = L.map("map").setView([20,0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  getRounds().forEach(r => {
    L.marker([r.lat, r.lng]).addTo(map)
      .bindPopup(`<b>${r.course}</b><br>${r.location}<br>Rating: ${r.rating}/10`);
  });
}

function calculateHandicap() {
  const r = getRounds();
  if (!r.length) return;
  const avg = r.reduce((s,x)=>s+x.score,0)/r.length;
  handicap.innerText = (avg - 72).toFixed(1);
}
