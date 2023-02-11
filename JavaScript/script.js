import { asiaBtn, europeBtn, africaBtn, oceaniaBtn, americaBtn, countriesContainer } from './events.js'
import { createChart } from './chart.js'

export let continents = [];
export let countryCodes = []; // for [iso2[], iso3[]]
export let countryPopulation = [];
export let countries = [];
export let bigData = {};

function extractUniqueContinents(duplicatedContinents) {
    let newStr = duplicatedContinents.join(' ');
    newStr = newStr.split(' ');
    let uniqueContinents = [...new Set(newStr)];
    uniqueContinents = uniqueContinents.filter((el) => el !== 'North' && el !== 'South' && el !== 'Antarctica' && el !== 'America');
    uniqueContinents.push('Americas');
    continents.push(uniqueContinents);
}

function getContinentName(data) {
    let duplicatedContinents = [];
    data.forEach(obj => {
        duplicatedContinents.push(obj.continents);
    });
    extractUniqueContinents(duplicatedContinents);
}

// **API 1** Countries & Cities
// data.data code, country, iso3, populationCount {year: , value: }
async function getPopulationDataByCountry() {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/population');
        if (res.ok) {
            const data = await res.json();
            console.log('Data API 1 By country', data.data);
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

// **REST API** find By ISO CODE
export async function getAllDataByIsoCode(iso2, iso3) {
    try {
        console.log('iso2 and iso3', iso2, iso3);
        const res = await fetch(`https://restcountries.com/v2/alpha?codes=${iso2},${iso3}`);
        if (res.ok) {
            const data = await res.json();
            console.log('Data REST API by Iso Code', data);
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

function getCountryName(data) {
    data.forEach((obj) => {
        let continent = obj.continents[0];
        if (continent.includes('America')) {
            continent = 'Americas';
        } else {
            continent = obj.continents[0];
        }
        countries.push([obj.name.common, obj.cca3, continent]);
    })
    console.log('countries [Name, cca3, continent]', countries);
};


// **REST API** ALL
export async function getAllData() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (res.ok) {
            const data = await res.json();
            console.log('REST API getAllData', data);
            getContinentName(data);
            getCountryName(data);
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}


export function makeHtmlBtn() {
    asiaBtn.innerText = continents[0][1];
    europeBtn.innerText = continents[0][0];
    oceaniaBtn.innerText = continents[0][2];
    africaBtn.innerText = continents[0][3];
    americaBtn.innerText = continents[0][4];
}

function createCountryBtn(currentCountries) {
    countriesContainer.innerHTML = '';
    console.log('Create Country Btn', currentCountries);
    currentCountries.forEach((country) => {
        const str = `<button class="countriesBtn">${country}</button>`;
        countriesContainer.innerHTML += `${str}`;
    })

    createChart(currentCountries);
}

export function getCountries(id) {

    let currentCountries = [];
    bigData.countries.forEach((country) => {
        let str = country[2].toLowerCase();
        if (str.includes(id)) {
            currentCountries.push(country[0]);
        }
    })
    createCountryBtn(currentCountries)
}

// **API 1** GET countryPopulation[iso3, populationCounts[year, value]]
async function getAllCountriesAndRespectivePop() {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/population');
        if (res.ok) {
            const data = await res.json();
            console.log('RESPECTIVE Countries and population', data.data);
            for (let i = 0; i < data.data.length; i++) {
                countryPopulation.push([data.data[i].iso3, data.data[i].populationCounts]);
            }
            console.log('countryPopulation [iso3, populationCounts[year, value]]', countryPopulation);
        }

    } catch (err) {
        console.log('Error:', err);
    }
}

// **API 1** GET countryCodes[iso2, iso3]
export async function getAllCountriesIso() {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/iso');

        if (res.ok) {
            const data = await res.json();
            console.log('API 1 Countries and cities', data.data);
            for (let i = 0; i < data.data.length; i++) {
                countryCodes.push([data.data[i].Iso2, data.data[i].Iso3]);
            }
            console.log('countryCodes [iso2, iso3]', countryCodes);
        }
    } catch (err) {
        console.log('Error:', err);
    }
}

// code from Countries & Cities API to find continent in REST API


// getAllData().then(() => {
//     getAllCountriesIso().then(() => {
//         getAllDataByIsoCode(countryCodes[0][0], countryCodes[0][1]).then(() => {
//             bigData['continents'] = continents;
//             bigData['country codes'] = countryCodes;
//             bigData['country population'] = countryPopulation;
//             bigData['countries'] = countries;
//         }).then(makeHtmlBtn);
//     });
// });

getPopulationDataByCountry();
getAllCountriesAndRespectivePop();

console.log(bigData);