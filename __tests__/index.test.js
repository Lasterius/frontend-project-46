import fs from 'fs';
import { fileURLToPath } from 'node:url';
import path from 'path';
import getFilesDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const extensions = [
  ['json', 'json', undefined, 'file1-file2.stylish'],
  ['yaml', 'yaml', undefined, 'file1-file2.stylish'],
  ['json', 'yaml', undefined, 'file1-file2.stylish'],

  ['json', 'json', 'stylish', 'file1-file2.stylish'],
  ['yaml', 'yaml', 'stylish', 'file1-file2.stylish'],
  ['json', 'yaml', 'stylish', 'file1-file2.stylish'],

  ['json', 'json', 'plain', 'file1-file2.plain'],
  ['yaml', 'yaml', 'plain', 'file1-file2.plain'],
  ['json', 'yaml', 'plain', 'file1-file2.plain'],

  ['json', 'json', 'json', 'file1-file2.json'],
  ['yaml', 'yaml', 'json', 'file1-file2.json'],
  ['json', 'yaml', 'json', 'file1-file2.json'],
];

test.each(extensions)(
  'Diff test (%s, %s, %s)',
  (file1Extension, file2Extension, format, resultFile) => {
    const filepath1 = getFixturePath(`file1.${file1Extension}`);
    const filepath2 = getFixturePath(`file2.${file2Extension}`);
    const result = readFile(resultFile);
    expect(getFilesDiff(filepath1, filepath2, format)).toEqual(result);
  },
);
