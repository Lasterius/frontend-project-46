import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getFilesDiff from '../src/index.js';

const jsonFilename1 = 'file1.json';
const jsonFilename2 = 'file2.json';
const yamlFilename1 = 'file1.yaml';
const yamlFilename2 = 'file2.yaml';
const stylishDiffFilename = 'file1-file2.stylish';
const plainDiffFilename = 'file1-file2.plain';
const jsonDiffFilename = 'file1-file2.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getFilesDiff "stylish" testing', () => {
  const formatName = 'stylish';
  const diffFile = readFile(stylishDiffFilename);
  expect(getFilesDiff(getFixturePath(jsonFilename1), getFixturePath(yamlFilename2)))
    .toMatch(diffFile);
  expect(
    getFilesDiff(getFixturePath(yamlFilename1), getFixturePath(jsonFilename2), formatName),
  )
    .toMatch(diffFile);
});

test('getFilesDiff "plain" testing', () => {
  const formatName = 'plain';
  const diffFile = readFile(plainDiffFilename);
  expect(
    getFilesDiff(getFixturePath(jsonFilename1), getFixturePath(yamlFilename2), formatName),
  )
    .toMatch(diffFile);
  expect(
    getFilesDiff(getFixturePath(yamlFilename1), getFixturePath(jsonFilename2), formatName),
  )
    .toMatch(diffFile);
});

test('getFilesDiff "json" testing', () => {
  const formatName = 'json';
  const expectedObj = JSON.parse(readFile(jsonDiffFilename));
  const actualObj1 = JSON.parse(
    getFilesDiff(getFixturePath(jsonFilename1), getFixturePath(yamlFilename2), formatName),
  );
  const actualObj2 = JSON.parse(
    getFilesDiff(getFixturePath(yamlFilename1), getFixturePath(jsonFilename2), formatName),
  );
  expect(expectedObj).toEqual(actualObj1);
  expect(expectedObj).toEqual(actualObj2);
});
