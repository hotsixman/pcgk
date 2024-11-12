import { textSearch } from 'pcgk-crawler'
import { getCard } from "pcgk-crawler";
import * as fs from 'fs';
import { join } from 'path';

let limit = 0;
while (true) {
    const searchData = await textSearch('', 'all', limit);
    if (!searchData) break;
    if (searchData.count <= 0) {
        break;
    }

    try {
        const searchedCards = await Promise.all(searchData.result.map(async (e) => {
            return await getCard(e.cardNum)
        }))
        const s = searchedCards.filter(e => e !== null)
        console.log(limit);
        if (!fs.existsSync(join(import.meta.dirname, `/chunk`))) {
            fs.mkdirSync(join(import.meta.dirname, `/chunk`), { recursive: true })
        }
        fs.writeFileSync(join(import.meta.dirname, `/chunk/${limit}.json`), JSON.stringify(s, null, 2), 'utf-8');
        limit++;
    }
    catch {
        continue;
    }
}

//fs.writeFileSync('./data/data.json', JSON.stringify(cards, null, 2), 'utf-8')