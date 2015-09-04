lindenmayer({
    start: 'F',
    rules: {
        F: [
            'F{+F}F{-F}F',
            'F{+F}F',
            'F{-F}F'
        ]
    },
    angle: 25,
    size: 4,
    iterations: 5
});
