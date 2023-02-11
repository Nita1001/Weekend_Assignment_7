
import { getCountries } from './script.js'
import { resetChart } from './chart.js'

export const asiaBtn = document.querySelector('#asia');
export const europeBtn = document.querySelector('#europe');
export const oceaniaBtn = document.querySelector('#oceania');
export const africaBtn = document.querySelector('#africa');
export const americaBtn = document.querySelector('#americas');

export const countriesContainer = document.querySelector('#countriesContainer');


function handleContinentEvent(e){
    resetChart();
    const id = e.target.id;
    getCountries(id);
}

asiaBtn.addEventListener('click', handleContinentEvent);
europeBtn.addEventListener('click',handleContinentEvent);
oceaniaBtn.addEventListener('click',handleContinentEvent);
africaBtn.addEventListener('click',handleContinentEvent);
americaBtn.addEventListener('click',handleContinentEvent);