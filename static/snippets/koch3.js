lindenmayer({
    start: 'F+F+F+F',
    rules: {
        F: 'F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF',
        f: 'ffffff'
    },
    angle: 90,
    size: 3,
    iterations: 2
});
