function lindenmayer(turtle) {
    return function(config) {
        turtle.setspeed(0);
        var instructions = expand(config);
        for (var i in instructions) {
            perform(instructions[i]);
        }

        function perform(instruction) {
            switch (instruction) {
            case "F":
            case "A":
            case "B":
                turtle.forward(config.size);
                break;
            case "f":
                turtle.penup();
                turtle.forward(config.size);
                turtle.pendown();
                break;
            case "+":
                turtle.left(config.angle);
                break;
            case "-":
                turtle.right(config.angle);
                break;
            case "{":
                turtle.pushstate();
                break;
            case "}":
                turtle.popstate();
                break;
            default:
                break;
            }
        }
    }
}

function expand(config) {
    var value = config.start;
    for (var i = 0; i < config.iterations; i++) {
        value = expand1(value, config.rules);
    }
    return value;
}

function expand1(value, rules) {
    var result = [];
    var i = 0;
    while (i < value.length) {
        var e = expandPrefix(value, i, rules);
        result.push(e.output);
        i += e.consumed;
    }
    return result.join("");
}

function expandPrefix(value, i, rules) {
    for (var candidate in rules) {
        if (value.startsWith(candidate, i)) {
            return {consumed: candidate.length, output: chooseOutput(rules[candidate])};
        }
    }
    return {consumed: 1, output: value[i]};
}

function chooseOutput(x) {
    return Array.isArray(x) ? randomElement(x) : x;
}

function randomElement(array) {
    var k = Math.floor(array.length * Math.random());
    return array[k];
}

module.exports = lindenmayer;
