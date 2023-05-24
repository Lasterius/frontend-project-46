import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { fileURLToPath } from 'url';
import getFilesDiff from '../index.js';

const jsonFileName1 = 'file3.json';
const jsonFileName2 = 'file4.json';
const yamlFileName1 = 'file3.yaml';
const yamlFileName2 = 'file4.yaml';
const stylishFileName = 'file3.file4.stylish';
const plainFileName = 'file3.file4.plain';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const writeFile = (filename, data) => fs.writeFileSync(getFixturePath(filename), data, 'utf-8');

beforeAll(() => {
  const obj1 = JSON.parse(readFile(jsonFileName1));
  writeFile(yamlFileName1, yaml.dump(obj1));
  const obj2 = JSON.parse(readFile(jsonFileName2));
  writeFile(yamlFileName2, yaml.dump(obj2));
});

test('getFilesDiff "stylish" testing', () => {
  const formatName = 'stylish';
  const diffFile = readFile(stylishFileName);
  expect(getFilesDiff(getFixturePath(jsonFileName1), getFixturePath(yamlFileName2))).toMatch(
    diffFile
  );
  expect(
    getFilesDiff(getFixturePath(yamlFileName1), getFixturePath(jsonFileName2), formatName)
  ).toMatch(diffFile);
});

test('getFilesDiff "plain" testing', () => {
  const formatName = 'plain';
  const diffFile = readFile(plainFileName);
  expect(
    getFilesDiff(getFixturePath(jsonFileName1), getFixturePath(yamlFileName2), formatName)
  ).toMatch(diffFile);
  expect(
    getFilesDiff(getFixturePath(yamlFileName1), getFixturePath(jsonFileName2), formatName)
  ).toMatch(diffFile);
});
