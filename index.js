import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import getFormatter from './src/formatters/index.js';
import genDiff from './src/index.js';
import getParser from './src/parsers.js';

const getData = (filePath) => readFileSync(path.resolve(process.cwd(), '__fixtures__', filePath));
const getType = (filePath) => path.extname(filePath).slice(1);

const getFilesDiff = (filePath1, filePath2, type = 'stylish') => {
  const data1 = getParser(getData(filePath1), getType(filePath1));
  const data2 = getParser(getData(filePath2), getType(filePath2));

  const result = genDiff(data1, data2);
  return getFormatter(result, type);
};

export default getFilesDiff;
