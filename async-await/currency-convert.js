const Axios = require('axios');

const getExchangeRate = async (from, to) => {
    try {
        const response = await Axios.get(
            'http://data.fixer.io/api/latest?access_key=6463ec019b3b51f45d48e30fcac1073d&format=1'
        );
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }
        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
};

const getCountries = async currencyCode => {
    try {
        const response = await Axios.get(
            `https://restcountries.eu/rest/v2/currency/${currencyCode}`
        );
        return response.data.map(country => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const convertedAmount = (amount * rate).toFixed(2);
    const countries = await getCountries(to);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries ${countries.join(
        ', '
    )}`;
};

convertCurrency('CAD', 'USD', 20)
    .then(result => {
        console.log(result);
    })
    .catch(e => {
        console.log(e.message);
    });
