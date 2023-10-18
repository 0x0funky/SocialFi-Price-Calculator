const RATIO = 10**6;
const ONE_ETHER = 10**18;
const PRICE_UNIT = 0.1 * ONE_ETHER;
const NUMBER_UNIT_PER_ONE_ETHER = ONE_ETHER / PRICE_UNIT;
const PRICE_BTC_PER_TC = 0.000416666666666667 * ONE_ETHER;  // 1 BTC = 2400 TC
const PRICE_TC_PER_BTC = 2400 * ONE_ETHER;  // 1 BTC = 2400 TC
const PRICE_KEYS_DENOMINATOR = 264000;
const initialPrice = 1 /250

function calculatePrices() {
    const supply = parseFloat(document.getElementById("supply").value);
    const amount = 1;

    document.getElementById("priceV2").innerText = getPriceV2(supply, amount/0.1);
    document.getElementById("price1").innerText = getPrice2(supply, amount);
    document.getElementById("price2").innerText = getPrice1(supply, amount);
    document.getElementById("price4").innerText = getPrice4(supply-1, amount);
}


function getPriceV2(supply, amount) {
    let sum1, sum2, summation, price;

    if (supply === 0) {
        sum1 = 0;
    } else {
        sum1 = (supply - NUMBER_UNIT_PER_ONE_ETHER) * supply * (2 * (supply - NUMBER_UNIT_PER_ONE_ETHER) + NUMBER_UNIT_PER_ONE_ETHER) / 6;
    }

    if (supply === 0 && amount === 1) {
        sum2 = 0;
    } else {
        sum2 = (supply - NUMBER_UNIT_PER_ONE_ETHER + amount) * (supply + amount) * (2 * (supply - NUMBER_UNIT_PER_ONE_ETHER + amount) + NUMBER_UNIT_PER_ONE_ETHER) / 6;
    }

    summation = sum2 - sum1;
    price = (summation * ONE_ETHER) / (PRICE_KEYS_DENOMINATOR * Math.pow(NUMBER_UNIT_PER_ONE_ETHER, 3)) /ONE_ETHER/ 0.01;

    return price;
}

function getPrice1(supply, amount) {
    const adjustedSupply = supply + 2;
    if (adjustedSupply === 0) {
        return initialPrice;
    }
    const sum1 = (adjustedSupply - 1) * adjustedSupply * (2 * (adjustedSupply - 1) + 1) / 6;
    const sum2 = (adjustedSupply - 1 + amount) * (adjustedSupply + amount) * (2 * (adjustedSupply - 1 + amount) + 1) / 6;
    const summation = 0.8 * (sum2 - sum1);
    const price = 0.5 * summation * initialPrice;

    return price >= initialPrice ? price : initialPrice;
}

function getPrice2(supply, amount) {
    let sum1, sum2, summation;

    if (supply === 0) {
        sum1 = 0;
    } else {
        sum1 = (supply - 1) * supply * (2 * (supply - 1) + 1) / 6;
    }

    if (supply === 0 && amount === 1) {
        sum2 = 0;
    } else {
        sum2 = (supply - 1 + amount) * (supply + amount) * (2 * (supply - 1 + amount) + 1) / 6;
    }

    summation = sum2 - sum1;

    return summation / 16000;
}

function getPrice4(supply, amount) {
    const sum1 = supply * (supply + 1) * (2 * supply + 1) / 6;
    const sum2 = (supply + amount) * (supply + 1 + amount) * ((2 * (supply + amount)) + 1) / 6;
    const summation = sum2 - sum1;
    return summation / 43370;
}