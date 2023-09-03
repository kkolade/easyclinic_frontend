// Function to recursively convert camelCase keys to snake_case
const camelToSnakeCase = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(camelToSnakeCase);
  }

  const snakeCaseObj = {};

  Object.keys(obj).forEach((key) => {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    snakeCaseObj[snakeKey] = camelToSnakeCase(obj[key]);
  });

  return snakeCaseObj;
};

export default camelToSnakeCase;
