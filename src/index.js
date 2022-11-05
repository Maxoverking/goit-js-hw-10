import './css/styles.css';
import debounce from 'lodash.debounce';
//импорт fetch , import fetch
import {fetchCountries} from './fetchCountries'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

//============================================================
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
//============================================================

const input = document.getElementById('search-box');

input.addEventListener('input', debounce(inSearchCountries, DEBOUNCE_DELAY));

// создаем функцию по поиску даных из input
// create a function to search for data from input
function inSearchCountries(evt) {   
    evt.preventDefault();

    const inputValue = evt.target.value.trim();  
    if (inputValue === '') {
       cleanDocument();; 
    return;
    }
    //функция очистки HTML документа
    // function to clean up an HTML document
    cleanDocument(); 

    //импортированая функция fetch с возвратом json promise
    //imported fetch function with json promise return
    fetchCountries(inputValue)
        // получаем даные
        // get the data
        .then(data => {

        if (data.length >= 10) {
            Notify.info("Too many matches found. Please enter a more specific name.",
                    {clickToClose:true , position: "center-top",width:'320px',fontSize:'20px'});
        return;
        }else if (data.length === 1) {
            oneCountry(data); 
            return;
        } else {
            listOfAllCountries(data);
            }
        }).catch(error => //получаем ошибку  we get an error
           Notify.failure("Oops, there is no country with that name",
                { position: "center-top", width: '420px', fontSize: '20px' }))
}

//создаем разметку для всех стран
// create a mark-up for all countries
function listOfAllCountries(data) {
    const markupAllCountry = data.map(object => {//можно map через переменую 
                                                //только нужен join в конце
        const { flags, name } = object;
        
       return `<li class="country-row">
        <img src="${flags.svg}" alt="${name}" width="40" height="30">
        ${name}</li>`;
    }).join('')

    // console.log("🚀 ~ ma", markupAllCountry);
    countryList.innerHTML =  markupAllCountry;
}

//создаем разметку для одной страны
//create the mark-up for one country
function oneCountry(data) {
    data.forEach(object => { // или попробовать через forEach
                            //or try forEach
            const { flags, name, population, capital } = object;
            
            let languagesArray = [];  
            object.languages.forEach(el => {
            const allValueLanguages = [Object.values(el.name).join('')];
            languagesArray.push(...allValueLanguages);             
            });
            const languagesInCountry = languagesArray.join(', ');  
            
            const markupOneCountry =
            `<ul><li class="country-row"><img src="${flags.svg}" alt="${name}" width="60" height="50">
            <span class="font-country-info">${name}</span></li>           
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${languagesInCountry}</p></ul>`;
                    
        countryInfo.insertAdjacentHTML('beforeend', markupOneCountry);       
        });  
}

function cleanDocument() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}