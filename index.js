const fs = require('fs');
const http = require('http');
const url = require('url');
// import slugify from 'slugify';
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplates');

////////////////////////
//FILES

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// blocking code, syncronous 
// const textOut = `this is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written');

// // non-blocking, asyncronous code
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('Your file has been written!');
//             })
//         })
//     })
// })
// console.log('Will read this first');
// because it is not in callback function it render first then callback functions 


////////////////////////
// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// data --> reading the data.json file elements.

const dataObj = JSON.parse(data);
// parsing the json item into string.

// outside of the callback function beacuse the code has to render once

// callback functions render everytime we refresh tha page.

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
// 
console.log(slugs);

// console.log(slugify('freash-avacados', { lower: true }));

const server = http.createServer((req, res) => {
    // console.log(req.url); // logs the url
    // console.log(url.parse(req.url, true)); // logs query and pathname which is used for /product?id=0, 1, 2, 3 ...

    const { query, pathname } = url.parse(req.url, true);

    // OVERVIEW PAGE
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardHtml = dataObj.map(el => 
            replaceTemplate(tempCard, el)).join('');
            // console.log(cardHtml)
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
        res.end(output);
    }
    
    // PRODUCT PAGE
    else if (pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'});
        // console.log(query);
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    
    // API
    else if(pathname === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        // application/json used to convert the JSON data to string and to diplay it 
            res.end(data);
    }
    
    // ERROR 404
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-heading': 'hello-world'
        });
        res.end('<h1>Page is not found</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})