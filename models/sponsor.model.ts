export type SponsorsModel = {
    description: string;
    showSponsors: boolean;
    sponsors: SponsorModel[];
}

export type SponsorModel = {
    name: string;
    imageUrl: string;
    link?: string;
    type: SponsorType;
}

export type SponsorType = 'Generalni' | 'XL' | 'L' | 'M' | 'S';