const appRoot = document.getElementById('app-root');

const header = document.createElement('header');
header.setAttribute('id', 'header');
appRoot.append(header);

const h2 = document.createElement('h2');
h2.innerHTML = 'Countries Search';
header.append(h2);

const searchDiv = document.createElement('div');
searchDiv.setAttribute('class', 'searchDiv');
header.append(searchDiv);

const typeOfSearch = document.createElement('p');
typeOfSearch.innerHTML = 'Please choose the type of search: ';
searchDiv.append(typeOfSearch);

const searchValues = ['By Region', 'By Language'];
const rbDiv = document.createElement('div');
rbDiv.setAttribute('class', 'rbDiv');
searchDiv.append(rbDiv);

for (let i = 0; i < searchValues.length; i++) {
    const radButton = document.createElement('input');
    radButton.setAttribute('type', 'radio');
    radButton.setAttribute('name', 'searchType');

    const label = document.createElement('label');
    label.append(radButton);
    label.innerHTML += `${searchValues[i]}<br>`;

    rbDiv.append(label);
}
const quDiv = document.createElement('div');
quDiv.setAttribute('class', 'quDiv');
header.append(quDiv);

const searchQuery = document.createElement('p');
searchQuery.innerHTML = 'Please choose search query: '
quDiv.append(searchQuery);

let regionsList = externalService.getRegionsList();
regionsList.unshift('Select value');
let languagesList = externalService.getLanguagesList();
languagesList.unshift('Select value');
const unsetList = ['Select value'];
const select = document.createElement('select');
select.id = 'mySelect';
quDiv.append(select);

function dropDownList(optionsArr) {
    for (let i = 0; i < optionsArr.length; i++) {
        const option = document.createElement('option');
        option.value = optionsArr[i];
        option.text = optionsArr[i];
        select.append(option);
    }
}

dropDownList(unsetList);
select.disabled = true;

const radioButtons = document.querySelectorAll('input');
const message = document.createElement('p');
message.setAttribute('id', 'message');


if (document.querySelector('input')) {
    radioButtons.forEach(el => {
        el.addEventListener('click', function() {
            message.innerHTML = 'No items, please choose search query';
            header.appendChild(message);

            if (radioButtons[0].checked) {
                dropdown.options.length = 0;
                dropDownList(regionsList);
                select.disabled = false;
                if (document.getElementById('tableDiv')) {
                    document.getElementById('tableDiv').innerHTML = ''
                }
            } else if (radioButtons[1].checked) {
                dropdown.options.length = 0;
                dropDownList(languagesList);
                select.disabled = false;
                if (document.getElementById('tableDiv')) {
                    document.getElementById('tableDiv').innerHTML = ''
                }
            }
        });
    })
}

const dropdown = document.getElementById('mySelect');
const tbl = document.createElement('table');
const tblBody = document.createElement('tbody');
const fieldTitles = ['Country name', 'Capital', 'World Region', 'Languages', 'Area', 'Flag'];
const fields = ['name', 'capital', 'region', 'languages', 'area', 'flagURL']
const tableDiv = document.createElement('div');
tableDiv.setAttribute('id', 'tableDiv');

appRoot.append(tableDiv);

let areaSortDirection = 'desc';
let countrySortDirection = 'desc';

function createTable(objectArray, fields, fieldTitles, sortField) {
    let tbl = document.createElement('table');
    tbl.setAttribute('id', 'mainTable');
    let thead = document.createElement('thead');
    let thr = document.createElement('tr');
    fieldTitles.forEach((fieldTitle) => {
        let th = document.createElement('th');
        th.setAttribute('class', 'tableHeading');
        th.appendChild(document.createTextNode(fieldTitle));
        thr.appendChild(th);
    });
    thead.appendChild(thr);
    tbl.appendChild(thead);

    let tbdy = document.createElement('tbody');
    objectArray.forEach((object) => {
        let tr = document.createElement('tr');
        fields.forEach((field) => {
            let td = document.createElement('td');
            if (field === 'flagURL') {
                const image = document.createElement('img');
                image.src = object[field];
                td.appendChild(image);
                tr.appendChild(td);
            } else if (field === 'languages') {
                let valArr = []
                for (key in object[field]) {
                    if (object[field].hasOwnProperty(key)) {
                        let value = object[field][key];
                        valArr.push(value);
                    }
                }
                td.appendChild(document.createTextNode(valArr.join(', ')));
                tr.appendChild(td);
            } else {
                td.appendChild(document.createTextNode(object[field]));
                tr.appendChild(td);
            }
        });
        tbdy.appendChild(tr);
    });
    tbl.appendChild(tbdy);
    tableDiv.append(tbl);
    tbl.setAttribute('border', '2');

    const areaCell = 4;
    if (sortField === 'area') {
        let areaDir = areaSortDirection === 'asc' ? 'u' : 'd';
        document.getElementsByClassName('tableHeading')[areaCell].innerHTML += 
        `<span id='areaArr'> &${areaDir}arr;</span>`;
        document.getElementsByClassName('tableHeading')[0].innerHTML += `<span id='countNameArr'>&varr;</span>`;

    } else if (sortField === 'country') {
        let countryDir = countrySortDirection === 'asc' ? 'u' : 'd';
        document.getElementsByClassName('tableHeading')[0].innerHTML +=
         `<span id='countNameArr'>&${countryDir}arr;</span>`;
        document.getElementsByClassName('tableHeading')[areaCell].innerHTML += `<span id='areaArr'> &varr;</span>`;
    } else {
        document.getElementsByClassName('tableHeading')[areaCell].innerHTML += "<span id='areaArr'> &varr;</span>";
        document.getElementsByClassName('tableHeading')[0].innerHTML += "<span id='countNameArr'> &uarr;</span>";

    }

    addSortingListeners();

    return tbl;
}

function addSortingListeners() {
    if (document.getElementById('mainTable')) {
        let areaSpan = document.getElementById('areaArr');
        let countSpan = document.getElementById('countNameArr');

        areaSpan.addEventListener('click', function() {
            let areaDir = areaSortDirection === 'asc' ? 'u' : 'd';
            drawTableAfterSort(areaDir, 'area');
            document.getElementById('countNameArr').innerHTML = `<span id='countNameArr'>&varr;</span>`;
            areaSortDirection = areaSortDirection === 'asc' ? 'desc' : 'asc';
        });

        countSpan.addEventListener('click', function() {
            let countryDir = countrySortDirection === 'asc' ? 'u' : 'd';
            drawTableAfterSort(countryDir, 'country');
            document.getElementById('areaArr').innerHTML = `<span id='areaArr'>&varr;</span>`;
            countrySortDirection = countrySortDirection === 'asc' ? 'desc' : 'asc';
        });

    }
}

function drawTableAfterSort(dir, sortField) {
    let selectedValue = dropdown.options[dropdown.selectedIndex].value;
    let selectedObject = null;

    if (externalService.getLanguagesList().includes(selectedValue)) {
        selectedObject = externalService.getCountryListByLanguage(selectedValue);

    } else if (externalService.getRegionsList().includes(selectedValue)) {
        selectedObject = externalService.getCountryListByRegion(selectedValue);
    }

    if (!selectedObject) {
        return;
    }

    let minusOne = -1;

    let sortFieldName = sortField === 'country' ? 'name' : 'area';

    let ascNameLang = selectedObject.sort((a, b) => (dir === 'u' ? a[sortFieldName] < b[sortFieldName] 
    : a[sortFieldName] > b[sortFieldName]) ? minusOne 
    : Number(dir === 'u' ? a[sortFieldName] < b[sortFieldName] : a[sortFieldName] > b[sortFieldName]));
    document.getElementById('tableDiv').innerHTML = '';
    createTable(ascNameLang, fields, fieldTitles, sortField);
}

dropdown.addEventListener('change', function() {
    let selectedValue = dropdown.options[dropdown.selectedIndex].value;
    document.getElementById('tableDiv').innerHTML = '';
    if (selectedValue === 'Select value') {
        document.getElementById('tableDiv').innerHTML = '';
    } else if (document.getElementById('message')) {
        message.remove();
    }

    if (selectedValue !== 'Select value') {
        const minusOne = -1;
        document.getElementById('tableDiv').innerHTML = '';
        if (externalService.getLanguagesList().includes(selectedValue)) {
            let selectedLangObj = externalService.getCountryListByLanguage(selectedValue);

            let ascNameLang = selectedLangObj.sort((a, b) => a.name < b.name ? minusOne : Number(a.name > b.name));
            createTable(ascNameLang, fields, fieldTitles, null);

        } else if (externalService.getRegionsList().includes(selectedValue)) {
            let selectedRegionObj = externalService.getCountryListByRegion(selectedValue);

            let ascNameReg = selectedRegionObj.sort((a, b) => a.name < b.name ? minusOne : Number(a.name > b.name));
            createTable(ascNameReg, fields, fieldTitles, null);
        }
    }
});