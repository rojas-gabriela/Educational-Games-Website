const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('', async(req, res) => {
    const countriesAPI = await fetchCountries();
    // console.dir(countriesAPI, { depth: null })
    res.json({ countries : countriesAPI });
})

const fetchCountries  = async () => {
    const response = await fetch('https://restcountries.herokuapp.com/api/v1');
    const countriesJson = await response.json();
  
    return  countriesJson.map((country) => {
      return { name: country.name.common, capital: country.capital }
    })
}

module.exports = router;
