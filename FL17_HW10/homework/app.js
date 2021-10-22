const root = document.getElementById('root');
const editTweetSec = document.getElementsByClassName('hidden')[1];
const addTweetButton = document.getElementsByClassName('addTweet')[0];
const addTweetSec = document.getElementById('tweetItems');
const input = document.getElementById('modifyItemInput');
const saveChangesButton = document.getElementById('saveModifiedItem');
const list = document.getElementById('list');
const modifyItemHeader = document.getElementById('modifyItemHeader');
const navButtons = document.getElementById('navigationButtons');
const simpleTwitter = document.getElementsByTagName('hi')[0];

const inputMaxLength = 140;
let counter = localStorage.getItem('counter') || 0;

editTweetSec.style.visibility = 'hidden';
window.location.hash = '';

window.addEventListener('load', function() {
    if (window.location.hash === '') {
        window.location.hash = '#/main';
    }
});

addTweetButton.addEventListener('click', function() {
    window.location.hash = '#/add';
    addTweetSec.style.display = 'none';
    editTweetSec.style.visibility = 'visible';
    modifyItemHeader.innerHTML = 'Add tweet';
});

function makeUL(array) {
    let list = document.createElement('ul');
    for (let i = 0; i < array.length; i++) {
        let item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i].value));

        let reactDiv = document.createElement('div');
        reactDiv.setAttribute('class', 'icons');
        item.appendChild(reactDiv);

        let remove = document.createElement('button');
        remove.setAttribute('class', 'removed');
        remove.innerHTML = '&#10060;';
        let like = document.createElement('button');
        like.innerHTML = '&#10084;';
        like.setAttribute('class', 'liked');
        like.id = `tweet-${i}`
        reactDiv.appendChild(remove);
        reactDiv.appendChild(like);
        list.appendChild(item);
    }
    return list;
}

saveChangesButton.addEventListener('click', function() {
    if (input.value !== '' && input.value.length <= inputMaxLength) {
        localStorage.setItem(`tweet-${counter}`, input.value);
        counter++;
        localStorage.setItem('counter', counter);

        window.location.hash = '#/main';
        editTweetSec.style.visibility = 'hidden';
        addTweetSec.style.display = 'block';

        let dataArr = [];
        for (let i = 0; i < counter; i++) {
            let data = localStorage.getItem(`tweet-${i}`);
            if (localStorage.getItem !== null && data !== null) {
                dataArr.push({ key: `tweet-${i}`, value: data, liked: false });
            }
        }

        if (addTweetSec.lastElementChild) {
            addTweetSec.lastElementChild.innerHTML = '';
        }

        list.innerHTML = '';
        list.appendChild(makeUL(dataArr));

        document.querySelectorAll('.liked').forEach(item => {
            item.addEventListener('click', e => {
                console.log(e.target.id);
                console.log(e.target.textContent);
                for (let i in dataArr) {
                    if (dataArr[i].key === e.target.id) {
                        dataArr[i].liked = true;
                        console.log(dataArr);
                        break;
                    }
                }
                let buttonLiked = document.createElement('button');
                buttonLiked.innerHTML = 'Go to liked';
                buttonLiked.id = 'likedBut';
                if (document.getElementById('likedBut') === null) {
                    addTweetButton.after(buttonLiked);
                }

                if (document.getElementById('likedBut') !== null) {
                    document.getElementById('likedBut').addEventListener('click', function() {
                        let foundValue = dataArr.filter(obj => obj.liked === true);
                        window.location.hash = '#/liked';
                        list.innerHTML = '';
                        list.appendChild(makeUL(foundValue));
                        // navButtons.style.visibility = 'hidden';
                        // simpleTwitter.innerHTML = 'Liked tweets';
                    });
                }
            });
        });


        document.querySelectorAll('.removed').forEach((item, i) => {
            item.addEventListener('click', function() {
                console.log('delete');
                localStorage.removeItem(`tweet-${i}`);
                console.log(`removed tweet-${i}`)
                let removeIndex = dataArr.map(item => item.key).indexOf(`tweet-${i}`);
                dataArr.splice(removeIndex, 1);
                console.log(dataArr);
                list.innerHTML = '';
                list.append(makeUL(dataArr));
            });
        });
    }
    input.value = '';
});

localStorage.setItem('counter', counter);