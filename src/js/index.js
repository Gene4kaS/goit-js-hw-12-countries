// import './css/common.css';
// import countryForm from './templates/form.hbs';
// import countryList from './templates/list.hbs';
import fetchCountries from './fetchCountries';
// import '@pnotify/core/dist/BrightTheme.css';

// import { debounce } from 'lodash';
// import { error, Stack } from '@pnotify/core';



// fetch('https://restcountries.com/v2/all?fields=flag,name,capital,languages,population').then(r => r.json()).then(console.log)

const refs = {
    inputContry: document.querySelector('#input'),
    outputCountry: document.querySelector('.box-country'),
  }

refs.inputContry.addEventListener('input', debounce(onInput, 500));

function onInput() {
  if (!refs.inputContry.value) return markupOutput(0);

fetchCountries(refs.inputContry.value).then(data => {
    if (!data.length) {
      markupOutput(0);
      return errorMessage('There is no such country. Refine your request.');
    }

    if (data.length > 10) {
      errorMessage('Too many matches found. Please enter amore specific query!');
    } else if (data.length > 2 && data.length <= 10) {
      markupOutput(countryList(data));
    } else {
      markupOutput(countryForm(data[0]));
    }
    return;
  });

  function markupOutput(markup) {
    refs.outputCountry.innerHTML = '';
    if (markup) refs.outputCountry.insertAdjacentHTML('afterbegin', markup);
    return;
  }

  function errorMessage(message) {
    const myStack = new Stack({
      dir1: 'right',
      firstpos1: 25,
      push: 'top',
      modal: true,
    });

    return error({
      text: message,
      delay: 3000,
      closer: false,
      stack: myStack,
      title: 'ERROR!',
      icon: false,
      width: '250px',
      sticker: false,
      addClass: 'error-box',
    });
  }
}



