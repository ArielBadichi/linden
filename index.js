var defaults = require("lodash/object/defaults");
var Turtle = require("./turtle");

var turtle;

function init() {
    window.turtle = turtle = new Turtle(window.canvas);
    requestAnimationFrame(step);
}

function step() {
    turtle.update();
    turtle.draw();
    requestAnimationFrame(step);
}

init();

window.examples = {};
function example(name, fn) {
    window.examples[name] = function(hold) {
        if (!hold) {
            turtle.clearscreen();
        }
        fn();
    };
}

example("line", function() {
    turtle.forward(50);
});

example("square", function() {
    turtle.repeat(4, function() {
        turtle.forward(50);
        turtle.right(90);
    });
});

example("star", function() {
    turtle.repeat(5, function() {
        turtle.forward(50);
        turtle.right(144);
    });
});

example("spiralingStar", function() {
    for (var i = 0; i < 20; i++) {
        turtle.forward(i * 10);
        turtle.right(144);
    }
});

example("changingColor", function() {
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
});

example("ninja", function() {
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
});

function prefixes(p, s, i) {
    var len = s.length;
    if ((len - i) < p.length) {
        return false;
    }
    for (var j = 0; j < p.length; j++) {
        if (p[j] !== s[j + i]) {
            return false;
        }
    }
    return true;
}

function lindenmayer(config) {
    defaults(config, {
        iterations: 10,
        size: 10,
        speed: 0
    });
    return function() {
        var i;
        var state = config.start;
        for (i = 0; i < config.iterations; i++) {
            var newstate = [];
            for (var j = 0; j < state.length;) {
                var prefix = null;
                var subst = null;
                for (var key in config.rules) {
                    if (prefixes(key, state, j)) {
                        prefix = key;
                        subst = config.rules[key];
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

        console.log("State length", state.length);

        turtle.setspeed(config.speed);

        for (i = 0; i < state.length; i++) {
            switch (state[i]) {
            case "F":
            case "A":
            case "B":
                turtle.forward(config.size);
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

example("dragon", lindenmayer({
    start: "FX",
    rules: {
        X: "X+YF",
        Y: "FX-Y"
    },
    angle: 90
}));

example("sierpinsky", lindenmayer({
    start: "FA",
    rules: {
        FA: "FB-FA-FB",
        FB: "FA+FB+FA"
    },
    angle: 60,
    size: 2,
    iterations: 6
}));

example("plant", lindenmayer({
    start: "FX",
    rules: {
        X: "F-{{X}+}+F{+FX}-X",
        F: "FF"
    },
    angle: 25,
    size: 2,
    iterations: 5
}));

example("snowflake", lindenmayer({
    start: "F++F++F",
    rules: {
        F: "F-F++F-F"
    },
    angle: 60,
    iterations: 3
}));

example("koch", lindenmayer({
    start: "F",
    rules: {
        F: "F+F-F-F+F"
    },
    iterations: 4,
    size: 3,
    angle: 90
}));

example("pythagoras", lindenmayer({
    start: "A",
    rules: {
        B: "BB",
        A: "B{+A}-A"
    },
    angle: 45,
    size: 5,
    iterations: 6
}));
