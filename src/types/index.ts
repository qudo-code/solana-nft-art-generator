export interface Creator {
    address : string,
    share : number,
}

export interface AttributeValue {
    name: string,
    file: string,
}

export interface Attribute {
    name : string,
    directory : string,
    chanceOfNone? : number,
    values? : Array<AttributeValue>
}

export interface GenerationConfig {
    count : number,
    attributes : Array<Attribute>
}

export interface Config {
    family: string,
    name: string,
    symbol: string,
    external_url: string,
    description: string,
    baseUri: string,
    seller_fee_basis_points: number,
    creators : Array<Creator>,
    artwork : Array<GenerationConfig>
}

export interface MetadataAttribute {
    trait_type : string,
    value : string,
}

export interface MetadataFiles {
    uri: string,
    type: string,
}

export interface MetadataProperties {
    files: Array<MetadataFiles>
}

export interface MetadataCollection {
    name: string,
    family: string,
}

export interface Metadata {
    "edition": number,
    "date": number,
    "name": string,
    "image": string,
    "symbol": string,
    "description": string,
    "external_url": string,
    "properties": MetadataProperties,
    "seller_fee_basis_points": number,
    "attributes": Array<MetadataAttribute>,
}

export interface Generated {
    dna: string,
    images: Array<string>,
    metadata: Metadata,
}

export type generated = Map<string, Metadata>;
