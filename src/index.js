import "./styles.css";
const weatherApi = 'VMCWGLTGX5BDK6GZP5M6RSJJE';

    async function getWeather(event) {
      document.querySelectorAll(".card").forEach(card => card.remove());
      event.preventDefault(); // 

      const location = document.getElementById("location").value.trim();
      const forecast = document.querySelector(".forecast");
      

      const today = new Date();
      const date1 = today.toISOString().split("T")[0];

      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 7);
      const date2 = futureDate.toISOString().split("T")[0];
      
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=${weatherApi}&unitGroup=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        data.days.slice(0, 7).forEach(day => {
        // Remove any previously added forecast cards
         const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${day.icon}.png`;

        const card=document.createElement("div");
        card.innerHTML = `
        <div class="day">
            <h3><strong>${formatDate(day.datetime)}</strong></h3>
             <img src="${iconUrl}" alt="${day.icon}" width="60" height="60">
            <p>Temp: ${day.temp}°C</p>
            <p>Humidity: ${day.humidity}°C</p>
            <p>Conditions: ${day.conditions}</p>
        </div>
        <hr/>
        `;
        card.classList.add("card");
        forecast.appendChild(card);
        });
      } catch (err) {
        console.error(err);
        forecast.innerHTML = `<p>Error fetching weather data.</p>`;
      }
    }
    document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", getWeather);
  
});
function formatDate(isoDate) {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
}
