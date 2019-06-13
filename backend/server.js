const uniserver = require('./uniserver');
const fs = require('fs');
const PORT = 3000;
const db = require('./db/db');

// console.log(db.insert('menu', {
//     title: 'Test',
//     author: 'Mihail'
// }));

var whereCollection = db.update('menu', {
    'author': 'Mihail'
}, {
    'author': 'Sergey'
});

console.log(whereCollection);

var server = new uniserver();


server.get('menu', function (req, res) {
    let file = fs.readFileSync("../frontend/html/menu.html");
    res.html(file);
})

server.get('orders', function (req, res) {
    let file = fs.readFileSync('../frontend/html/order.html');
    res.html(file);

});

server.run(PORT, function () {
    console.log(`Server already sterted on port ${PORT}`)
});