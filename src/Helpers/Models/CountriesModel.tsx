export interface Countries{
    flags: Flags,
    name: Name,
    capital : string[],
    region : string,
    population : string
    tld: string,
    subregion:string
    borders:any[],
    cca3:string
}

export interface Flags{
    svg: string,
    png: string,
    alt: string
}

export interface Name{
    common:string,
    official:string,
    nativeName:{}
}



