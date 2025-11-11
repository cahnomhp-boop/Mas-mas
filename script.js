const apiKey = "YOUR_API_KEY"; // Ganti dengan API key OpenWeatherMap kamu

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const card = document.getElementById("weatherCard");
  const icon = document.getElementById("weatherIcon");
  const cityName = document.getElementById("cityName");
  const desc = document.getElementById("description");
  const temp = document.getElementById("temperature");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");

  if (!city) {
    alert("Masukkan nama kota dulu ya 🌆");
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
      alert("❌ Kota tidak ditemukan, coba lagi.");
      return;
    }

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    desc.textContent = data.weather[0].description;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    wind.textContent = `💨 Angin: ${data.wind.speed} m/s`;
    humidity.textContent = `💧 Kelembapan: ${data.main.humidity}%`;

    icon.src = iconUrl;
    icon.style.display = "block";
    card.style.display = "block";

  } catch (err) {
    alert("Terjadi kesalahan saat mengambil data cuaca ☁️");
  }
}
