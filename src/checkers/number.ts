import { toChecker, Predicate, CheckerDescription } from '../create-checker'

export default () => toChecker({
  predicate: ((checker, v) => typeof v === 'number') as Predicate<number>,
  options: {
    name: 'number'
  }
})