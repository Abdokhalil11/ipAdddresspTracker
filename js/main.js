const url =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_i483c92woi4XtEXxJulpfloQYR6xD&";

const confirmed = document.querySelector(".arrow");
const ipAddress = document.querySelector("input");
const statics = document.querySelector(".statics .container");
const error = document.querySelector(".error");
const userLocation = document.querySelector(".userLocation");

confirmed.onclick = async () => {
  const userIp = ipAddress.value;
  const regularIp = /\d+[.]\d+[.]\d+[.]\d+/gm;
  const assert = regularIp.test(userIp);
  if (assert) {
    const res = await fetch(url + `ipAddress=${userIp}`);
    const data = await res.json();
    getUserId(data.location.lat, data.location.lng);
    statics.innerHTML = `
                          <div> 
                            <p>ip address</p>
                            <h4>${data.ip}</h4>
                          </div>
                          <div> 
                            <p>location</p>
                            <h4>${data.location.country} , ${data.location.region}</h4>
                          </div>
                          <div>
                            <p>timeZone</p>
                            <h4>${data.location.timezone}</h4>
                          </div>
                          <div> 
                            <p>isp</p>
                            <h4>${data.isp}</h4>
                          </div>`;
  } else {
    error.innerHTML = `is not valid IP Address ${userIp}`;
  }
};

const getUserId = (lat, long) => {
  const mapRemove = document.querySelector("#map");
  mapRemove.remove();
  const el = document.createElement("div");
  el.id = "map";
  document.body.appendChild(el);
  let map = L.map("map").setView([lat, long], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  L.marker([lat, long]).addTo(map).bindPopup("Your are here").openPopup();
};

const getYoutLocation = () => {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    getUserId(latitude, longitude);
  });
};

userLocation.addEventListener("click", getYoutLocation);
