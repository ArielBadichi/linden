var e = module.exports;

e.line = function(turtle) {
    turtle.forward(50);
}

e.square = function(turtle) {
    turtle.repeat(4, function() {
        turtle.forward(50);
        turtle.right(90);
    });
}

e.star = function(turtle) {
    turtle.repeat(5, function() {
        turtle.forward(50);
        turtle.right(144);
    });
}

e.spiralingStar = function(turtle) {
    for (var i = 0; i < 20; i++) {
        turtle.forward(i * 10);
        turtle.right(144);
    }
}

e.changingColor = function(turtle) {
    turtle.pencolor("blue");
    turtle.repeat(50, function() {
        turtle.forward(50);
        turtle.left(123);
    });
    turtle.pencolor("red");
    turtle.repeat(50, function() {
        turtle.forward(100);
        turtle.left(123);
    });
}

e.ninja = function(turtle) {
    turtle.setspeed(0);
    turtle.repeat(180, function() {
        turtle.forward(100);
        turtle.right(30);
        turtle.forward(20);
        turtle.left(60);
        turtle.forward(50);
        turtle.right(30);
        turtle.setposition(0, 0);
        turtle.right(2);
    });
}

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

function lindenmayer(config) {
    return function(turtle) {
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

e.dragon = lindenmayer({
    start: "FX",
    rules: {
        X: "X+YF",
        Y: "FX-Y"
    },
    angle: 90,
    size: 10,
    iterations: 10
});

e.sierpinsky = lindenmayer({
    start: "FA",
    rules: {
        FA: "FB-FA-FB",
        FB: "FA+FB+FA"
    },
    angle: 60,
    size: 2,
    iterations: 6
});

e.plant = lindenmayer({
    start: "FX",
    rules: {
        X: "F-{{X}+}+F{+FX}-X",
        F: "FF"
    },
    angle: 25,
    size: 2,
    iterations: 5
});

e.plant2 = lindenmayer({
    start: "X",
    rules: {
        X: "F{+X}{-X}FX",
        F: "FF"
    },
    angle: 25.7,
    size: 4,
    iterations: 5
});

e.snowflake = lindenmayer({
    start: "F++F++F",
    rules: {
        F: "F-F++F-F"
    },
    angle: 60,
    size: 10,
    iterations: 3
});

e.koch = lindenmayer({
    start: "F",
    rules: {
        F: "F+F-F-F+F"
    },
    angle: 90,
    size: 3,
    iterations: 4
});

e.koch2 = lindenmayer({
    start: "F-F-F-F",
    rules: {
        F: "F+FF-FF-F-F+F+FF-F-F+F+FF+FF-F"
    },
    angle: 90,
    size: 3,
    iterations: 2
});

e.koch3 = lindenmayer({
    start: "F+F+F+F",
    rules: {
        F: "F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF",
        f: "ffffff"
    },
    angle: 90,
    size: 3,
    iterations: 2
});

e.pythagoras = lindenmayer({
    start: "A",
    rules: {
        B: "BB",
        A: "B{+A}-A"
    },
    angle: 45,
    size: 5,
    iterations: 6
});

e.gosper = lindenmayer({
    start: "A",
    rules: {
        A: "A+B++B-A--AA-B+",
        B: "-A+BB++B+A--A-B"
    },
    angle: 60,
    size: 10,
    iterations: 3
});

e.splant = lindenmayer({
    start: "F",
    rules: {
        F: [
            "F{+F}F{-F}F",
            "F{+F}F",
            "F{-F}F"
        ]
    },
    angle: 25,
    size: 4,
    iterations: 5
});