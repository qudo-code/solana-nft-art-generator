import {
    writeFile,
} from "fs-extra";

import path from "path";

import type {
    Metadata,
} from "../types";

const cliProgress = require("cli-progress");
const chalk = require("chalk");

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

export default async (projectDirectory:string, generatedMetadata:Map<string, Metadata>) : Promise<void> => {
    // eslint-disable-next-line no-console
    const outDir = `${projectDirectory}/metadata`;

    // eslint-disable-next-line no-console
    console.log(`📦 Writing metadata -> ${chalk.yellow(outDir)}`);
    
    const metadataValues = Array.from(generatedMetadata.values());

    progressBar.start(metadataValues.length, 0);

    const writeMetadataPromises = metadataValues.map((metadata) => {
        const outPath = path.join(projectDirectory, `assets/${metadata.edition}.json`);

        const json = JSON.stringify(metadata, null, 4);

        progressBar.update(metadata.edition + 1);

        return writeFile(outPath, json);
    });

    // Write individual metadata files
    await Promise.all(writeMetadataPromises);

    // Write all metadata
    await writeFile(path.join(projectDirectory, "assets/_metadata.json"), JSON.stringify(metadataValues, null, 4));

    progressBar.stop();
};
