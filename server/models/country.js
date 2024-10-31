const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    region: { type: String, required: true },
    capital: { type: String },
    currencies: {
        type: Map,
        of: new mongoose.Schema({
            name: String,
            symbol: String
        })
    },
    languages: {
        type: Map,
        of: String
    },
    flagImage: { type: String, required: true },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
