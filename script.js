// GANTI DENGAN API KEY KAMU DARI https://openweathermap.org/
const apiKey = "0de15874ccf6e0d3c7cf7e39e51f7c7a"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Masukkan nama kota dulu ya!");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      alert("Kota tidak ditemukan, coba lagi!");
      return;
    }

    document.getElementById("weatherResult").classList.remove("hidden");
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weatherIcon").src = iconUrl;

    // Ganti background sesuai cuaca
    const weatherMain = data.weather[0].main.toLowerCase();
    document.body.className = ""; // reset background

    if (weatherMain.includes("clear")) document.body.classList.add("sunny");
    else if (weatherMain.includes("cloud")) document.body.classList.add("cloudy");
    else if (weatherMain.includes("rain")) document.body.classList.add("rainy");
    else if (weatherMain.includes("storm")) document.body.classList.add("stormy");
    else if (weatherMain.includes("snow")) document.body.classList.add("snowy");
    else document.body.classList.add("cloudy");

  } catch (error) {
    alert("Terjadi kesalahan dalam mengambil data cuaca!");
    console.error(error);
  }
}
