export function structMap<T>(map: T, method: CallableFunction, propagate: boolean = false): T {
  const outputMap: any = {};

  for (const [key, value] of Object.entries(map)) {
    if (typeof value === 'object' && value !== null && propagate && !Array.isArray(value)) {
      outputMap[method(key)] = structMap(value, method, propagate);
    } else if (Array.isArray(value)) {
      outputMap[method(key)] = value?.map(item => typeof item === 'object' ? structMap(item, method, propagate) : item);
    } else {
      outputMap[method(key)] = value;
    }
  }
  return outputMap;
}

export function snakeCaseToCamelCase(str: string): string {
  while (str.startsWith('_')) {
    str = str.slice(1);
  }
  return str.replace(/([-_]\w)/g, letter => letter[1].toUpperCase());
}

export function camelCaseToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
