import formatPlain from './plain.js';
import formatStylish from './stylish.js';

export default function getFormatter(data, type) {
  switch (type) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unsupported format <${type}>`);
  }
}
