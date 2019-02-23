import { default as string } from './string'
import { default as number } from './number'
import { default as boolean } from './boolean'
import { default as fn } from './function'
import { default as any } from './any'
import { default as oneof } from './oneof'
import { default as iof } from './instanceof'
import { default as array } from './array'
import { default as shape } from './shape'
import { default as dictionary } from './dictionary'

export default {
  string,
  number,
  boolean,
  function: fn,
  any,
  oneof,
  instanceof: iof,
  array,
  shape,
  dictionary,
}