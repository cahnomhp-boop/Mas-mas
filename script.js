const apiKey = "0de15874ccf6e0d3c7cf7e39e51f7c7a"; // ganti dengan key OpenWeather asli
const animContainer = document.getElementById('animation');

// Utility random
function rand(min,max){return Math.random()*(max-min)+min;}

// Init animasi default
function initDefaultAnimation(){
  animContainer.innerHTML = ""; // bersihkan dulu

  // Matahari
  const sun = document.createElement('div');
  sun.className = 'sun';
  animContainer.appendChild(sun);

  // Bulan
  const moon = document.createElement('div');
  moon.className = 'moon';
  animContainer.appendChild(moon);

  // Layer awan
  for(let i=1;i<=4;i++){
    const cloud = document.createElement('div');
    cloud.className = `cloud layer${i}`;
    cloud.style.left = rand(-200,window.innerWidth)+'px';
    animContainer.appendChild(cloud);
  }

  // Bintang acak
  for(let i=0;i<70;i++){
    const star = document.createElement('div');
    star.className = 'stars';
    star.style.top = rand(0,window.innerHeight)+'px';
    star.style.left = rand(0,window.innerWidth)+'px';
    star.style.animationDuration = rand(2,5)+'s';
    animContainer.appendChild(star);
  }

  // Hujan
  for(let i=0;i<100;i++){
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = rand(0,window.innerWidth)+'px';
    drop.style.animationDuration = rand(0.5,2)+'s';
    drop.style.opacity = rand(0.2,0.8);
    animContainer.appendChild(drop);
  }

  // Salju
  for(let i=0;i<50;i++){
    const snow = document.createElement('div');
    snow.className = 'snow';
    snow.style.left = rand(0,window.innerWidth)+'px';
    snow.style.animationDuration = rand(3,6)+'s';
    snow.style.opacity = rand(0.2,0.9);
    animContainer.appendChild(snow);
  }

  // Petir
  setInterval(()=>{
    if(Math.random()<0.05){ // 5% chance tiap 200ms
      flashLightning();
    }
  },200);
}

// Flash petir
function flashLightning(){
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.top='0';
  flash.style.left='0';
  flash.style.width='100%';
  flash.style.height='100%';
  flash.style.background='rgba(255,255,255,0.6)';
  flash.style.zIndex='-1';
  flash.style.pointerEvents='none';
  animContainer.appendChild(flash);
  document.getElementById('thunderSound').play();
  setTimeout(()=>{animContainer.removeChild(flash);},100);
}

// Fungsi cek cuaca
document.getElementById('checkBtn').addEventListener('click',()=>{
  const city = document.getElementById('city').value;
  if(!city) return alert('Masukkan nama kota!');

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(res=>res.json())
  .then(data=>{
    if(data.cod!==200) return alert('Kota tidak ditemukan!');
    const weather = document.getElementById('weather');
    weather.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${data.weather[0].description}</p>
      <p>🌡️ Suhu: ${data.main.temp}°C</p>
      <p>💨 Angin: ${data.wind.speed} m/s</p>
      <p>💧 Kelembapan: ${data.main.humidity}%</p>
    `;
    // Ubah background sesuai cuaca
    changeBackground(data.weather[0].main);
    playAudioEffect(data.weather[0].main);
  })
  .catch(err=>alert('Error:'+err));
});

// Ganti background
function changeBackground(weather){
  if(weather.toLowerCase().includes('rain')){
    document.body.style.background='linear-gradient(to bottom, #4a90e2, #001f3f)';
  }else if(weather.toLowerCase().includes('clear')){
    document.body.style.background='linear-gradient(to bottom, #87ceeb, #f0f8ff)';
  }else if(weather.toLowerCase().includes('snow')){
    document.body.style.background='linear-gradient(to bottom, #cce6ff, #ffffff)';
  }else if(weather.toLowerCase().includes('cloud')){
    document.body.style.background='linear-gradient(to bottom, #a0a0a0, #505050)';
  }else{
    document.body.style.background='linear-gradient(to bottom, #87ceeb, #f0f8ff)';
  }
}

// Main audio effect
function playAudioEffect(weather){
  const rain = document.getElementById('rainSound');
  const wind = document.getElementById('windSound');
  const thunder = document.getElementById('thunderSound');
  // reset semua
  [rain,wind,thunder].forEach(a=>a.pause());
  [rain,wind,thunder].forEach(a=>{a.currentTime=0;});

  if(weather.toLowerCase().includes('rain')){
    rain.play();
  }else if(weather.toLowerCase().includes('wind')){
    wind.play();
  }else if(weather.toLowerCase().includes('thunder')){
    thunder.play();
  }
}
