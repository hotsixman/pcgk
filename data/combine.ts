import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const data = [];

for (let i = 0; i <= 558; i++) {
    try {
        const json = readFileSync(join(import.meta.dirname, `./chunk/${i}.json`), 'utf-8');
        data.push(...JSON.parse(json))
    }
    catch { }
}

writeFileSync(join(import.meta.dirname, '/rawdata.json'), JSON.stringify(data), 'utf-8');