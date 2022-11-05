import chalk from "chalk";

import {
    pathExists,
    readFile,
} from "fs-extra";

import {
    Config
} from "../types";

import {
    ConfigDefaults
} from "../types/defaults";

// Throw errors
import throwUp from "./throw-up";

// Load config
// Find the config, parse it as JSON if we found one, throw errors if not.
export default async (projectDirectory:string) : Promise<Config> => {
    try {
        const configFile = "matr.config.json";

        await pathExists(`${projectDirectory}/${configFile}`);
        
        try {
            const configBuffer = await readFile(`${projectDirectory}/${configFile}`);
    
            const config:Config = JSON.parse(configBuffer.toString());
    
            return config;
        } catch(error) {
            throwUp(`Unable to parse ${configFile} file found at ${chalk.yellow(projectDirectory)}. Make sure it's valid json.`);
        }
    
        return ConfigDefaults;
    } catch(error) {
        throwUp(`Error loading config file in ${chalk.yellow(projectDirectory)} You can generate a new config at our website.`);
    }
};
