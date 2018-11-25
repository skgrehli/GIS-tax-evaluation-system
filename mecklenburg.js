const axios = require('axios');
const namecase = require('namecase');
module.exports = async (addressInput) => {
  console.log("server started")
  const url = 'https://property.spatialest.com/nc/mecklenburg/data/search';
  const formattedAddress = addressInput.toUpperCase().replace(/\s+/g, '+') + '_srcterm';
  const response = await axios.post(url, {
    type: 'search',
    term: formattedAddress
  });
  const requiredResponseFields = response && response.data && response.data.searchResults;
  if (!requiredResponseFields) {
    throw new Error('Invalid API response');
  }

  const topResult = response.data.searchResults[0];
  const requiredResultFields = ['TotalAssessedValue', 'LandSize', 'landUseCodeDescription'];
  for(field of requiredResultFields) {
    if (!topResult[field]) {
      throw new Error('Invalid API model');
    }
  }

  let formattedAcres = topResult['LandSize'].toLowerCase().replace('waterfront', '');
  if (formattedAcres.includes('square feet')) {
    const squareFeet = Number(formattedAcres.replace('square feet', '').trim());
    const acres = squareFeet / 43560;
    formattedAcres = acres;
  } else {
    formattedAcres = formattedAcres.replace('acres', '').replace('acre', '').trim();
  }

  const formattedAppraisal = topResult['TotalAssessedValue'].replace(/(\$|,)/g, '').trim();
  const numericalAppraisal = Number(formattedAppraisal);
  
  let formattedZoning = topResult['landUseCodeDescription'].toLowerCase();
  if (formattedZoning.includes('residential')) {
    formattedZoning = 'residential';
  }
  if (formattedZoning.includes('commercial')) {
    formattedZoning = 'commercial';
  }

  // include owners if present
  const owners = [];
  for(field in topResult) {
    if (field.toLowerCase().includes('owner')) {
      owners.push(namecase(topResult[field]));
    }
  }

  const formattedResponse = {
    TotalValue: numericalAppraisal,
    LotSize: formattedAcres,
    Zoning: formattedZoning,
    Owners: owners
  };

  return formattedResponse;
};