function getResults(event) {
  event.preventDefault();
  errorMessage.innerHTML = "";
  fetch(
    `https://app.climate.azavea.com/api/city?search=${search.value}`,
    { headers: { 'Authorization': 'Token 899d2e3421fafb2c8a772e1fde232b6b52ae9dfa' } }
  )
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    console.log(data)
    if (data.features.length === 0) errorMessage.innerHTML = "City not found";
    const id = data.features[0].id;
    fetch(
      `https://app.climate.azavea.com/api/climate-data/${id}/RCP85/indicator/average_high_temperature`,
      { headers: { 'Authorization': 'Token 899d2e3421fafb2c8a772e1fde232b6b52ae9dfa' } }
    )
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      city.innerHTML = data.city.properties.name;
      maxTemp2019.innerHTML = data.data[2019].max.toFixed(2) + " F";
      maxTemp2060.innerHTML = data.data[2060].max.toFixed(2) + " F";
    })
  })
}
