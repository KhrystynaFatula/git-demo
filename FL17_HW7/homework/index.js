// Your code goes here
function getAge(date) {
    let now = new Date();
    let num = 1970;
    let ageDif = new Date(now - date);
    let result = Math.abs(ageDif.getUTCFullYear() - num);
    return result;
}

function getWeekDay(date) {
    date = new Date(date);
    const arrDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = date.getDay();
    return arrDay[day];
}

function getAmountDaysToNewYear() {
    const hundred = 1000;
    const thirtySix = 3600;
    const twentyFour = 24;
    let dateOfNY = new Date('1/1/2022');
    let dateCurrent = new Date();
    let dif = dateOfNY.getTime() - dateCurrent.getTime();
    let result = Math.ceil(dif / (hundred * thirtySix * twentyFour));
    return result;
}

function getProgrammersDay(year) {
    const four = 4;
    const oneHund = 100;
    const fourHund = 400;
    const september = 8;
    const leapDay = 12;
    const normalDay = 13;
    const leapOrCommon = year % four === 0 && year % oneHund !== 0 || year % fourHund === 0;
    const date = leapOrCommon ? new Date(year, september, leapDay) : new Date(year, september, normalDay);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    const weekDay = getWeekDay(date);
    return `${date.getDate()} ${month}, ${year} (${weekDay})`;
}

function howFarIs(strDay) {
    const daysOfWeek = 7;
    const dayNow = new Date(Date.now()).getDay();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let result = `Hey, today is ${weekdays[dayNow]} =)`;
    let specifiedWeekday = strDay[0].toUpperCase() + strDay.slice(1);
    if (weekdays.indexOf(strDay) > dayNow) {
        result = `It's ${weekdays.indexOf(strDay) - dayNow} day(s) left till ${specifiedWeekday}`;
    } else if (weekdays.indexOf(strDay) < dayNow) {
        result = `It's ${daysOfWeek - dayNow + weekdays.indexOf(strDay)} day(s) left till ${specifiedWeekday}`;
    }
    return result;
}

function isValidIdentifier(str) {
    let regexp = /^\D\w+[$@_0-9]/;
    let check = regexp.test(str);
    return check;
}

function capitalize(testStr) {
    testStr = 'My name is John Smith. I am 27.';
    let regexp = /(\b[a-z](?!\s))/g;
    testStr = testStr.replace(regexp, function(x) {
        return x.toUpperCase();
    });
    return testStr;
}

function isValidAudioFile(str) {
    let regexp = /^[a-zA-Z]+(\.mp3)|(\.flac)|(\.alac)|(\.aac)/g;
    let check = regexp.test(str);
    return check;
}

function getHexadecimalColors(str) {
    let regexp = /#([a-f0-9]{3}){1,2}\b/gi;
    let result = str.match(regexp);
    return result;
}

function isValidPassword(str) {
    let regexp = /(?=.*[A-Z])(?=.*[a-z]+)(?=.*[0-9]+).{8,}$/gm;
    let result = regexp.test(str);
    return result;
}

function addThousandsSeparators(n) {
    n = ('' + n).split('.');
    const three = 3;
    let num = n[0];
    let s, t;
    let regexp = /(\d{3})/g;
    if (num.length > three) {
        s = num.length % three;
    }
    if (s) {
        t = num.substring(0, s);
        num = t + num.substring(s).replace(regexp, ',$1');
    } else {
        num = num.substring(s).replace(regexp, ',$1').substring(1);
    }
    return num;
}

function getAllUrlsFromText(str) {
    let regexp = /((https:\/\/)[^\s]+)/gm;
    let result = str.match(regexp);
    if (result === null) {
        return [];
    } else {
        return result;
    }
}