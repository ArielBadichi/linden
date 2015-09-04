function expand(config) {
    var state = config.start;
    for (var i = 0; i < config.iterations; i++) {
        var newstate = [];
        for (var j = 0; j < state.length;) {
            var prefix = null;
            var subst = null;
            for (var key in config.rules) {
                if (state.startsWith(key, j)) {
                    prefix = key;
                    subst = config.rules[key];
                    if (Array.isArray(subst)) {
                        subst = subst[Math.floor(Math.random() * subst.length)];
                    }
                    break;
                }
            }
            if (subst) {
                newstate.push(subst);
                j += prefix.length;
            } else {
                newstate.push(state[j]);
                j++;
            }
        }
        state = newstate.join("");
    }
    return state;
}

function lindenmayer(turtle) {
    return function(config) {
        var state = expand(config);
        console.log("State length", state.length);

        turtle.setspeed(0);

        for (var i = 0; i < state.length; i++) {
            switch (state[i]) {
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

module.exports = lindenmayer;
