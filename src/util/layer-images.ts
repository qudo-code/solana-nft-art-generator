// An image layering util that works well when all images are the same size.
// Used on https://www.qudo.site/app/grapeface.
// Uses a canvas to layer images returning the data URL of the final image.
import { createCanvas, loadImage } from "canvas";

import {
    writeFile,
} from "fs-extra";

export default async (outPath:string, imgUrls:Array<string>, size = 2048) => {
    try {
        const canvas = createCanvas(size, size);
    
        const canvasContext = canvas.getContext("2d");

        // It's important to set this BEFORE images have been loaded.
        canvas.width = size;
        canvas.height = size;
    
        await Promise.all(imgUrls.map(async (src) => {
            const loaded = await loadImage(src);

            canvasContext.drawImage(loaded, 0, 0, canvas.width, size);
        }));
    
        const imageBuffer = canvas.toBuffer("image/png");

        await writeFile(outPath, imageBuffer);
    } catch(error) {
        // eslint-disable-next-line no-console
        console.log({ imgUrls });
        // eslint-disable-next-line no-console
        console.log(error);
    }
};
