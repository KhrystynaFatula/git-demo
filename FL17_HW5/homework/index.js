// Your code goes here
function isEqual(arg1, arg2) {
    return arg1 === arg2;
}

function isBigger(arg1, arg2) {
    return arg1 > arg2;
}

function storeNames(...arg) {
    let arrNames = [];
    arrNames.push(...arg);
    return arrNames;
}

function getDifference(arg1, arg2) {
    if (arg1 < arg2) {
        return arg2 - arg1;
    }
    return arg1 - arg2;

}

function negativeCount(arr) {
    let arrNegative = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            arrNegative.push(arr[i]);
        }
    }
    return arrNegative.length;
}

function letterCount(word, letter) {
    word = word.split('');
    let arrLetters = [];
    let numOfLetters = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            arrLetters.push(word[i]);
            numOfLetters = arrLetters.length;
        }
    }
    return numOfLetters;
}

function countPoints(pointsArr) {
    const three = 3;
    let points = 0;
    for (let i = 0; i < pointsArr.length; i++) {
        let arrOfPair = pointsArr[i].split(':');
        arrOfPair[0] >= arrOfPair[1] ? points += three : points;
        arrOfPair[0] === arrOfPair[1] ? points += 1 : points;
    }
    return points;
}