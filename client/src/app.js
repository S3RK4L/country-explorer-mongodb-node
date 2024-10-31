import { retrieveCountryData, getCountriesData, getCountryData } from "./countries-data.js";

// Function we can use for debugging and looking inside contents of json
function displayJSONData(data){
    document.getElementById('apiOutput').textContent = JSON.stringify(data, null, 2);
}

//populate countries dropdown list
function populateCountriesDropdown(){
    const select = document.getElementById('countriesDropDown');

    getCountriesData().forEach(country => {
        const opt = document.createElement('option');
        opt.value = country.name;
        opt.innerHTML = country.name;
        select.appendChild(opt);
    }); 

    select.addEventListener('change', function() {
        handleCountrySelection(select.value);
    });
}

function handleCountrySelection(countryName){
    clearResults();
    if (countryName == "All") {
        displayAllCountriesPretty();
    }else {
        displayCountryPretty(getCountryData(countryName));
    }
}

function createCountryInfoContainer(countryData) 
{
    var currencies = "";
    if (countryData.currencies){
        currencies = countryData.currencies[Object.keys(countryData.currencies)[0]].name
    }else{
        currencies = "none found";
    }

    var languages = "";
    if (countryData.languages){
        languages = Object.entries(countryData.languages).map(([key, value]) => `${value} (${key})`).join(', ');
    }else{
        languages = "none found";
    }

    return `
      <div class="country-info-container">
        <h3 class="country-name">${countryData.name}</h3>
        <img class="country-flag" src=${countryData.flag}><img>
        <div class="country-info">
            <div><strong>Currencies:</strong> ${currencies}</div>
            <div><strong>Region:</strong> ${countryData.region}</div>
            <div><strong>Capital city:</strong>${countryData.capital}</div>
            <div><strong>Population:</strong> ${countryData.population}</div>
            <div><strong>Languages:</strong> ${languages}</div>
        </div>
    </div>
    `;
  }

function displayAllCountriesPretty(){
    const content = document.getElementById('content');
    getCountriesData().forEach(countryData => {
        content.innerHTML += createCountryInfoContainer(countryData);
    });
}

function displayCountryPretty(countryData){
    const content = document.getElementById('content');
    content.innerHTML = createCountryInfoContainer(countryData);
}

function clearResults(){
    const content = document.getElementById('content');
    content.innerHTML = "";
}

// Run this function when the page loads to fetch and display the country data
document.addEventListener('DOMContentLoaded', function() {
    retrieveCountryData().then(() => {
        //displayJSONData(getCountriesData());
        populateCountriesDropdown();
        displayAllCountriesPretty();
    });
});