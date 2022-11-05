import path from "path";

const cliProgress = require("cli-progress");

import { Metadata } from "../types";

import layerImages from "./layer-images";

const chalk = require("chalk");

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

export default async (projectDirectory:string, metadata:Map<string, Metadata>, images:Map<string, Array<string>>) => {
    const imageValues = Array.from(images.entries());

    const outDir = `${projectDirectory}/assets`;

    // eslint-disable-next-line no-console
    console.log(`\n\n🖼  Processing image files -> ${chalk.yellow(outDir)}`);

    progressBar.start(imageValues.length, 0);

    // TODO: For whatever reason, doing a Promise.all() can crash the program.
    // This is okay for now but await in a for loop isn't the best. Maybe look into chunking?
    for(const [ dna, imageLayers ] of imageValues) {
        const imageMetadata = metadata.get(dna);

        const outPath = path.join(projectDirectory, `assets/${imageMetadata.edition}.png`);

        progressBar.update(imageMetadata.edition + 1);
        
        // eslint-disable-next-line no-await-in-loop
        await layerImages(outPath, imageLayers);
    }

    progressBar.stop();
};
