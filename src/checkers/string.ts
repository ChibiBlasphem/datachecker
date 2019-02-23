import { toChecker, Predicate, CheckerDescription } from '../create-checker'

export default () => toChecker({
  predicate: ((checker, v) => typeof v === 'string') as Predicate<string>,
  options: {
    name: 'string'
  }
})