"use strict";

//prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
let map, mapEvent;

class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();

    form.addEventListener("submit", function (e) {});
    inputType.addEventListener("change", function () {
      inputElevation.closest("form__row").classList.toggle("form__row--hidden");
      inputCadence.closest("form__row").classList.toggle("form__row--hidden");
    });
  }
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("could not fetch your location");
        }
      );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(position);
    console.log(latitude, longitude);
    const coords = [latitude, longitude];
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    this.#map = L.map("map").setView(coords, 13); //to zoom in and out change 13
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", function (mapE) {
      this.#mapEvent = mapE;
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  }
  _toggleElevationField() {}
  _newWorkout() {
    e.preventDefault();
    inputDuration.value =
      inputCadence.value =
      inputDistance.value =
      inputElevation.value =
        "";

    console.log(mapEvent);
    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 50,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("workout")
      .openPopup();
  }
}
const app = new App();
app._getPosition();
// console.log(firstName);
