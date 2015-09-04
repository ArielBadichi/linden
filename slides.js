module.exports = [
    {
        headline: "Turtles & L-systems",
        image: "images/turtle6.png"
    },
    {
        headline: "A little about LOGO",
        bullets: [
            "Programming language from the late 60s",
            "Used mainly to teach concepts of programming",
            "Lets the user command a cursor ('turtle') to move around and draw stuff",
            "Well-known for 'turtle graphics', but actually a real programming language",
            "My first programming language!"
        ],
        image: "images/book.jpg"
    },
    {
        headline: "Drawing a line",
        turtle: "turtle.forward(50);"
    },
    {
        headline: "Drawing a square",
        turtle: [
            "turtle.repeat(4, function() {",
            "    turtle.forward(50);",
            "    turtle.right(90);",
            "});"
        ].join("\n")
    },
    {
        headline: "Drawing a star",
        turtle: [
            "turtle.repeat(5, function() {",
            "    turtle.forward(50);",
            "    turtle.right(144);",
            "});"
        ].join("\n")
    },
    {
        headline: "Drawing a spiraling star",
        turtle: [
            "for (var i = 0; i < 20; i++) {",
            "    turtle.forward(i * 10);",
            "    turtle.right(144);",
            "}"
        ].join("\n")
    },
    {
        headline: "Colors",
        turtle: [
            "turtle.pencolor('blue');",
            "turtle.repeat(50, function() {",
            "    turtle.forward(50);",
            "    turtle.left(123);",
            "});",
            "turtle.pencolor('red');",
            "turtle.repeat(50, function() {",
            "    turtle.forward(100);",
            "    turtle.left(123);",
            "});"
        ].join("\n")
    },
    {
        headline: "Ninja",
        turtle: [
            "turtle.setspeed(0);",
            "turtle.repeat(180, function() {",
            "    turtle.forward(100);",
            "    turtle.right(30);",
            "    turtle.forward(20);",
            "    turtle.left(60);",
            "    turtle.forward(50);",
            "    turtle.right(30);",
            "    turtle.setposition(0, 0);",
            "    turtle.right(2);",
            "});"
        ].join("\n")
    },
    {
        headline: "Lindenmayer systems",
        bullets: [
            "Something about Astrid Lindenmayer",
            "Axiom and production rules",
            "Fractals"
        ]
    },
    {
        headline: "Dragon",
        turtle: [
            "lindenmayer({",
            "    start: 'FX',",
            "    rules: {",
            "        X: 'X+YF',",
            "        Y: 'FX-Y'",
            "    },",
            "    angle: 90,",
            "    size: 10,",
            "    iterations: 10",
            "});",
        ].join("\n")
    },
    {
        headline: "Sierpinski triangle",
        turtle: [
            "lindenmayer({",
            "    start: 'FA',",
            "    rules: {",
            "        FA: 'FB-FA-FB',",
            "        FB: 'FA+FB+FA'",
            "    },",
            "    angle: 60,",
            "    size: 2,",
            "    iterations: 6",
            "});"
        ].join("\n")
    },
    {
        headline: "Snowflake",
        turtle: [
            "lindenmayer({",
            "    start: 'F++F++F',",
            "    rules: {",
            "        F: 'F-F++F-F'",
            "    },",
            "    angle: 60,",
            "    size: 10,",
            "    iterations: 3",
            "});",
        ].join("\n")
    },
    {
        headline: "Koch 1",
        turtle: [
            "lindenmayer({",
            "    start: 'F',",
            "    rules: {",
            "        F: 'F+F-F-F+F'",
            "    },",
            "    angle: 90,",
            "    size: 3,",
            "    iterations: 4",
            "});",
        ].join("\n")
    },
    {
        headline: "Koch 2",
        turtle: [
            "lindenmayer({",
            "    start: 'F-F-F-F',",
            "    rules: {",
            "        F: 'F+FF-FF-F-F+F+FF-F-F+F+FF+FF-F'",
            "    },",
            "    angle: 90,",
            "    size: 3,",
            "    iterations: 2",
            "});",
        ].join("\n")
    },
    {
        headline: "Gosper",
        turtle: [
            "lindenmayer({",
            "    start: 'A',",
            "    rules: {",
            "        A: 'A+B++B-A--AA-B+',",
            "        B: '-A+BB++B+A--A-B'",
            "    },",
            "    angle: 60,",
            "    size: 10,",
            "    iterations: 3",
            "});",
        ].join("\n")
    },
    {
        headline: "Koch 3 (with penup forward)",
        turtle: [
            "lindenmayer({",
            "    start: 'F+F+F+F',",
            "    rules: {",
            "        F: 'F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF',",
            "        f: 'ffffff'",
            "    },",
            "    angle: 90,",
            "    size: 3,",
            "    iterations: 2",
            "});",
        ].join("\n")
    },
    {
        headline: "Plant (with state push/pop)",
        turtle: [
            "lindenmayer({",
            "   start: 'FX',",
            "   rules: {",
            "       X: 'F-{{X}+}+F{+FX}-X',",
            "       F: 'FF'",
            "   },",
            "   angle: 25,",
            "   size: 2,",
            "   iterations: 5",
            "});",
        ].join("\n")
    },
    {
        headline: "Plant 2",
        turtle: [
            "lindenmayer({",
            "   start: 'X',",
            "   rules: {",
            "       X: 'F{+X}{-X}FX',",
            "       F: 'FF'",
            "   },",
            "   angle: 25.7,",
            "   size: 4,",
            "   iterations: 5",
            "});",
        ].join("\n")
    },
    {
        headline: "Pythagoras",
        turtle: [
            "lindenmayer({",
            "    start: 'A',",
            "    rules: {",
            "        B: 'BB',",
            "        A: 'B{+A}-A'",
            "    },",
            "    angle: 45,",
            "    size: 5,",
            "    iterations: 6",
            "});",
        ].join("\n")
    },
    {
        headline: "Plant 3 (Stochastic)",
        turtle: [
            "lindenmayer({",
            "    start: 'F',",
            "    rules: {",
            "        F: [",
            "            'F{+F}F{-F}F',",
            "            'F{+F}F',",
            "            'F{-F}F'",
            "        ]",
            "    },",
            "    angle: 25,",
            "    size: 4,",
            "    iterations: 5",
            "});",
        ].join("\n")
    }
];
