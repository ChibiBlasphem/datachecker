export function isObject(value: any): value is Object  {
  return value !== null && Object.prototype.toString.call(value) === '[object Object]'
}

export function isLiteralObject(value: any): value is Object {
  return isObject(value) && value.constructor.name === 'Object'
}