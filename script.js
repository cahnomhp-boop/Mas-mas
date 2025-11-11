let lightningInterval,rainAudio,windAudio,thunderAudio;

// API Key langsung di script
const API_KEY = "0de15874ccf6e0d3c7cf7e39e51f7c7a"; // <-- ganti dengan key kamu

function clearAnimation(){
  const anim=document.getElementById('animation'); anim.innerHTML=''; anim.className='';
  document.body.classList.remove('night','day','sunset');
  if(lightningInterval) clearInterval(lightningInterval);
  if(rainAudio){rainAudio.pause(); rainAudio.currentTime=0;}
  if(windAudio){windAudio.pause(); windAudio.currentTime=0;}
  if(thunderAudio){thunderAudio.pause(); thunderAudio.currentTime=0;}
}

function createRain(){
  const anim=document.getElementById('animation');
  for(let layer=1;layer<=4;layer++){
    for(let i=0;i<50;i++){
      const drop=document.createElement('div'); drop.className=`drop layer${layer}`;
      drop.style.left=Math.random()*100+'vw'; drop.style.top=Math.random()*-100+'vh';
      drop.style.transform=`translateX(${Math.random()*20 -10}px)`;
      anim.appendChild(drop);
    }
  }
  rainAudio=document.getElementById('rainSound'); rainAudio.volume=0.2; rainAudio.play();
}

function createSnow(){
  const anim=document.getElementById('animation');
  for(let layer=1;layer<=4;layer++){
    for(let i=0;i<40;i++){
      const flake=document.createElement('div'); flake.className=`snow layer${layer}`;
      flake.style.left=Math.random()*100+'vw'; flake.style.top=Math.random()*-100+'vh';
      flake.style.transform=`translateX(${Math.random()*30 -15}px)`;
      anim.appendChild(flake);
    }
  }
}

function createStars(){
  const anim=document.getElementById('animation');
  for(let i=0;i<100;i++){
    const star=document.createElement('div'); star.className='stars';
    star.style.top=Math.random()*100+'vh';
    star.style.left=Math.random()*100+'vw';
    star.style.width=(Math.random()*2+1)+'px';
    star.style.height=(Math.random()*2+1)+'px';
    anim.appendChild(star);
  }
}

function createLightning(){
  const lightning=document.createElement('div'); lightning.className='lightning';
  document.getElementById('animation').appendChild(lightning);
  thunderAudio=document.getElementById('thunderSound'); thunderAudio.volume=0.1;
  lightningInterval=setInterval(()=>{
    lightning.classList.add('flash'); thunderAudio.play();
    setTimeout(()=>lightning.classList.remove('flash'),200);
  },1500+Math.random()*3000);
}

function createClouds(){
  const anim=document.getElementById('animation');
  for(let layer=1;layer<=4;layer++){
    const cloud=document.createElement('div'); cloud.className=`cloud layer${layer}`;
    cloud.style.top=(50 + layer*50)+'px';
    cloud.style.opacity=0.5 + Math.random()*0.5;
    anim.appendChild(cloud);
  }
}

function createSunMoon(localHour){
  const anim=document.getElementById('animation');
  if(localHour>=6 && localHour<=18){
    const sun=document.createElement('div'); sun.className='sun'; anim.appendChild(sun);
  } else{
    createStars();
    const moon=document.createElement('div'); moon.className='moon'; anim.appendChild(moon);
  }
}

function setAnimation(weather,dt,timezone){
  clearAnimation();
  const localHour=new Date((dt+timezone)*1000).getUTCHours();
  if(localHour<6||localHour>18){document.body.classList.add('night');}
  else if(localHour>=17 && localHour<=19){document.body.classList.add('sunset');}
  else{document.body.classList.add('day');}

  createSunMoon(localHour);

  if(weather.includes("hujan")||weather.includes("rain")){createRain(); if(weather.includes("deras")||weather.includes("heavy")) createLightning();}
  else if(weather.includes("awan")||weather.includes("cloud")){createClouds();}
  else if(weather.includes("salju")||weather.includes("snow")){createSnow();}
}

async function getWeather(){
  const city=document.getElementById('city').value.trim();
  if(!city)return alert("Masukkan kota!");
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;

  try{
    const response=await fetch(url);
    if(!response.ok)throw new Error("Kota tidak ditemukan atau API key salah");
    const data=await response.json();
    const weatherDesc=data.weather[0].description;
    const icon=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    setAnimation(weatherDesc,data.dt,data.timezone);

    document.getElementById('weather').innerHTML=`
      <h2>${data.name}, ${data.sys.country}</h2>
      <img class="weather-icon" src="${icon}" alt="icon cuaca">
      <p>${weatherDesc}</p>
      <p>🌡️ Suhu: ${data.main.temp}°C</p>
      <p>💧 Kelembaban: ${data.main.humidity}%</p>
      <p>💨 Angin: ${data.wind.speed} m/s</p>
      <p>🔆 Tekanan: ${data.main.pressure} hPa</p>
      <p>🌅 Sunrise: ${new Date((data.sys.sunrise+data.timezone)*1000).toUTCString()}</p>
      <p>🌇 Sunset: ${new Date((data.sys.sunset+data.timezone)*1000).toUTCString()}</p>
    `;
  }catch(err){
    document.getElementById('weather').innerHTML=`<p style="color:red">${err.message}</p>`;
    clearAnimation();
  }
}

document.getElementById('checkBtn').addEventListener('click',getWeather);
