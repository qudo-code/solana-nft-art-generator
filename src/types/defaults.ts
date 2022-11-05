import {
    Attribute,
    Config,
    Creator,
    GenerationConfig,
} from "src/types";

const CreatorDefaults:Creator =  {
    address : "",
    share   : 0,
};

const AttributeDefaults:Attribute =  {
    name         : "",
    directory    : "",
    chanceOfNone : 0,
};

const GenerationConfigDefaults:GenerationConfig = {
    count      : 0,
    attributes : [
        AttributeDefaults,
    ],
};

const ConfigDefaults:Config = {
    name                    : "",
    family                  : "",
    symbol                  : "",
    external_url            : "",
    description             : "",
    baseUri                 : "",
    seller_fee_basis_points : 0,
    creators                : [
        CreatorDefaults,
    ],
    artwork : [
        GenerationConfigDefaults,
    ],
};

const MetadataDefaults = {
    edition                 : 0,
    name                    : "",
    image                   : "",
    symbol                  : "",
    description             : "",
    external_url            : "",
    seller_fee_basis_points : 0,
    properties              : {
        files : [
            {
                uri  : "",
                type : "",
            },
        ],

    },
    attributes : [
        {
            trait_type : "",
            value      : "",
        },
    ],
};

export {
    ConfigDefaults,
    MetadataDefaults,
};
