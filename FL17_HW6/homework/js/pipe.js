function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

const pipe = (value, ...funcs) => {
    // PIPE implementation
    try {
        for (let i = 0; i < funcs.length; i++) {
            if (!isFunction(funcs[i])) {
                throw new Error(`Provided argument at position ${i} is not a function`);
            }
        }
        funcs.forEach(fn => {
            value = fn(value)
        });
        return value;

    } catch (err) {
        return err.message;
    }
};

const replaceUnderscoreWithSpace = (value) => value.replace(/_/g, ' ');
const capitalize = (value) =>
    value
    .split(' ')
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(' ');
const appendGreeting = (value) => `Hello, ${value}!`;

// const error = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, '');

// alert(error); // Provided argument at position 2 is not a function!

// const result = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, appendGreeting);

// alert(result); // Hello, John Doe!