// Function for Map and Autocomplete
function initMap() {
  // Autocomplete
  const input = document.getElementById('autocomplete');
  const autocomplete = new google.maps.places.Autocomplete(input);

  // Map Option
  const options = {
    zoom: 10,
    center: { lat: 6.605874, lng: 3.349149 },
    // lat:6.5244,lng:-3.3792
  }

  // New Map
  const map = new
  google.maps.Map(document.getElementById('map'), options);

  // Add Marker
  const marker = new google.maps.Marker({
    position: { lat: 6.605874, lng: 3.349149 },
    map: map,

  })

}
