// Your code goes here

const money = +prompt('Enter initial amount of money', '1000');
const years = +prompt('Enter number of years', '2');
const percentage = +prompt('Enter percentage of a year', '10');
const num1000 = 1000;
const num100 = 100;
const two = 2;

function countPercentage() {
    if (isNaN(money) || isNaN(years) || isNaN(percentage) || money < num1000 || years < 1 || percentage > num100) {
        alert('Invalid input data');
    }

    let maxPercentage = 1 + percentage / num100;
    let totalAmount = money * Math.pow(maxPercentage, years);
    let totalProfit = totalAmount - money;
    console.log(totalAmount);
    confirm(`Initial amount: ${money}
Number of years: ${years}
Percentage of year: ${percentage}%

Total profit: ${totalProfit.toFixed(two)}
Total amount: ${totalAmount.toFixed(two)}
`);
}
countPercentage();