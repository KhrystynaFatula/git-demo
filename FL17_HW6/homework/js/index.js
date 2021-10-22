function visitLink(path) {
    //your code goes here
    let script_name = 'page1';
    let script_name2 = 'page2';
    let script_name3 = 'page3';

    if (path === 'Page1') {
        if (localStorage[script_name]) {
            localStorage[script_name] = parseInt(localStorage[script_name]) + 1;
        } else {
            localStorage[script_name] = 1;
        }
    } else if (path === 'Page2') {
        if (localStorage[script_name2]) {
            localStorage[script_name2] = parseInt(localStorage[script_name2]) + 1;
        } else {
            localStorage[script_name2] = 1;
        }
    } else if (path === 'Page3') {
        if (localStorage[script_name3]) {
            localStorage[script_name3] = parseInt(localStorage[script_name3]) + 1;
        } else {
            localStorage[script_name3] = 1;
        }
    }
}


function viewResults() {
    //your code goes here

    let containerDiv = document.getElementsByClassName('container')[0];

    let newP1 = document.createElement('p');
    let newP2 = document.createElement('p');
    let newP3 = document.createElement('p');

    containerDiv.appendChild(newP1);
    containerDiv.appendChild(newP2);
    containerDiv.appendChild(newP3);
    newP1.innerHTML = '';
    newP2.innerHTML = '';
    newP3.innerHTML = '';

    let key1 = localStorage.getItem('page1') || 0;
    let key2 = localStorage.getItem('page2') || 0;
    let key3 = localStorage.getItem('page3') || 0;

    if (key1 === 0 && key2 === 0 && key3 === 0) {
        newP1.innerHTML = 'You haven`t pressed any link';
    } else {
        newP1.innerHTML = `You visited Page1 ${key1} time(s)`;
        newP2.innerHTML = `You visited Page2 ${key2} time(s)`;
        newP3.innerHTML = `You visited Page3 ${key3} time(s)`;
    }

    localStorage.clear();
}