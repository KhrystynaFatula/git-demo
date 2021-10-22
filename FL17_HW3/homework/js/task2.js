// Your code goes here
/* eslint-disable no-magic-numbers */
/* eslint-disable no-constant-condition */
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cancelAnswer(prize) {
    alert(`Thank you for your participation. Your prize is: ${prize}$`);
    let playAgainAns = confirm('Do you want yo play again?');
    return playAgainAns;
}

function prizeDefiner(i, counter) {
    let prize = 0;
    let highPrize = 100;
    let double = 2;

    let mediumPrize, lowPrize;

    highPrize = highPrize * Math.pow(double, counter - 1);
    mediumPrize = highPrize / double;
    lowPrize = mediumPrize / double;

    switch (i) {
        case 1:
            prize = highPrize;
            break;
        case double:
            prize = mediumPrize;
            break;
        default:
            prize = lowPrize;
    }
    return prize;
}

function casinoSimulator() {
    let prize = 0;
    let minNumb = 0;
    let maxNumb = 8;
    let numbOfAttempts = 3;
    let contOrNot = true;
    let counter = 0;
    let step = 4;
    let totalPrize = 0;
    let eight = 8;

    let firstQuestion = confirm('Do you want to play a game?');

    if (!firstQuestion) {
        alert('You did not become a billionaire, but can.');
    } else {
        do {
            counter++;
            let generatedRandNumb = getRandom(minNumb, maxNumb);
            if (counter > 1) {
                maxNumb = maxNumb + step;
            }

            alert(generatedRandNumb); //del

            for (let i = 1; i <= numbOfAttempts; i++) {
                let possibPrize = prizeDefiner(i, counter);
                let userRandNumb = +prompt(`Choose a roulette pocket number from ${minNumb} to ${maxNumb}
                Attempts left: ${step - i}
                Total prize: ${totalPrize}$
                Possible prize on current attempt: ${possibPrize}$`, '');
                if (generatedRandNumb === userRandNumb) {
                    prize = prizeDefiner(i, counter);
                    totalPrize = totalPrize + prize;
                    i = numbOfAttempts;
                    let congratMesssage = confirm(`Congratulation, you won!
                 Your prize is: ${totalPrize}$. Do you want to continue?`);
                    if (!congratMesssage) {
                        let cansAns = cancelAnswer(totalPrize);
                        if (!cansAns) {
                            contOrNot = false;
                        } else {
                            counter = 0;
                            maxNumb = eight;
                            totalPrize = 0;
                        }
                    }
                } else if (generatedRandNumb !== userRandNumb && i === numbOfAttempts) {
                    let notGuessed = cancelAnswer(totalPrize);
                    if (!notGuessed) {
                        contOrNot = false;
                    } else {
                        counter = 0;
                        maxNumb = eight;
                        totalPrize = 0;
                    }
                }
            }
        } while (contOrNot);
    }
    return 0;
}
casinoSimulator();