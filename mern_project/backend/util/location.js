const axios = require('axios');
require('dotenv').config();

const HttpError = require('../models/http-error');

const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${process.env.GEOCODE_ACCESS_TOKEN}`
  );

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  return {
    lat: data.features[0].center[1],
    lng: data.features[0].center[0],
  };
};

module.exports = getCoordsForAddress;
