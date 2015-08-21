var _ = require("lodash");
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
    turtle.setspeed(100);
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
