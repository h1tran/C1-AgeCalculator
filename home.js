// var age = prompt('How old are you?');
// document.getElementById('someText').innerHTML = age;

function greeting(name) {
    // String concatenation
    if (name === 'null' || name == '') {
        let result = "Hello!";
        return result;
    }
    else {
        let result = "Hello " + name + "!"
        return result;
    }
}

// How do arguments work in functions?

function sumNumbers(num_1, num_2) {
    let result = num_1 + num_2;
    return result;
}

// var name = prompt("What is your name?");
// console.log(greeting(name));

// 'Let' defined in the enclosed block context
// 'Var' defined in the local context

// Strings in Javascript (Common methods)
// let fruit = 'Banana\nApples';
// console.log(fruit);
// console.log(fruit.replace('Apple', 'Kiwi'));