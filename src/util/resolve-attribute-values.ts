/* eslint-disable max-statements */
import path from "path";

import {
    pathExists,
    readdir,
} from "fs-extra";

import type {
    Config,
    GenerationConfig
} from "../types";

import throwUp from "./throw-up";

import spinner from "./cli-spinner";
import waitASec from "./wait-a-sec";

const getAttributeValues = async (projectDirectory:string, generation:GenerationConfig) => {
    const spinnerInstance = spinner("🎨 Reading attributes and values");

    const attributes = await Promise.all(generation.attributes.map(async (attribute) => {
        const attributeDirectory = path.join(projectDirectory, attribute.directory);

        if(attribute.directory) {
            const directoryExists = await pathExists(attributeDirectory);
    
            if(!directoryExists) {
                throwUp(`Couldn't find directory ${attributeDirectory} defined in matr.config`);
            }

            const filesInDirectory = await readdir(attributeDirectory);

            const filterHiddenFiles = filesInDirectory.filter((fileName:string) => !fileName.startsWith("."));
        
            const values = filterHiddenFiles.map((fileName) => ({
                name : fileName
                    .replace(/_/g, " ")
                    .replace(/\.[^/.]+$/, ""),
                file : `${attributeDirectory}/${fileName}`,
            }));

            return {
                directory : attributeDirectory,
                name      : attribute.name || attribute.directory,
                values,
            };
        }

        if(!attribute.name) {
            throwUp("All attributes need to have either a name or a directory.");
        }

        return {
            directory : "",
            name      : attribute.name,
            values    : [
                {
                    name : "None",
                    file : "",
                },
            ],
        };
    }));

    await waitASec(2000);

    spinnerInstance.stop();

    return {
        ...generation,
        attributes,
    };
};

export default (projectDirectory:string, config:Config) => Promise.all(config.artwork.map((generation) => getAttributeValues(projectDirectory, generation)));
