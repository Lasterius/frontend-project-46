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
  .action((filepath1, filepath2, options) => {
    console.log(getFilesDiff(filepath1, filepath2, options.format));
  });

program.parse();
