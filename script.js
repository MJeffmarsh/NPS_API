"use strict";

const apiKey= "lCjE9gJXRBsg5E9L5lE1rjNBqXK8KxWHBPlFmRyP";
const searchURL ="https://api.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

  function displayResults(responseJson, maxResults) {
    console.log(responseJson);

    $("#results-list").empty();
    for (let i = 0; i < responseJson.data.length; i++) {
      $('#results-list').append(
        `<div class="park">
        <li><span>Name:</span> ${responseJson.data[i].fullName}</li>
         <li><span>Description:</span> ${responseJson.data[i].description}</li>
         <li><span>Coordinates:</span> ${responseJson.data[i].latLong}</li>
         <li><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>
         </div>`
      )};
      $('#results').removeClass('hidden');
  }

  function findParks(query, limit = 10) {

    const params = {
    stateCode: query,
    limit,
    api_key: apiKey
    };

    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;

    console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err);
      alert("Something went wrong :(");
    });
  }


  function formSubmit() {
    $('form').submit(event => { event.preventDefault();
    let stateSearch = $("#state-input").val();
    let maxResults = $("#max-results").val();
    findParks(stateSearch, maxResults)
    });
  }

  $(formSubmit);