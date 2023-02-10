let bigData = {
    continents: [],
    countries: [],
};

function extractUniqueContinents(duplicatedContinents) {
    let newStr = duplicatedContinents.join(' ');
    newStr = newStr.split(' ');
    let uniqueContinents = [...new Set(newStr)];
    uniqueContinents = uniqueContinents.filter((el) => el !== 'North' && el !== 'South' && el !== 'Antarctica');
    bigData.continents.push(uniqueContinents);
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
async function getAllData2() {
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

            // getContinentName(data);
            // getCountryName();
            // getCitiesName();
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

// code from Countries & Cities API to find continent in REST API
let code = 'NGA';
getAllData();
getAllData2();
getAllDataByCode(code);