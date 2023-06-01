import yaml from 'js-yaml';

const getParser = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported type of format <${type}>`);
  }
};

export default getParser;
