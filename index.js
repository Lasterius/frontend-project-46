import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import getFormatter from './src/formatters/index.js';
import genDiff from './src/index.js';
import getParser from './src/parsers.js';

const getFile = (filePath) => {
  const absolutePathFile = path.resolve(process.cwd(), filePath);
  return readFileSync(absolutePathFile, 'utf-8');
};

export default function getFilesDiff(filePath1, filePath2, formatName = 'stylish') {
  const file1 = getFile(filePath1);
  const file2 = getFile(filePath2);

  const fileFormat1 = path.extname(filePath1).substring(1);
  const fileFormat2 = path.extname(filePath2).substring(1);

  const obj1 = getParser(file1, fileFormat1);
  const obj2 = getParser(file2, fileFormat2);

  const data = genDiff(obj1, obj2);
  return getFormatter(data, formatName);
}
