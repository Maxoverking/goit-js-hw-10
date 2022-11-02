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
        const objData = data[0];
        goToOpenApiObject(objData);
       
        })
        .catch(error => {
        console.log(error);
        })
}
   


   
function goToOpenApiObject(objData) {
    // console.log("🚀 ~ objData", objData);

    const {official} = objData.name;
    const {population,capital,languages} = objData;
    const { svg } = objData.flags;
    const languagesValue = Object.values(languages).join(',');  
    const allObj = { svg, official, capital, population, languagesValue };
    
    // markupCountryList(svg, official);
    markupCountryInfo(allObj);
}




// function markupCountryList(svg ,official) {
//         const markupCountryList = `<li class="contry-item"><img src="${svg}" alt="" width="40" height="30"></li>
//     <li class="contry-item">${official}</li>`;
    
//     countryList.insertAdjacentHTML('beforeend' , markupCountryList) 
// }


function markupCountryInfo(allObj) {

    const { svg, official, capital, population, languagesValue } = allObj;
    
    const markupCountryInfo = `<ul>
    <li class="contry-item"><img src="${svg}" alt="" width="40" height="30"></li>
    <li class="contry-item">${official}</li>
    <li class="contry-item">Capita: ${capital}</li>
    <li class="contry-item">Population: ${population}</li>
    <li class="contry-item">Languages: ${languagesValue}</li></ul>`;
    
    countryInfo.insertAdjacentHTML('beforeend' , markupCountryInfo) 
}
    
        