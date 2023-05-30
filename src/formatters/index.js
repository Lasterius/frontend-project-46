import formatJson from './json.js';
import formatPlain from './plain.js';
import formatStylish from './stylish.js';

export default function getFormatter(data, formatName) {
  switch (formatName) {
    case 'json':
      return formatJson(data);
    case 'plain':
      return formatPlain(data);
    case 'stylish':
      return formatStylish(data);
    default:
      throw new Error(`Unsupported format <${formatName}>`);
  }
}
