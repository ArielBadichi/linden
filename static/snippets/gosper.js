lindenmayer({
    start: 'A',
    rules: {
        A: 'A+B++B-A--AA-B+',
        B: '-A+BB++B+A--A-B'
    },
    angle: 60,
    size: 10,
    iterations: 3
});
