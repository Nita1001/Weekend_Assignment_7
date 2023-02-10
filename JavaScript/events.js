
import {getCountries} from './script.js'

export const asiaBtn = document.querySelector('#asia');
export const europeBtn = document.querySelector('#europe');
export const oceaniaBtn = document.querySelector('#oceania');
export const africaBtn = document.querySelector('#africa');
export const americaBtn = document.querySelector('#america');

export const countriesContainer = document.querySelector('#countriesContainer');

asiaBtn.addEventListener('click', (e)=>{
    const id = e.target.id;
    console.log('clicked!', id);
    getCountries(id);
});

