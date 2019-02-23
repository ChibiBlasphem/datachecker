import { toChecker, Predicate, CheckerDescription } from '../create-checker'

export default () => toChecker({
  predicate: ((checker, v) => typeof v === 'function') as Predicate<Function>,
  options: {
    name: 'function'
  }
})