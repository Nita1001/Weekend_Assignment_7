import { asiaBtn, europeBtn, africaBtn, oceaniaBtn, americaBtn, countriesContainer } from './events.js'

let continents = [];
let countryCodes = [];
let countryPopulation = [];
let countries = [];
let bigData = {}


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

// Countries & Cities
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

// REST API CODE
async function getAllDataByIsoCode(iso2, iso3) {
    try {
        const res = await fetch(`https://restcountries.com/v2/alpha?codes=${iso2},${iso3}`);
        if (res.ok) {
            const data = await res.json();
            console.log('Data REST API 2 by Code', data);
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

function getCountryName(data){
    data.forEach((obj)=>{
        countries.push([obj.name.common, obj.cca3, obj.continents[0]
        ]);
    })
    console.log('countries!!!!! and cca3 and continent',countries);
};


// REST API ALL
async function getAllData() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (res.ok) {
            const data = await res.json();
            console.log('REST API 2', data);

            getContinentName(data);
            getCountryName(data);
            // getCitiesName();
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

async function getCountryByRegion(region) {
    try {
        const res = await fetch(`https://restcountries.com/v2/region/${region}`);
        if (res.ok) {
            const data = await res.json();
            console.log('REST API 3', data);
            return data;
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

function makeHtmlBtn() {
    asiaBtn.innerText = continents[0][1];
    europeBtn.innerText = continents[0][0];
    oceaniaBtn.innerText = continents[0][2];
    africaBtn.innerText = continents[0][3];
    americaBtn.innerText = continents[0][4];
}

function createCountryBtn(data) {
    countriesContainer.innerHTML = '';
    console.log('DATA 4:', data);
    for (let i = 0; i < data.length; i++) {

        const str = `<button class="countriesBtn">${data[i].name}</button>`;
        countriesContainer.innerHTML += `${str}`;

    }
}

export function getCountries(id) {
    getCountryByRegion(id)
        .then((data) => {
            createCountryBtn(data);
        })
}
// API 1
async function getAllCountriesAndRespectivePop() {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/population');
        if (res.ok) {
            const data = await res.json();
            console.log('RESPECTIVE Countries and cities', data.data);
            for (let i = 0; i < data.data.length; i++) {
                countryPopulation.push([data.data[i].iso3, data.data[i].populationCounts]);
            }
            console.log('population', countryPopulation);
        }

    } catch (err) {
        console.log('Error:', err);
    }
}

//API 1
async function getAllCountriesIso() {
    try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/iso');

        if (res.ok) {
            const data = await res.json();
            console.log('API 1 Countries and cities', data.data);
            for (let i = 0; i < data.data.length; i++) {
                countryCodes.push([data.data[i].Iso2, data.data[i].Iso3]);
            }
            console.log(countryCodes);
        }

    } catch (err) {
        console.log('Error:', err);
    }
}

// code from Countries & Cities API to find continent in REST API


getAllData().then(makeHtmlBtn);
getPopulationDataByCountry();
getAllCountriesAndRespectivePop();

getAllCountriesIso().then(() => {
    getAllDataByIsoCode(countryCodes[0][1], countryCodes[0][0]).then(() => {
        bigData['continents'] = continents;
        bigData['country codes'] = countryCodes;
        bigData['country population'] = countryPopulation;

    });
});
console.log(bigData);