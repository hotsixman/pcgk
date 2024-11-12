import type { CollectedCard, CollectedCardData, SimplifiedCardData } from '../types';
import Dexie, { type EntityTable } from 'dexie';
import simplifiedCardDatas from '../../../data/data.json';

const collectedCardDB = new Dexie('collect-card') as Dexie & {
    cards: EntityTable<CollectedCardData, 'id' | 'cardNum'>
}
collectedCardDB.version(1).stores({
    cards: '++id, card, count, &cardNum'
})

//const collectedCardDatas = writable<CollectedCardData[]>(await collectedCardDB.cards.toArray());

export { collectedCardDB, /*collectedCardDatas*/ };

const cardDB = new Dexie('card') as Dexie & {
    cards: EntityTable<SimplifiedCardData, 'id' | 'cardNum'>
}
cardDB.version(1).stores({
    cards: '++id, card, &cardNum'
})
await cardDB.cards.clear()
await cardDB.cards.bulkAdd(simplifiedCardDatas.map((e, i) => ({
    id: i,
    card: e,
    cardNum: e.cardNum
} as SimplifiedCardData)));

//const cardDatas = writable<SimplifiedCardData[]>(await cardDB.cards.toArray());
export { cardDB, /*cardDatas*/ }