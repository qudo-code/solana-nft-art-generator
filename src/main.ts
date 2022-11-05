#! /usr/bin/env node
/* eslint-disable max-statements */
import path from "path";
import figlet from "figlet";
import chalk from "chalk";

import {
    mkdir,
    remove,
} from "fs-extra";

import type {
    GenerationConfig,
} from "./types";

import waitASec from "./util/wait-a-sec";
import resolveAttributeFiles from "./util/resolve-attribute-values";
import generateNft from "./util/generate-nft";
import writeMetadata from "./util/write-metadata";
import processImages from "./util/process-images";
import loadConfig from "./util/load-config";
import spinner from "./util/cli-spinner";
import throwUp from "./util/throw-up";

const setupDirectories = async (projectDirectory:string) => {
    // Clean
    await remove(path.join(projectDirectory, "assets"));
    
    // Scaffold
    await mkdir(path.join(projectDirectory, "assets"), { recursive : true });
};

const intro = async () => {
    // eslint-disable-next-line no-console
    console.log(
        chalk.green(
            figlet.textSync("MATR", { horizontalLayout : "full" })
        )
    );

    // eslint-disable-next-line no-console
    console.log(chalk.yellow("NFT Art & Metadata Generator\n"));
        
    const spinnerInstance = spinner("🔎 Analyzing project files");

    await waitASec();

    spinnerInstance.stop();
};

const readConfig = async (projectDirectory:string) => {
    const spinnerInstance = spinner("👀 Reading config");

    // Read matr.config from project directory
    const config = await loadConfig(projectDirectory);

    await waitASec();

    spinnerInstance.stop();

    return config;
};

(async () => {
    // State
    const generatedMetadata = new Map();
    const imagesToProcess = new Map();

    // Read whatever path they passed in via CLI
    // eslint-disable-next-line prefer-destructuring
    const projectDirectory = process.argv[2];

    if(!projectDirectory) {
        throwUp("No project directory provided.");
    }

    await intro();
    await setupDirectories(projectDirectory);

    // Read matr.config from project directory
    const config = await readConfig(projectDirectory);

    // Array of generation configs where the attributes have the
    // "values" property filled in with attributes values and filepaths.
    const generations:Array<GenerationConfig> = await resolveAttributeFiles(projectDirectory, config);

    // Generate metadata for each NFT + stage list of image layers to be compiled.
    generations.forEach((generation) => {
        for(let i = 0; i < generation.count; i++) {
            const edition = Array.from(generatedMetadata.values()).length;

            const nft = generateNft(
                config,
                generation.attributes,
                edition,
                generatedMetadata
            );

            // Add NFT details to generated
            generatedMetadata.set(nft.dna, { ...nft.metadata });

            // Add images paths here to be processed later
            imagesToProcess.set(nft.dna, nft.images);
        }
    });
    
    // Write out metadata files.
    await writeMetadata(projectDirectory, generatedMetadata);

    // Use DNA and attribute file paths to compile NFT images.
    await processImages(projectDirectory, generatedMetadata, imagesToProcess);
})();
