const token = "pk.eyJ1IjoicGFubWlzdGVyZWsiLCJhIjoiY2wxMHNkdXI3MDRpaTNkcW5yaXVjdjExNyJ9.S-8TFOSeSs_LcfW9Zicm1g"
let map = L.map('map').setView([53.33, 15.04], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(map);  

import parki from "./data/parki.geojson" assert { type: "json" }
import hotele from "./data/hotele.geojson" assert { type: "json" }
import rozrywki from "./data/rozrywki.geojson" assert { type: "json" }
import szlakiTurystyczne from "./data/szlaki_turystyczne.geojson" assert { type: "json" }
import gastronomia from "./data/gastronomia.geojson" assert { type: "json" }
import tourism from "./data/tourism.geojson" assert { type: "json" }


const iconHotel = L.icon({
  iconUrl: "./img/bed.png",
  iconSize: [25, 25]
})

const iconEnt = L.icon({
  iconUrl: "./img/entertainment.png",
  iconSize: [25, 25]
})

const iconFood = L.icon({
  iconUrl: "./img/restaurant.png",
  iconSize: [25, 25]
})

const iconTourism = L.icon({
  iconUrl: "./img/obelisk.png",
  iconSize: [25, 25]
})

let hotelButton = document.getElementById("hotelButton")
let rozrywkiButton = document.getElementById("rozrywkiButton")
let parkiButton = document.getElementById("parkiButton")
let szlakiButton = document.getElementById("szlakiButton")
let gastroButton = document.getElementById("gastroButton")
let tourismButton = document.getElementById("tourismButton")

const hotelLayer = L.geoJSON(hotele, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: iconHotel});
    },
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<b>'+feature.properties.name+'</b>'
  );
}});

const rozrywkiLayer = L.geoJSON(rozrywki, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: iconEnt});
    },
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<b>'+feature.properties.nazwa+'</b>'
    );
}});

const parkiLayer = L.geoJSON(parki, {
  color: 'green',
  fillOpacity: 0.2,
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<b>'+feature.properties.name+'</b>'
    );
}});

const szlakiLayer = L.geoJSON(szlakiTurystyczne, {
  color: 'red',
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<b>'+feature.properties.name+'</b>'
    );
}});

const gastroLayer = L.geoJSON(gastronomia, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: iconFood});
    },
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<b>'+feature.properties.name+'</b>'
  );
}});

const tourismLayer = L.geoJSON(tourism, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: iconTourism});
    },
  onEachFeature: function (feature, layer) {
  layer.bindPopup('<b>'+feature.properties.name+'</b>'
  );
}});

tourismLayer.addTo(map)

hotelButton.addEventListener("click", function(){
  if (map.hasLayer(hotelLayer)){
    map.removeLayer(hotelLayer)
  } else {
    hotelLayer.addTo(map);
}})

rozrywkiButton.addEventListener("click", function(){
  if (map.hasLayer(rozrywkiLayer)){
    map.removeLayer(rozrywkiLayer)
  } else {
    rozrywkiLayer.addTo(map);
}})

gastroButton.addEventListener("click", function(){
  if (map.hasLayer(gastroLayer)){
    map.removeLayer(gastroLayer)
  } else {
    gastroLayer.addTo(map);
}})

tourismButton.addEventListener("click", function(){
  if (map.hasLayer(tourismLayer)){
    map.removeLayer(tourismLayer)
  } else {
    tourismLayer.addTo(map);
}})

parkiButton.addEventListener("click", function(){
  if (map.hasLayer(parkiLayer)){
    map.removeLayer(parkiLayer)
  } else {
    parkiLayer.addTo(map);
}})

szlakiButton.addEventListener("click", function(){
  if (map.hasLayer(szlakiLayer)){
    map.removeLayer(szlakiLayer)
  } else {
    szlakiLayer.addTo(map);
}})