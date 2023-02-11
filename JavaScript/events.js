
import { getCountries } from './script.js'
import { resetChart } from './chart.js'

export const asiaBtn = document.querySelector('#asia');
export const europeBtn = document.querySelector('#europe');
export const oceaniaBtn = document.querySelector('#oceania');
export const africaBtn = document.querySelector('#africa');
export const americaBtn = document.querySelector('#americas');

export const countriesContainer = document.querySelector('#countriesContainer');

asiaBtn.addEventListener('click', (e)=>{
    resetChart();
    const id = e.target.id;
    getCountries(id);
});

europeBtn.addEventListener('click', (e)=>{
    resetChart();
    const id = e.target.id;
    getCountries(id);
});

oceaniaBtn.addEventListener('click', (e)=>{
    resetChart();
    const id = e.target.id;
    getCountries(id);
});

africaBtn.addEventListener('click', (e)=>{
    resetChart();
    const id = e.target.id;
    getCountries(id);
});

americaBtn.addEventListener('click', (e)=>{
    resetChart();
    const id = e.target.id;
    getCountries(id);
});