const fs = require('fs');

var change = false;

console.log('Change variable = ' + change);

fs.watch('target.txt', function () {
        console.log("File 'target.txt' just changed");
        if (change === true) {
            console.log('Change variable = ' + change);
        }
    }
);

console.log('Now watching target.txt for changes...');
