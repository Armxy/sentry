import { bootOperator } from "./commands/operator-runtime.js";
import meow from 'meow';
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

const configLocation = './config.json';
let configFile: Object;

try {
    if (fs.existsSync(configLocation)) {
        configFile = JSON.parse(fs.readFileSync(configLocation, 'utf-8'));
    }
} catch (err) {
    console.error(err)
}

program
    .version("1.0.80")
    .name('xai-cli')
    .description('Alternate version of XAI CLI')
    .version(process.env.npm_package_version as string);

program.command('boot-operator')
    .description('Boot XAI operator.')
    .option('-p, --privatekey <char>', 'Operator private key.')
    .action((str, options) => {

        /*console.log('str', str);
        console.log('options', options);
        console.log('configFile', configFile);*/

        let config = {
            ...configFile,
            ...str
        }

        if (config.hasOwnProperty('privatekey')) {

            bootOperator(config.privatekey as string);
        }
    });

program.parse();