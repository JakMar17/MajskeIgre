export type PerformerModel = {
    size: 'majhni' | 'srednji' | 'veliki';
    name: string;
    description?: string;
    imageUrl?: string;
}

export type ConcertEventModel = {
    title: string;
    location: string;
    date: string;
    imageUrl: string;
    performers?: string;
    performersList?: PerformerModel[];
    playlist?: string;
    geoLocation?: string;
}