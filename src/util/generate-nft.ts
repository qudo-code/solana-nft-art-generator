/* eslint-disable max-statements */
import sha1 from "sha1";

import {
    Attribute,
    Generated,
    Metadata,
    Config
} from "../types";

import {
    MetadataDefaults
} from "../types/defaults";

// Max number of times a duplicate is allowed when generating
const MAX_TRIES = 3;

export default (
    // Used to fill in metadata.
    config:Config,

    // Attributes to generate from.
    attributes:Array<Attribute>,

    edition: number,

    // Map of existing NFTs so we can check for duplicates.
    generated:Map<string, Metadata>

) : Generated => {
    const attemptGenerate = (attempt = 0) : Generated => {
        if(attempt > MAX_TRIES) {
            throw new Error("Not enough attributes to reach enough unique NFTs. Add more attributes or lower the generation count.");
        }

        const metadata:Metadata = { ...MetadataDefaults };
        const imagePath = `${edition}.png`;
        const files = [
            {
                uri  : imagePath,
                type : "image/png",
            },
        ];

        metadata.edition = edition;
        metadata.name = `${config.name} #${edition}`;
        metadata.image = imagePath;
        metadata.symbol = config.symbol;
        metadata.description = config.description;
        metadata.seller_fee_basis_points = config.seller_fee_basis_points;
        metadata.external_url = config.external_url;
        metadata.properties = {
            files,
        };

        const images:Array<string> = [];

        metadata.attributes = attributes.map((attribute:Attribute) => {
            const randomValue = attribute.values[Math.floor(Math.random() * attribute.values.length)];

            if(randomValue.name === "None") {
                return {
                    trait_type : attribute.name,
                    value      : "None",
                };
            }

            images.push(randomValue.file);
            
            return {
                trait_type : attribute.name,
                value      : randomValue.name,
            };
        });

        const dna = sha1(images.join("."));

        if(generated.has(dna)) {
            // eslint-disable-next-line no-console
            return attemptGenerate(++attempt);
        }
        
        return {
            dna,
            images,
            metadata,
        };
    };

    const data = attemptGenerate();

    return data;
};
