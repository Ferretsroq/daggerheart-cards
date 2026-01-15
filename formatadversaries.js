import {createCanvas, Image} from 'canvas';
import * as fs from 'fs';

const ppi = 300;
const width = ppi*8.5;
const height = ppi*11;

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');
let adversaryFile = fs.readFileSync('./adversaries.json', 'utf8');
adversaryFile = adversaryFile.slice(1, -1) + ']';
const adversaryData = JSON.parse(adversaryFile);


context.fillStyle = 'white';
context.fillRect(0, 0, width, height);

for(let adversaryIndex = 0; adversaryIndex < adversaryData.length; adversaryIndex++)
{
    if(adversaryIndex%6 === 0)
    {
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(`page${Math.floor(adversaryIndex/6)}.png`, buffer);
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
    }
    const im = new Image();
    const data = fs.readFileSync(`./adversaries/${adversaryData[adversaryIndex].name["en-US"]}.png`);
    im.src = data;
    context.drawImage(im, (0.25*ppi)+((adversaryIndex%6)%3)*(2.75*ppi), (0.25*ppi)+(Math.floor((adversaryIndex%6)/3))*(4.75*ppi));
}

/*for(let imIndex = 0; imIndex < 6; imIndex++)
{
    const im = new Image();
    const data = fs.readFileSync('./adversaries/Acid Burrower.png');
    im.src = data;
    
    context.drawImage(im, (0.25*ppi)+(imIndex%3)*(2.75*ppi), (0.25*ppi)+(Math.floor(imIndex/3))*(4.75*ppi));
}



const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('page.png', buffer);*/