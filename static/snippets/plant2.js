lindenmayer({
   start: 'X',
   rules: {
       X: 'F{+X}{-X}FX',
       F: 'FF'
   },
   angle: 25.7,
   size: 4,
   iterations: 5
});
