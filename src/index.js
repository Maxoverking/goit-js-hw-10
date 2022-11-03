import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

//============================================================

const countryList = document.querySelector('.country-list');
countryList.style.display = 'flex';  
countryList.style.flexDirection = 'column';

//============================================================

const countryInfo = document.querySelector('.country-info');

//============================================================

const input = document.getElementById('search-box');

input.addEventListener('input', debounce( getInputValue, DEBOUNCE_DELAY));

function getInputValue(evt) {
    evt.preventDefault();

    const inputValue = evt.target.value.trim();
    
    const url = "https://restcountries.com/v2/name";
    const field = "fields=name,capital,population,flags,languages";
    
    fetch(`${url}/${inputValue}?${field}`)
            .then(response => 
            response.json()
            ).then(data => {       
                goToOpenApiArray(data); 

                console.log("🚀 ~ data", data);              
            })
            .catch(error => {
            console.log(error);
            })   
     
}

function goToOpenApiArray(data) {
    console.log("🚀 ~ data", data.length);  

    if (data.length >= 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
         return;
    }else if (data.length === undefined) {
        countryList.innerHTML = '';
        return; 
    }
    
    data.forEach(element => {
        const {flags, name} = element;

        let languagesArray = [];

        element.languages.forEach(el => {
            const allValueLanguages = [Object.values(el.name).join('')];
            languagesArray.push(...allValueLanguages);    
        });
        const allLanguagesAvailable = languagesArray.join(', ');  
        
        if (data.length === 1) {
            markupCountryInfo(element, allLanguagesAvailable); 
            countryList.innerHTML = '';
            
        } else {
            markupCountryList(flags, name); 
            countryInfo.innerHTML = '';
        }            
}); 
}

function markupCountryList(flags, name) {
    const markupCountryList = `<div class="country-wrap">
    <li class="contry-item"><img src="${flags.svg}" alt="" width="40" height="30"></li>
    <li class="contry-item">${name}</li></div>`;

    countryList.insertAdjacentHTML('beforeend', markupCountryList);
}

function markupCountryInfo(element,languagesValue) {
    const {flags,name,population,capital} = element;

    const markupCountryInDiv = `<ul><div class="country-wrap">
    <li class="contry-item"><img src="${flags.svg}" alt="" width="40" height="30"></li>
    <li class="contry-item font-size">${name}</li>
    </div>
    <li class="contry-item">Capital: ${capital}</li>
    <li class="contry-item">Population: ${population}</li>
    <li class="contry-item">Languages: ${languagesValue}</li></ul>`;
   countryInfo.insertAdjacentHTML('beforeend', markupCountryInDiv);   
}