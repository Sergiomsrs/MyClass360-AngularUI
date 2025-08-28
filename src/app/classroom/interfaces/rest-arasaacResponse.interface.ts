export interface ArasaacResponse {
    _id: number;
    created: Date;
    downloads: number;
    tags: string[];
    synsets: string[];
    sex: boolean;
    lastUpdated: Date;
    schematic: boolean;
    keywords: Keyword[];
    categories: string[];
    violence: boolean;
    hair: boolean;
    skin: boolean;
    aac: boolean;
    aacColor: boolean;
    desc?: string;
    score?: number;
}

export interface Keyword {
    keyword: string;
    type: number;
    meaning?: string;
    plural?: string;
    hasLocution: boolean;
}
