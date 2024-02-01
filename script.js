const passwordElem = document.getElementById('password-text');
const copyPasswordElem = document.getElementById('copy-password');
const lengthElem = document.getElementById('length');
const lowercaseElem = document.getElementById('lowercase');
const uppercaseElem = document.getElementById('uppercase');
const numbersElem = document.getElementById('numbers');
const symbolsElem = document.getElementById('symbols');
const generateElem = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=';

generatePassword();

// button to generate password
generateElem.addEventListener('click', () => {
    generatePassword();
})

// button to copy password
copyPasswordElem.addEventListener('click', () => {
    passwordElem.select();
    passwordElem.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(passwordElem.value);
})

// on enter, generate password
document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        generateElem.click();
    }
});

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateX() {
    const xs = [];
    if (uppercaseElem.checked) {
        xs.push(getUppercase());
    }
    if (lowercaseElem.checked) {
        xs.push(getLowercase());
    }
    if (numbersElem.checked) {
        xs.push(getNumber());
    }
    if (symbolsElem.checked) {
        xs.push(getSymbol());
    }
    return xs[Math.floor(Math.random() * xs.length)];
}

function shuffleArray(unshuffled) {
    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    return shuffled;
}

function generatePassword() {
    const length = lengthElem.value;
    const unshuffled = [];

    if (uppercaseElem.checked) {
        unshuffled.push(getUppercase());
    }
    if (lowercaseElem.checked) {
        unshuffled.push(getLowercase());
    }
    if (numbersElem.checked) {
        unshuffled.push(getNumber());
    }
    if (symbolsElem.checked) {
        unshuffled.push(getSymbol());
    }

    if (unshuffled.length === 0) {
        passwordElem.value = "";
        alert("Please include at least one of the below options.");
    } else {
        for (let i = unshuffled.length; i < length; i++) {
            unshuffled.push(generateX());
        }

        passwordElem.value = shuffleArray(unshuffled).join('');
    }
}