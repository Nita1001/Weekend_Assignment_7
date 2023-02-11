
import { bigData, getAllData, continents, countryCodes, countryPopulation, countries, getAllCountriesIso, getAllDataByIsoCode, makeHtmlBtn } from './script.js'
const ctx = document.getElementById('myChart');
let myChart;

getAllData().then(() => {
  getAllCountriesIso().then(() => {
          bigData['continents'] = continents;
          bigData['country codes'] = countryCodes;
          bigData['country population'] = countryPopulation;
          bigData['countries'] = countries;
      }).then(makeHtmlBtn);
});

export function createChart(current){
  

  let labels = [];
  current.forEach((country) => {
    labels.push(country);
  })

   myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Population',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



export function resetChart(){
  if(myChart){
    myChart.destroy();
  }
} 

