var Turtle = require("./turtle");

var turtle = new Turtle(window.canvas);
window.turtle = turtle;
requestAnimationFrame(step);

function step() {
    turtle.update();
    turtle.draw();
    requestAnimationFrame(step);
}

var examples = require("./examples");
window.examples = [];
for (var name in examples) {
    (function(name) {
        window.examples.push(name);
        window[name] = function(hold) {
            if (!hold) {
                turtle.stop();
                turtle.clearscreen();
            }
            examples[name](turtle);
        };
    })(name);
}
