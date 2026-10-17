import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js';;
const API_URL = 'https://api.restcountries.com/countries/v5';

let input = document.querySelector('.input');
let msg = document.querySelector('.msg');
let countries = document.querySelector('.countries');
let box = document.querySelector('.box');

function renderList(value) {
    box.innerHTML = '';
    fetch(API_URL + '?q=' + value, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer rc_live_e265494cefdc4fe0bbcae6e9dc6894e1' }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            countries.innerHTML = '';
            let arr = data.data.objects;
            if (arr.length > 10) {
                msg.textContent = 'too much countries';
            } else {
                arr.forEach(x => {
                    let listMarkup = `<li>${x.names.common}</li>`;
                    countries.insertAdjacentHTML('afterbegin', listMarkup);
                });
            }
        })
}

countries.innerHTML = '';
box.innerHTML = '';

input.addEventListener('input', _.debounce(() => {
    renderList(input.value)
}, 2000))

input.addEventListener('change', () => {
    box.innerHTML = '';
    fetch(API_URL + '?q=' + input.value, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer rc_live_e265494cefdc4fe0bbcae6e9dc6894e1' }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            countries.innerHTML = '';
            console.log(data)
            let arr = data.data.objects[0];
            let languages = [];
            console.log(arr.languages)
            arr.languages.forEach(x => {
                languages.push(x.name);
            });
            const langMarkup = languages.map(name => `<li>${name}</li>`).join('');
            let markup = `
        <h1 class="title">${arr.names.official}</h1>
        <div class="txt-box">
            <h2 class="title-capital">${arr.capitals[0].name}</h2>
            <h2 class="title-population">${arr.population}</h2>
            <ul class="languages"></ul>
        </div>
        <img src="${arr.flag.url_png}" alt="${arr.names.official}" class="img">`;
            box.insertAdjacentHTML('afterbegin', markup)
            let languagesList = document.querySelector('.languages');
            languagesList.insertAdjacentHTML('afterbegin', langMarkup)
        })
})