### Happy address

Proof of concept to use browser geolocation to fill out address web forms and to use geocoding services to break the address down into parts (address, state, city, etc). Usually address forms have `select` inputs which are frustrating to use, especially on mobile. Happy Address allows a user to enter an address as text without changing contexts across form elements, and lets the computers figure out the parsing and validation.

### Demo

- locally (best option) - `npm install && npm start` to run
- heroku (not good, because Google Maps API is maxed out on Heroku) https://happy-address.herokuapp.com/
