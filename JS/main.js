var map = L.map('map').setView([23.8103, 90.4125], 13);
const tileLayer = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = {  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'};
const firstTile = L.tileLayer(tileLayer,attribution);
firstTile.addTo(map);
let marker;


const apiUrl = "https://geo.ipify.org/api/v2/country,city?apiKey=at_ClkEJl1NydFg80UZC43leGQJNxTj2&ipAddress=";




async function ipTracker(ip) {
    let response = await fetch(`${apiUrl}${ip}`);
    if(!response.ok){
        document.querySelector('.error-msg').style.display="block";
    }else{
        document.querySelector('.error-msg').style.display="none";
        let data =await response.json();
        console.log(data);
        document.querySelector('.ip-address').textContent=`${data.ip}`;
        document.querySelector('.location').textContent=`${data.location.city},${data.location.region},${data.location.country}`;
        document.querySelector('.time-zone').textContent=`${data.location.timezone}`;
        document.querySelector('.isp').textContent=`${data.isp}`;

        let lat = data.location.lat;
        let lng = data.location.lng;

        marker = L.marker([lat,lng]);
        marker.addTo(map);
        map.flyTo([lat,lng],13);

        marker.addEventListener("click", () => {
            marker.bindPopup(`${data.location.city}, ${data.location.region}, ${data.location.country}`).openPopup();
        });
        
    }
}


// Receive Input
let searchBtn=document.querySelector(".search-btn");
searchBtn.addEventListener("click",()=>{
    let input=document.querySelector('.input');
    let ip=input.value.trim();
    ipTracker(ip);
});