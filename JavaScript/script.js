import { asiaBtn, europeBtn, africaBtn, oceaniaBtn, americaBtn, countriesContainer } from './events.js'

let continents = [];

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
            console.log('Data API 1', data.data);
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

// REST API CODE
async function getAllDataByCode(code) {
    try {
        const res = await fetch(`https://restcountries.com/v2/alpha/${code}`);
        if (res.ok) {
            const data = await res.json();
            console.log('Data API 2', data);
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

// REST API ALL
async function getAllData() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (res.ok) {
            const data = await res.json();
            console.log('REST API 2', data);

            getContinentName(data);
            // getCountryName();
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
    //deleting previous html 
    countriesContainer.innerHTML = '';
    console.log('DATA 4:', data);
    for (let i = 0; i < data.length; i++) {
        const str = `<button class="countriesBtn">${data[i].name}</button>`;
        countriesContainer.innerHTML += `${str}`;
    }
}

export function getCountries(id) {
    console.log('continent is:', id);
    getCountryByRegion(id)
    .then((data) => {
        console.log('on the making');
        createCountryBtn(data);
    })
}

// code from Countries & Cities API to find continent in REST API
let code = 'NGA';

getAllData().then(makeHtmlBtn);
getPopulationDataByCountry();
getAllDataByCode(code);
