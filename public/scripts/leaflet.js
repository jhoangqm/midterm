$(function () {
  // calling map function
  window.map = implementMap();

  //sidebar maps
  $("#calgary").on("click", function (event) {
    map.flyTo([51.0486, -114.0708], 12);
  });
  $("#montreal").on("click", function (event) {
    map.flyTo([45.5017, -73.5673], 12);
  });
  $("#toronto").on("click", function (event) {
    map.flyTo([43.6501, -79.38], 12);
  });
  $("#ottawa").on("click", function (event) {
    map.flyTo([45.4215, -75.6972], 12);
  });
  $("#vancouver").on("click", function (event) {
    map.flyTo([49.2827, -123.1207], 12);
  });

  createPins();
});

// generates pins on click

const createPins = () => {
  let markArr = [];
  window.map.on("click", (event) => {
    let marker = new L.marker([event.latlng.lat, event.latlng.lng]);
    window.map.addLayer(marker);
    markArr.push(marker);
    marker.bindPopup(renderPins()).openPopup();
    $("label.pinlat").show().text(`latitude: ${event.latlng.lat}`);
    $("label.pinlng").show().text(`longitude: ${event.latlng.lng}`);
    $("input.pinlat").val(event.latlng.lat);
    $("input.pinlng").val(event.latlng.lng);

    marker.getPopup().on("remove", function () {
      window.map.removeLayer(marker);
    });

    $(".pin-form").on("submit", function (e) {
      e.preventDefault();

      let content = $(this).serialize();
      console.log(content);

      return $.post(`/api/pins/`, content, (data) => {
        console.log(data);
        window.markers.push(marker);
        marker.closePopup();
        marker.unbindPopup();
        marker.bindPopup(data.content);
        console.log(data.content);
      });
    });
  });

  // var popup = L.popup();

  // function onMapClick(e) {
  //   popup
  //     .setLatLng(e.latlng)
  //     .setContent("You saved this location", e.latlng)
  //     .openOn(map);
  // }

  // map.on("click", onMapClick);
};

//Pin form that can be called when rendering a marker
const renderPins = () => {
  const $pinForm = `
  <div class="pin-form-container">
  <form class="pin-form">
    <label for="title"> Pin Name:</label><br>
    <input type="text" name="title" id="name" placeholder="New Pin"/><br>
    <input type="textarea" name="description" placeholder="description"/><br>
    <input type="text" name="image_url" id="image" placeholder="image url" /><br>
    <label for="latitude" class="pinlat" hidden></label><br>
    <input type="text" class="pinlat" name="latitude" hidden />
    <label for="longitude" class="pinlng" hidden></label><br>
    <input type="text" class="pinlng" name="longitude" hidden/>
    <button class="submit" type="submit">submit</button>
  </form>
</div>
    `;
  return $pinForm;
};

// Function that generates a map
const implementMap = () => {
  // generates a map
  const map = L.map("map").setView([43.6478463, -79.3807361], 12);

  // tile layer retrieved from OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  return map;
};
