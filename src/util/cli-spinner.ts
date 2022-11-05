const chalk = require("chalk");
const { Spinner } = require("cli-spinner");

export default (text:string) => {
    const spinner = new Spinner({
        text   : `${chalk.green(`${text}...`)} %s`,
        stream : process.stderr,
    });
    
    spinner.setSpinnerString("|/-\\");

    spinner.start();

    return {
        stop : () => {
            spinner.stop();

            // Adding this preserves the previous spinner.
            // Otherwise it's cleared.
            // eslint-disable-next-line no-console
            console.log("\n");
        },
    };
};
