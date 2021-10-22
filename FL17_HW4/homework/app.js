function reverseNumber(num) {
    let number = num.toString();
    let i;
    let revNum = '';
    if (number < 0) {
        for (i = 1; i < number.length; i++) {
            revNum = number[i] + revNum;
        }
        revNumMinus = '-' + revNum;
        return revNumMinus;
    } else {
        for (i = 0; i < number.length; i++) {
            revNum = number[i] + revNum;
        }
        return revNum;
    }
}

function forEach(arr, func) {
    for (let i of arr) {
        func(i);
    }
}

function map(arr, func) {
    let arrMap = [];
    for (let i = 0; i < arr.length; i++) {
        const result = func(arr[i], i, arr);
        arrMap.push(result);

    }
    return arrMap;
}

function filter(arr, func) {
    let arrFilter = [];
    for (let i = 0; i < arr.length; i++) {
        const result = func(arr[i], i, arr);
        if (result) {
            arrFilter.push(arr[i]);
        }
    }
    return arrFilter;
}

function getAdultAppleLovers(data) {
    data = [{
            '_id': '5b5e3168c6bf40f2c1235cd6',
            'index': 0,
            'age': 39,
            'eyeColor': 'green',
            'name': 'Stein',
            'favoriteFruit': 'apple'
        },
        {
            '_id': '5b5e3168e328c0d72e4f27d8',
            'index': 1,
            'age': 38,
            'eyeColor': 'blue',
            'name': 'Cortez',
            'favoriteFruit': 'strawberry'
        },
        {
            '_id': '5b5e3168cc79132b631c666a',
            'index': 2,
            'age': 2,
            'eyeColor': 'blue',
            'name': 'Suzette',
            'favoriteFruit': 'apple'
        },
        {
            '_id': '5b5e31682093adcc6cd0dde5',
            'index': 3,
            'age': 17,
            'eyeColor': 'green',
            'name': 'Weiss',
            'favoriteFruit': 'banana'
        }
    ]
    const num18 = 18;
    let over18Filter = filter(data, el => el.age > num18);
    let fruitFilter = filter(over18Filter, el => el.favoriteFruit === 'apple');
    let mapArr = map(fruitFilter, el => el.name);
    return mapArr;
}

function getKeys(obj) {
    let newArr = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            newArr.push(p);
        }
    }
    return newArr;

}

function getValues(obj) {
    let newArr = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            newArr.push(obj[p]);
        }
    }
    return newArr;

}

function showFormattedDate(dateObj) {
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = monthNames[dateObj.getMonth()];
    let date = dateObj.getDate();
    let year = dateObj.getFullYear();
    let shortDate = 'It is ' + date + ' of ' + month + ', ' + year;
    return shortDate;
}