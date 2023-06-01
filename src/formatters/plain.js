import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (tree) => {
  const iter = (node, path) => {
    const lines = node.flatMap((diff) => {
      const keysProperty = path === '' ? `${diff.key}` : `${path}.${diff.key}`;

      switch (diff.type) {
        case 'nested':
          return iter(diff.children, keysProperty);
        case 'added':
          return `Property '${keysProperty}' was added with value: ${stringify(diff.value2)}`;
        case 'deleted':
          return `Property '${keysProperty}' was removed`;
        case 'changed':
          return `Property '${keysProperty}' was updated. From ${stringify(
            diff.value1,
          )} to ${stringify(diff.value2)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type of diff: ${diff.type}`);
      }
    });

    return [...lines].join('\n');
  };

  return iter(tree, '');
};

export default formatPlain;
