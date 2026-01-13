import * as fs from 'fs';
import {createCanvas, Image} from 'canvas';

let adversaryFile = fs.readFileSync('./adversaries.json', 'utf8');
adversaryFile = adversaryFile.slice(1, -1) + ']';
const adversaryData = JSON.parse(adversaryFile);

for(let adversaryIndex = 0; adversaryIndex < adversaryData.length; adversaryIndex++)
{
    const adversary = adversaryData[adversaryIndex];
    console.log(adversary.name["en-US"]);
    const ratio = 7/12;
    const scaling = 1000;
    const width = scaling * 7;
    const height = scaling * 12;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    TopText(adversary, context, scaling, width);
    let [spacing, fontDenominator] = DetermineFeatFontSize(adversary, context, scaling, width);

    let lineIndex = 0;
    for(let featIndex = 0; featIndex < adversary.features.length; featIndex++)
    {
        let wordIndex = 0;
        
        context.font = `bold ${scaling/fontDenominator}px serif`;
        context.fillText(`${adversary.features[featIndex].name["en-US"]}`, scaling*0.015, scaling*((5+featIndex + ((spacing)*lineIndex))));
        context.font = `${scaling/fontDenominator}px serif`;
        let words = adversary.features[featIndex].description[0].paragraph["en-US"].replaceAll("<bold>", "").replaceAll("</bold>", "").replaceAll("<italic>", "").replaceAll("</italic>", "").split(" ");
        if(adversary.features[featIndex].description.length > 1 && "list" in adversary.features[featIndex].description[1])
        {
            for(let listIndex = 0; listIndex < adversary.features[featIndex].description[1].list.length; listIndex++)
            {
                words.push("\n");
                words = words.concat(adversary.features[featIndex].description[1].list[listIndex]["en-US"].replaceAll("<bold>", "").replaceAll("</bold>", "").replaceAll("<italic>", "").replaceAll("</italic>", "").split(" "));
            }
        }
        while(wordIndex < words.length)
        {
            let lineText = "";
            while(context.measureText(lineText + words[wordIndex]).width < width*0.985 && wordIndex < words.length)
            {
                if(words[wordIndex] === "\n")
                {
                    wordIndex++;
                    break;
                }
                else
                {
                    lineText += words[wordIndex] + " ";
                }
                wordIndex++;
            }
            context.fillText(lineText, scaling*0.015, scaling*((5+featIndex)+(spacing) + ((spacing)*lineIndex)));
            lineIndex++;
        }

    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`test${adversaryIndex}.png`, buffer);
}

function TopText(adversary, context, scaling, width)
{
    let titleDenominator = 1;
    context.font = `${scaling/titleDenominator}px serif`;
    while(context.measureText(adversary.name["en-US"]).width > width)
    {
        titleDenominator += 0.01;
        context.font = `${scaling/titleDenominator}px serif`;
    }
    context.fillText(adversary.name["en-US"], scaling*0.015, scaling);
    context.fillRect(0, scaling*1.015, width, scaling*0.015);
    context.font = `${scaling/2}px serif`;
    context.fillText(`Tier ${adversary.tier} ${adversary.type}`, scaling*0.015, scaling*1.515);
    context.fillRect(0, scaling*1.53, width, scaling*0.015);
    let denominator = 4;
    context.font = `${scaling/denominator}px serif`;
    while(context.measureText(`Motives & Tactics: ${adversary.motivesAndTactics["en-US"]}`).width > width)
    {
        denominator += 0.05
        context.font = `${scaling/denominator}px serif`;
    }
    //context.font = `${scaling/denominator}px serif`;
    context.fillText(`Motives & Tactics: ${adversary.motivesAndTactics["en-US"]}`, scaling*0.015, scaling*2.015);
    
    denominator = 4;
    context.font = `italic ${scaling/denominator}px serif`;
    while(context.measureText(adversary.description[0].paragraph["en-US"]).width > width)
    {
        denominator += 0.05;
        context.font = `italic ${scaling/denominator}px serif`;
    }
    context.fillText(adversary.description[0].paragraph["en-US"], scaling*0.015, scaling*2.265);
    context.font = `${scaling/4}px serif`;
    context.fillText(`Difficulty ${adversary.difficulty} | Thresholds ${adversary.damageThresholds.major}/${adversary.damageThresholds.severe} | HP ${adversary.hitPoints} | Stress ${adversary.stress}`, scaling*0.015, scaling*3);
    //context.fillText(`Attack ${adversary.standardAttack.name["en-US"]} +${adversary.attackModifier} ${adversary.standardAttack.range} | ${adversary.standardAttack.damage.dice[0].quantity}${adversary.standardAttack.damage.dice[0].die}+${adversary.standardAttack.damage.modifier} ${adversary.standardAttack.damage.type}`, scaling*0.015, scaling*3.5)
    context.fillText(FormatAttack(adversary), scaling*0.015, scaling*3.5)
    if("experiences" in adversary)
    {
        let line = "Experience"
        for(let expIndex = 0; expIndex < adversary.experiences.length; expIndex++)
        {
            line += ` ${adversary.experiences[expIndex].name["en-US"]} + ${adversary.experiences[expIndex].modifier}`
        }
        context.fillText(line, scaling*0.015, scaling*4);
    }
}

function DetermineFeatFontSize(adversary, context, scaling, width)
{
    let lineIndex = 0;
    let pixelHeight = 10000;
    let spacing = 0.5;
    let fontDenominator = 4;
    while(pixelHeight > 7000)
    {
        pixelHeight = 0;
        fontDenominator += 0.05;
        spacing =  1/fontDenominator;

        for(let featIndex = 0; featIndex < adversary.features.length; featIndex++)
        {
            let wordIndex = 0;
            context.font = `bold ${scaling/fontDenominator}px serif`;
            pixelHeight += (scaling/fontDenominator);
            context.font = `${scaling/fontDenominator}px serif`;
            let words = adversary.features[featIndex].description[0].paragraph["en-US"].replaceAll("<bold>", "").replaceAll("</bold>", "").replaceAll("<italic>", "").replaceAll("</italic>", "").split(" ");
            if(adversary.features[featIndex].description.length > 1 && "list" in adversary.features[featIndex].description[1])
            {
                for(let listIndex = 0; listIndex < adversary.features[featIndex].description[1].list.length; listIndex++)
                {
                    words.push("\n");
                    words = words.concat((adversary.features[featIndex].description[1].list[listIndex]["en-US"].replaceAll("<bold>", "").replaceAll("</bold>", "").replaceAll("<italic>", "").replaceAll("</italic>", "")).split(" "));
                }
            }
            while(wordIndex < words.length)
            {
                let lineText = "";
                while(context.measureText(lineText + words[wordIndex]).width < width*0.985 && wordIndex < words.length)
                {
                    if(words[wordIndex] === "\n")
                    {
                        lineIndex++;
                    }
                    lineText += words[wordIndex] + " ";
                    wordIndex++;
                }
                pixelHeight += (scaling/fontDenominator) + (spacing*scaling)*2;
                lineIndex++;
            }
        }
    }
    
    return [spacing, fontDenominator];
}

function FormatAttack(adversary)
{
    let returnString = `Attack ${adversary.standardAttack.name["en-US"]}`;
    if("attackModifier" in adversary)
    {
        if(adversary.attackModifier > 0)
        {
            returnString += `+${adversary.attackModifier}`;
        }
        else
        {
            returnString += `${adversary.attackModifier}`;
        }
    }
    returnString += ` ${adversary.standardAttack.range} | `;
    if('dice' in adversary.standardAttack.damage)
    {
        for(let diceIndex = 0; diceIndex < adversary.standardAttack.damage.dice.length; diceIndex++)
        {
            returnString += `${adversary.standardAttack.damage.dice[diceIndex].quantity}${adversary.standardAttack.damage.dice[diceIndex].die}+`
        }
        returnString = returnString.slice(0,-1);
    }
    if("modifier" in adversary.standardAttack.damage)
    {
        if(adversary.standardAttack.damage.modifier > 0)
        {
            returnString += `+${adversary.standardAttack.damage.modifier}`;
        }
        else
        {
            returnString += `${adversary.standardAttack.damage.modifier}`;
        }
    }
    returnString += ` ${adversary.standardAttack.damage.type}`;
    return returnString;
}