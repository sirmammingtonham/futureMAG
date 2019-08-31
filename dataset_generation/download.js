const exporter = require('./index');
const fs = require('fs');

function sleep(ms) {
    console.log('sleeping')
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function download_articles(urls) {
    let finalArray = urls.map(async url => {
        const result = exporter.getPost(url);
        return result;
    });
    const resolved = await Promise.all(finalArray)
        .then(results => {
            console.log('finished');
            write(results);
        })
        .catch(err => {
            console.log('bruh');
            console.log(err);
        });
}

async function write(resolved) {
    var file = fs.createWriteStream('ooonezero.txt', {flags:'a'});
    file.on('error', function(err) { 
        console.log(err);
    });
    resolved.forEach(function(txt) { 
        file.write("<|startoftext|>" + txt + "<|endoftext|>\n"); 
    });
    file.end();

    return resolved;
}

var text = fs.readFileSync("./onezero_urls.txt", "utf-8");
var urls = text.split("\r\n");
// var urr = ['https://onezero.medium.com/scientists-are-using-crispr-in-attempts-to-restore-vision-cure-blood-disorders-and-more-860e4be91fd9', 
// 'https://onezero.medium.com/ninjas-twitch-defection-is-the-opening-shot-in-a-streaming-war-e5421570910e']-

// download_articles(urls.slice(0, 4));
// var urls = ['https://medium.com/@futureBOT/testing-markup-formatting-fd443cbac47b'];

var i = 0;
function f() {
    download_articles(urls.slice(i, i+1));
    i++;
    if( i < urls.length - 1){
        setTimeout(f, 500); // have to do all of this because of cloudflare limiting...
    }
}
f();