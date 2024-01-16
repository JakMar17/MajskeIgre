export type CultureEventModel = {
    title: string;
    date: Date;
    imageUrl: string;
    events: CultureSubEventModel[];
};

export type CultureSubEventModel = {
    title: string;
    description: string;
    imageUrl?: string;
    location?: string;
    price?: string;
    registerLink?: string;
    time?: string;
}
