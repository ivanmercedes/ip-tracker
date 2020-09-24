"use strict";
function setMap(lat, lon) {

        var mymap = L.map('mapid').setView([lat, lon], 15);
        mymap.off();
 
        
        var myIcon = L.icon({
            iconUrl: 'images/mark.png',
            iconSize: [36, 46],
        });

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 50,
          minZoom: 15,
          attribution: 'by Ivan Mercedes',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1
        }).addTo(mymap), L.marker([lat, lon], {icon: myIcon}).addTo(mymap) ;
    }

   function Init() {
    const find = document.getElementById('findIp');
    
    const url = `https://json.geoiplookup.io/${ find.value !==''? find.value: ''}`;
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      const {ip, timezone_name, country_name, country_code, postal_code, isp, latitude, longitude} = data;
      document.getElementById('ip').innerText = ip;
      document.getElementById('location').innerText =`${country_name}, ${country_code} ${postal_code}`;
      document.getElementById('timezone_name').innerText = timezone_name;
      document.getElementById('isp').innerText = decodeURIComponent(escape(isp));
      setMap(latitude, longitude);
    });
  }

   window.addEventListener("DOMContentLoaded", Init);
   document.getElementById('find').addEventListener('click', e=>{
    var container = L.DomUtil.get('mapid');
if(container != null){
container._leaflet_id = null;
}
      Init();
   });