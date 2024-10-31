const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Country = require('./models/country');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/countryExplorer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Function to fetch and cache country data
async function fetchAndCacheCountryData() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;

        // Clear the existing country data in the database
        await Country.deleteMany({});

        // Map and save the countries to MongoDB
        const countryDocs = countries.map(country => ({
            name: country.name.common,
            region: country.region,
            capital: country.capital && country.capital.length > 0 ? country.capital[0] : "Unknown", // use a string directly
            currencies: country.currencies || {},
            languages: country.languages || {},
            flagImage: country.flags.svg || '',
        }));

        await Country.insertMany(countryDocs);
        console.log('Country data fetched and cached successfully');
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

// Endpoint to get all countries from the database
app.get('/api/countries', async (req, res) => {
    try {
        const countries = await Country.find();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve countries' });
    }
});

// Initial data fetch on server start
fetchAndCacheCountryData();

// Basic route
app.get('/', (req, res) => {
    res.send('Hello from the country explorer API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
