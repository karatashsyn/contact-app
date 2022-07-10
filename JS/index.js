/* eslint-disable */
// import '/@babel/polyfill';
//import { login } from './login';
import { logout } from './login';
// const loginForm = document.querySelector('.form');

// const logOutBtn = document.querySelector('.log-out-link');
const searchBar = document.querySelector('.search-bar');
// if (loginForm) {
//   loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     login(email, password);
//   });
// }

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
let contacts = [];
if (searchBar) {
  searchBar.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    contacts.forEach((contact) => {
      const isVisible =
        contact.name.toLowerCase().includes(value) ||
        contact.number.toLowerCase().includes(value);
      contact.element.classList.toggle('hide', !isVisible);
    });
  });

  const contactCardTemplate = document.querySelector('[data-contact-template]');
  const contactCardsContainer = document.querySelector(
    'contact-cards-container'
  );
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => {
      contacts = data.map((contact) => {
        const card = contactCardTemplate.content.cloneNode(true).children[0];
        const name = card.querySelector('[data-contact-name]');
        const number = card.querySelector('[data-contact-number]');
        console.log(card);
        name.textContent = contact.name;
        number.textContent = contact.id;
        console.log(name.textContent);
        contactCardsContainer.append(card);
        return { name: contact.name, number: contact.id };
      });
    });
}
