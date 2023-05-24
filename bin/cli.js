#!/usr/bin/env node

import { Command } from 'commander';
import getFilesDiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .configureHelp({ sortOptions: true });

program.action((filepath1, filepath2, options) => {
  console.log(`\n${getFilesDiff(filepath1, filepath2, options.format)}`);
});

function errorColor(str) {
  return `\x1b[31m${str}\x1b[0m`;
}

program.exitOverride();

try {
  program.parse(process.argv);
} catch (err) {
  if (err.exitCode === undefined) {
    console.log(errorColor(err.message));
    process.exit(1);
  }
  process.exit(err.exitCode);
}
