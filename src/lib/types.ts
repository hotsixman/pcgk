export interface SimplifiedCard {
    name: string;
    cardNum: string;
    featureImage: string;
    type: 'pokemon' | 'trainers' | 'energy';
    goods: string;
}
export interface SimplifiedCardData{
    id: number;
    card: SimplifiedCard;
    cardNum: string;
}

export type CollectedCard = Pick<SimplifiedCard, 'name' | 'cardNum' | 'featureImage' | 'type'> & { goods: string | null };
export type CollectedCardData = {
    id: number;
    card: CollectedCard;
    count: number;
    cardNum: string;
}