import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const data = JSON.parse(readFileSync(join(import.meta.dirname, 'rawdata.json'), 'utf-8'));

const usedCardNum = new Set();

const modified = data.map((e => {
    if (usedCardNum.has(e.cardNum)) {
        return null;
    }
    else {
        usedCardNum.add(e.cardNum);
        return {
            name: e.name,
            cardNum: e.cardNum,
            featureImage: e.featureImage,
            type: e.type,
            goods: e.goods
        }
    }
})).filter(e => e !== null);

writeFileSync(join(import.meta.dirname, 'data.json'), JSON.stringify(modified), 'utf-8');