const Axios = require('axios');
// const getExchangeRate = (from, to) => {
//     return Axios.get(
//         'http://data.fixer.io/api/latest?access_key=6463ec019b3b51f45d48e30fcac1073d&format=1'
//     ).then(res => {
//         const euro = 1 / res.data.rates[from];
//         const rate = euro * res.data.rates[to];
//         return rate;
//     });
// };

const getExchangeRate = async (from, to) => {
    const response = await Axios.get(
        'http://data.fixer.io/api/latest?access_key=6463ec019b3b51f45d48e30fcac1073d&format=1'
    );
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
};

// const getCountries = currencyCode => {
//     return Axios.get(
//         `https://restcountries.eu/rest/v2/currency/${currencyCode}`
//     ).then(response => {
//         return response.data.map(country => country.name);
//     });
// };

const getCountries = async currencyCode => {
    const response = await Axios.get(
        `https://restcountries.eu/rest/v2/currency/${currencyCode}`
    );
    return response.data.map(country => country.name);
};

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to)
//         .then(rate => {
//             convertedAmount = (amount * rate).toFixed(2);
//             return getCountries(to);
//         })
//         .then(countries => {
//             return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries ${countries.join(
//                 ', '
//             )}`;
//         });
// };

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const convertedAmount = (amount * rate).toFixed(2);
    const countries = await getCountries(to);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries ${countries.join(
        ', '
    )}`;
};

convertCurrency('CAD', 'USD', 20).then(result => {
    console.log(result);
});
