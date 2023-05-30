import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isNull(value)) {
    return 'null';
  }
  return value;
};

export default function formatPlain(data, key = []) {
  _.compact(
    data.map((elem) => {
      const keysProperty = `${[...key, elem.name].join('.')}`;
      switch (elem.state) {
        case 'nested':
          return formatPlain(elem.children, [...key, elem.name]);
        case 'added':
          return `Property '${keysProperty}' was added with value: ${stringify(elem.value)}`;
        case 'deleted':
          return `Property '${keysProperty}' was removed`;
        case 'changed':
          return `Property '${keysProperty}' was updated. From ${stringify(
            elem.previousValue,
          )} to ${stringify(elem.currentValue)}`;
        default:
          return '';
      }
    }),
  ).join('\n');
}
