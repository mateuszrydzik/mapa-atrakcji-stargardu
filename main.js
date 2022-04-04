//import warstw wektorowych z pliku layers.js
import {hotele, gastronomia, parki, ulubione, tourism, rozrywki} from "./layers.js"

let map = L.map('map').setView([53.33, 15.04], 13);

//basemap jasny
const lightMapbox = L.tileLayer('https://api.mapbox.com/styles/v1/panmisterek/cl19cwypk00fu15pbrkcq7z58/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGFubWlzdGVyZWsiLCJhIjoiY2wxMHNkdXI3MDRpaTNkcW5yaXVjdjExNyJ9.S-8TFOSeSs_LcfW9Zicm1g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicGFubWlzdGVyZWsiLCJhIjoiY2wxMHNkdXI3MDRpaTNkcW5yaXVjdjExNyJ9.S-8TFOSeSs_LcfW9Zicm1g'
});
//basemap ciemny
const darkMapbox = L.tileLayer('https://api.mapbox.com/styles/v1/panmisterek/cl19eduhp002a14pkaaijaz92/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGFubWlzdGVyZWsiLCJhIjoiY2wxMHNkdXI3MDRpaTNkcW5yaXVjdjExNyJ9.S-8TFOSeSs_LcfW9Zicm1g', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoicGFubWlzdGVyZWsiLCJhIjoiY2wxMHNkdXI3MDRpaTNkcW5yaXVjdjExNyJ9.S-8TFOSeSs_LcfW9Zicm1g'
});

//domyślną basemapą jest jasna
lightMapbox.addTo(map)

//import warstw wektorowych
// import parki from "./data/parki.geojson" assert { type: "json" }
// import hotele from "./data/hotele.geojson" assert { type: "json" }
// import rozrywki from "./data/rozrywki.geojson" assert { type: "json" }
// import gastronomia from "./data/gastronomia.geojson" assert { type: "json" }
// import tourism from "./data/tourism.geojson" assert { type: "json" }
// import ulubione from "./data/ulubione.geojson" assert { type : "json" }


//zmienne z ikonami markerów
const iconHotel = L.icon({
  iconUrl: "./img/bed_c.png",
  iconSize: [25, 25]
})

const iconEnt = L.icon({
  iconUrl: "./img/entertainment_c.png",
  iconSize: [25, 25]
})

const iconFood = L.icon({
  iconUrl: "./img/restaurant_c.png",
  iconSize: [25, 25]
})

const iconTourism = L.icon({
  iconUrl: "./img/obelisk_c.png",
  iconSize: [25, 25]
})

const iconUlubione = L.icon({
  iconUrl: "./img/heart_c.png",
  iconSize: [25, 25]
})



//zmienne odnoszące się do elementów HTML
//w tym przypadku przycisków na stronie

//przyciski dodawania warstw
let hotelButton = document.getElementById("hotelButton")
let rozrywkiButton = document.getElementById("rozrywkiButton")
let parkiButton = document.getElementById("parkiButton")
let gastroButton = document.getElementById("gastroButton")
let tourismButton = document.getElementById("tourismButton")

//przyciski zmian stylu
let lightButton = document.getElementById("lightButton")
let darkButton = document.getElementById("darkButton")


//zmienne z warstwami wektorowymi
const hotelLayer = L.geoJSON(hotele, {
  pointToLayer: function (feature, latlng) {
      return L.marker(latlng, 
        {icon: iconHotel});
    },
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<h5>'+feature.properties.name+'</h5>'
  );
}});

const rozrywkiLayer = L.geoJSON(rozrywki, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: iconEnt});
    },
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h5>'+feature.properties.nazwa+'</h5>'+feature.properties.rozrywka
    );
}});

const parkiLayer = L.geoJSON(parki, {
  color: 'green',
  fillOpacity: 0.2,
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h5>'+feature.properties.name+'</h5>'
    );
}});

const gastroLayer = L.geoJSON(gastronomia, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: iconFood});
    },
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<h5>'+feature.properties.name+'</h5>'
  );
}});

const tourismLayer = L.geoJSON(tourism, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: iconTourism});
    },
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<h5>'+feature.properties.name+'</h5>'+feature.properties.tourism
  );
}});

const ulubioneLayer = L.geoJSON(ulubione, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: iconUlubione});
    },
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<h5>'+feature.properties.nazwa+'</h5>'+feature.properties.opis
  );
}});

//domyślną warstwą jest warstwa z obiektami turystycznymi
tourismLayer.addTo(map)
tourismButton.style.filter = null;
//eventy do zmiany widoczności warstw
function addLayers(layer){
  switch(layer){
    case "Hotel":{
      if (map.hasLayer(hotelLayer)){
        map.removeLayer(hotelLayer);
        hotelButton.style.filter = "brightness(20%)";
      } else {
        hotelLayer.addTo(map);
        hotelButton.style.filter =  null;
    }
    break;
  } case "Rozrywki":{
      if (map.hasLayer(rozrywkiLayer)){
        map.removeLayer(rozrywkiLayer);
        rozrywkiButton.style.filter = "brightness(20%)";
      } else {
        rozrywkiLayer.addTo(map);
        rozrywkiButton.style.filter = null;
      }
    break;
  } case "Gastro":{
      if (map.hasLayer(gastroLayer)){
        map.removeLayer(gastroLayer)
        gastroButton.style.filter = "brightness(20%)";
      } else {
        gastroLayer.addTo(map);
        gastroButton.style.filter = null;
      }
    break;
  } case "Tourism":{
      if (map.hasLayer(tourismLayer)){
        map.removeLayer(tourismLayer);
        tourismButton.style.filter = "brightness(20%)";
      } else {
        tourismLayer.addTo(map);
        tourismButton.style.filter = null;
      }
    break;
  } case "Parki":{
      if (map.hasLayer(parkiLayer)){
        map.removeLayer(parkiLayer);
        parkiButton.style.filter = "brightness(20%)";
      } else {
        parkiLayer.addTo(map);
        parkiButton.style.filter = null;
    }
    break;
  } case "Ulubione":
      if (map.hasLayer(ulubioneLayer)) {
        map.removeLayer(ulubioneLayer);
      } else {
        ulubioneLayer.addTo(map);
    }
    break
}}

hotelButton.addEventListener("click", () => addLayers("Hotel"));
rozrywkiButton.addEventListener("click", () => addLayers("Rozrywki"));
gastroButton.addEventListener("click", () => addLayers("Gastro"));
tourismButton.addEventListener("click", () => addLayers("Tourism"));
parkiButton.addEventListener("click", () => addLayers("Parki"));
ulubioneButton.addEventListener("click", () => addLayers("Ulubione"))

//eventy do zmian stylu
function toggleDarkMode(mode){
  switch(mode){
    case "Dark":
      if (map.hasLayer(darkMapbox)){
        //pass
      } else {
          if (map.hasLayer(lightMapbox)) {
            map.removeLayer(lightMapbox);
          }
          $('.navbar').removeClass('navbar navbar-expand-lg navbar-light bg-light').addClass('navbar navbar-expand-lg navbar-dark bg-dark');
          //$('img').each((index, img) => img.style.filter = "invert(1)");
          darkMapbox.addTo(map)
      }
      break;
    case "Light":
      if (map.hasLayer(lightMapbox)){
        //pass
      } else{
        if (map.hasLayer(darkMapbox)) {
          map.removeLayer(darkMapbox);
        }
        $('.navbar').removeClass('navbar navbar-expand-lg navbar-dark bg-dark').addClass('navbar navbar-expand-lg navbar-light bg-light');
        //$('img').each((index, img) => img.style.filter = "invert(0)");
        lightMapbox.addTo(map);
    }
      break;
  }
}

darkButton.addEventListener("click", () => toggleDarkMode("Dark")); 
lightButton.addEventListener("click", () => toggleDarkMode("Light"));
