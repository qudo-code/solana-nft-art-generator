import figlet from "figlet";
import chalk from "chalk";

export default (msg:string) => {
    // eslint-disable-next-line no-console
    console.log(
        chalk.red(
            figlet.textSync("Error", { horizontalLayout : "full" })
        )
    );

    // eslint-disable-next-line no-console
    console.log(`🚨 ${msg}`);

    // eslint-disable-next-line no-console
    console.log(chalk.blue("\n🌐 Visit https://matr.world/art for help.\n\n\n"));
    
    throw new Error();
};
