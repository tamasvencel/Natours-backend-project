/* eslint-disable */ /*because it is configured for node.js */

export const displayMap = (locations) => {
  var map = L.map("map", {
    scrollWheelZoom: false,
    zoomSnap: 0.25,
    zoomControl: false,
  }).setView([35.111745, -120.113491], 4.75);

  var customZoomControl = L.control
    .zoom({
      position: "topright",
    })
    .addTo(map);

  // Modify the size of the zoom control buttons
  var zoomInButton = customZoomControl._zoomInButton;
  var zoomOutButton = customZoomControl._zoomOutButton;

  // Change the width and height of the buttons
  zoomInButton.style.width = "40px"; // Adjust the width as needed
  zoomInButton.style.height = "30px"; // Adjust the height as needed

  zoomOutButton.style.width = "40px"; // Adjust the width as needed
  zoomOutButton.style.height = "30px"; // Adjust the height as needed

  L.tileLayer(
    "https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=3678afbce85344c89a4b5070dcaf91d7",
    {
      attribution:
        '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      apikey: "3678afbce85344c89a4b5070dcaf91d7",
      maxZoom: 15,
    }
  ).addTo(map);

  const bounds = new L.LatLngBounds();

  locations.forEach((loc) => {
    // Create marker icon
    const markerIcon = L.divIcon({
      className: "marker",
      iconAnchor: [0, 45], // Adjust the anchor point to align with the bottom
      iconSize: [32, 40],
    });

    const [lng, lat] = loc.coordinates;

    // Create marker and add it to the map
    const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);

    // Create a popup with custom options
    var popup = L.popup({ offset: [16.5, -31] })
      .setLatLng([loc.coordinates[1], loc.coordinates[0]])
      .setContent(
        `<p style="font-size: 14px;">Day ${loc.day}: ${loc.description}</p>`
      );

    // Add the popup to the Leaflet map
    popup.addTo(map);

    // Extend map bounds to include the current location
    bounds.extend([lat, lng]);
  });

  var paddingOptions = {
    paddingTopLeft: [100, 200],
    paddingBottomRight: [100, 200],
  };

  map.fitBounds(bounds, paddingOptions);
};
