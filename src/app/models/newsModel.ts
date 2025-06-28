export interface Categories{
    code: string;
    description: string;
}

export interface Headers {
    date: Date;
    timestamp: Date;
    category: string;
    source: string[];
    language: string;
    dailyNewsNo: string;
    isFlash: boolean;
    id: number;
    headline: string;
    symbol: string[];
}

export interface Details {
    date: Date;
    timestamp: Date;
    symbol: string[];
    category: string;
    source: string[];
    language: string;
    dailyNewsNo: string;
    isFlash: boolean;
    id: number;
    content: string;
    headline: string;
}
