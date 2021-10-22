/* START TASK 1: Your code goes here */
let table = document.getElementsByTagName('table')[0];
let specCell = document.getElementsByClassName('spec-cell')[0];

for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[0].addEventListener( 'click', function() {
        table.rows[i].classList.add('blue');
    });
}
table.addEventListener( 'click', function(e) {
    let target = e.target;
    const two = 2;
    if (target !== table.rows[0].cells[0] && target !== table.rows[1].cells[0] && target !== table.rows[two].cells[0]) {
        e.target.classList.add('yellow');
    } 
});

specCell.addEventListener('click', function() {
    table.classList.add('green');
});
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const button = document.getElementsByTagName('button')[0];
const input = document.getElementsByClassName('input-space')[0];
const messageBlock = document.getElementsByClassName('message')[0];


input.addEventListener('input', function() {
    let validOrNot = /(\+380)([0-9]{9})$/.test(input.value);
    
    if (validOrNot) {
        messageBlock.firstElementChild.innerHTML = '<p></p>';
        messageBlock.classList.remove('invalid');
        button.disabled = false;
        input.style.border = '2px solid black';
    } else {
        messageBlock.firstElementChild.innerHTML = 'Type number doesn`t follow format +380********'; 
        messageBlock.setAttribute('class', 'invalid');
        input.style.border = '2px solid red';
        button.disabled = true;
    }
});

button.addEventListener('click', function() {
    let validOrNot = /(\+380)([0-9]{9})$/.test(input.value);
    if (validOrNot){
        messageBlock.firstElementChild.innerHTML = 'Data was successfully sent'; 
        messageBlock.setAttribute('class', 'valid');
    }
})

/* END TASK 2 */

/* START TASK 3: Your code goes here */
const court = document.getElementById('court');
const ball = document.getElementById('ball');
const teamA = document.getElementsByClassName('teamA')[0];
const teamB = document.getElementsByClassName('teamB')[0];
const scoreMessage = document.getElementsByClassName('score-message')[0].firstElementChild;
let counterA = 0;
let counterB = 0;
teamB.firstElementChild.innerHTML = `${counterB}`;
teamA.firstElementChild.innerHTML = `${counterA}`;

scoreMessage.addEventListener('goalScored', function (e) {
    scoreMessage.textContent = e.detail.text;
    scoreMessage.style.color = e.detail.textColor;
});

function scoreGoal(text, color) {
    const event = new CustomEvent('goalScored', {
        detail: {
            text: text,
            textColor: color
          }
    });

    scoreMessage.dispatchEvent(event);
}

const two = 2;
const minY = 140;
const maxY = 148;
const minXA = 528;
const maxXA = 552;
const minXB = 5;
const maxXB = 26;
const threeSec = 3000;

court.addEventListener('click', function(e) {
    let courtCoords = this.getBoundingClientRect();

    let ballCoords = {
        top: e.clientY - courtCoords.top - court.clientTop - ball.clientHeight / two,
        left: e.clientX - courtCoords.left - court.clientLeft - ball.clientWidth / two
    };

    if (ballCoords.top < 0) {
        ballCoords.top = 2;
    }

    if (ballCoords.left < 0) {
        ballCoords.left = 2;
    }

    if (ballCoords.left + ball.clientWidth > court.clientWidth) {
        ballCoords.left = court.clientWidth - ball.clientWidth - two;
    }

    if (ballCoords.top + ball.clientHeight > court.clientHeight) {
        ballCoords.top = court.clientHeight - ball.clientHeight - two;
    }

    if (ballCoords.top >= minY && ballCoords.top <= maxY) {
        if (ballCoords.left >= minXB && ballCoords.left <= maxXB) {
            counterB = counterB + 1;
            teamB.firstElementChild.innerHTML = `${counterB}`;
            scoreGoal('Team B score!', 'red');
            setTimeout(function(){
                scoreMessage.innerHTML = '<p></p>';
            }, threeSec);
        } else if (ballCoords.left >= minXA && ballCoords.left <= maxXA) {
            counterA = counterA + 1;
            teamA.firstElementChild.innerHTML = `${counterA}`;
            scoreGoal('Team A score!', 'blue');
            setTimeout(function(){
                scoreMessage.innerHTML = '<p></p>';
            }, threeSec);
        }
    }

    ball.style.left = ballCoords.left + 'px';
    ball.style.top = ballCoords.top + 'px';
});
