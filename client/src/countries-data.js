/* 
Responsible for loading in and storing all countries data from the API 
Seperating this code into this seperate file ensures we don't deem countriesData a global variable
*/

var countriesData = [];

// communicates to country api to retrieve all country data to display it on the page
export async function retrieveCountryData(){
    //const apiUrl = "https://restcountries.com/v3.1/all";
    
    try {
        const response = await fetch('http://localhost:5000/api/countries');
        if (!response) {
            throw new Error("Bad network response");
        }
        countriesData = await response.json();

        // Sort the list alphabetically so our dropdown can be populated in alphabetical order
        countriesData = countriesData.sort( (a,b) => {
            return a.name.localeCompare(b.name);
        });
    }catch(e){
        console.error('Error with fetch: ', e);
    }
        
}

export function getCountriesData() {
    return countriesData;
}

export function getCountryData(countryName){
    var countryData = [];
    countriesData.forEach(country => {
        if (countryName == country.name) {
            console.log(country);
            countryData = country;
        }
    });
    return countryData;
}