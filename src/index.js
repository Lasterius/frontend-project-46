import getFormatter from './formatters/index.js';
import { genDiff } from './gen-diff.js';
import parse from './parsers.js';

export default function getFilesDiff(filePath1, filePath2, formatName = 'stylish') {
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  const formatter = getFormatter(formatName);
  const data = genDiff(obj1, obj2);
  return formatter(data);
}
