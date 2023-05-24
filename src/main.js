import '../style.css';

function createCurrency(currencyName, value) {
    const mainPath = document.querySelector('main div');
    const DECIMAL = 3;

    let newDiv = document.createElement('div');
    let newP = document.createElement('p');

    newDiv.classList.add('currency');
    newP.classList.add('value');
    newP.innerText = parseFloat(value).toFixed(DECIMAL);

    mainPath.appendChild(newDiv);

    const lastCurrency = document.getElementsByClassName('currency')[document
        .getElementsByClassName('currency').length - 1];
    lastCurrency.appendChild(newP);

    const newImg = document.createElement('img');
    newDiv = document.createElement('div');
    newP = document.createElement('p');

    newImg.src = '/assets/coins-svgrepo-com 1.png';
    newDiv.classList.add('content');
    newP.classList.add('currency-name');
    newP.innerText = currencyName;

    lastCurrency.appendChild(newDiv);
    lastCurrency.children[1].appendChild(newImg);
    lastCurrency.children[1].appendChild(newP);
}

const getCoin = (coinToFind) => fetch(`https://api.exchangerate.host/latest?base=${coinToFind}`)
    .then((response) => response.json()
        .then((currency) => currency)
        .catch((error) => console.log(error.message)))
    .catch((error) => console.log(error.message));

const setCoins = (obj) => {
    Object.entries(obj).forEach((coin) => {
        const [currencyName, value] = coin;
        createCurrency(currencyName, value);
    });
};

const btnSearch = document.getElementsByTagName('button')[0];

const isFullString = (coinName) => coinName
    .split('').some((letter) => !Number.isNaN(parseInt(letter, 10)));

const validationOfData = (inputValue, objOfCoins) => {
    const INPUT_LENGTH = 3;
    const ERROR_MESSAGE = 'Moeda não existente';

    if (!inputValue) throw new Error('Você precisa passar uma moeda');
    if (inputValue.length !== INPUT_LENGTH) throw new Error(ERROR_MESSAGE);
    if (isFullString(inputValue)) throw new Error(ERROR_MESSAGE);
    if (!Object.keys(objOfCoins)
        .some((coin) => coin === inputValue)) throw new Error(ERROR_MESSAGE);

    return inputValue;
};

btnSearch.addEventListener('click', () => {
    const mainPath = document.getElementsByTagName('main')[0];
    const inputValue = document.getElementsByTagName('input')[0].value;

    mainPath.innerHTML = '';

    getCoin(inputValue)
        .then((currency) => {
            const newDiv = document.createElement('div');
            const newH2 = document.createElement('h2');

            validationOfData(inputValue, currency.rates);
            newDiv.classList.add('container');
            newH2.innerText = `Valores referentes a 1 ${currency.base}`;
            mainPath.appendChild(newH2);
            mainPath.appendChild(newDiv);
            setCoins(currency.rates);
        })
        .catch((error) => console.log(error.message));
});
