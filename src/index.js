import './css/styles.css';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;



const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
countryList.style.display = 'flex';  
countryList.style.flexDirection = 'column';


const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(getInputValue,DEBOUNCE_DELAY));

function getInputValue(evt) {
    evt.preventDefault();
    
    const inputValue = evt.target.value;
    // console.log("🚀 ~ inputValue", inputValue);
const url = "https://restcountries.com/v3.1/name";

fetch(`${url}/${inputValue}`)
        .then(response => 
        response.json()
        ).then(data => {
        goToOpenApiObject(data) 
        const d = data

        console.log("🚀 ~ data", d);
        })
        .catch(error => {
        console.log(error);
        })
   

    

}
   
function goToOpenApiObject(data) {
     data.forEach(element => {
        const {official} = element.name;
        const {capital} = element;
        const population = element.population.toString();
        const flag = element.flags.svg;
        const languageObj = element.languages
        const languagesValue = Object.values(languageObj).join(',');
        // console.log("🚀 ~ country", country);
    //    return { country, capital, population, flag, languagesValue };
    const markupCountryList = `<li class="contry-item"><img src="${flag}" alt="" width="40" height="30"></li>
    <li class="contry-item">${official}</li>`;
    countryList.insertAdjacentHTML('beforeend' , markupCountryList)
}) 
}




function markupCountryList() {
     
}
    
        