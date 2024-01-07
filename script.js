
const chave = "at_7izDykbgYlkfuyDSITv6Ic3aBQAwe";
const enderecoIp = document.getElementById("enderecoIp");
const localizacaoIp = document.getElementById("localizacaoIp");
const horarioIp = document.getElementById("horarioIp");
const ips = document.getElementById("isp");
const pesquisaIp = document.getElementById("buscarIp");

var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS popup.<br> Easily customizable.")
  .openPopup();

async function buscarIp() {
  
  try {
    const vericaIp = validateIPaddress(pesquisaIp.value);
    if (!vericaIp) return alert("Ip invalido");
    const ip1 = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${chave}&ipAddress=${pesquisaIp.value}`
    );

    const api2 = await ip1.json();
    enderecoIp.innerText = api2.ip;
    localizacaoIp.innerText = api2.location.region;
    horarioIp.innerText = api2.location.timezone;
    ips.innerText = api2.isp;
    map.setView([api2.location.lat, api2.location.lng]);
    L.marker([api2.location.lat, api2.location.lng])
      .addTo(map)
      .bindPopup(api2.location.region)
      .openPopup();
  } catch (error) {
    console.log(error);
  }
}

function validateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
}
