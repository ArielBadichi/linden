var _ = require("lodash");
var Turtle = require("./turtle");

var turtle;

function init() {
    window.turtle = turtle = new Turtle(window.canvas);

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

    requestAnimationFrame(step);
}

function step() {
    turtle.update();
    turtle.draw();
    requestAnimationFrame(step);
}

init();
