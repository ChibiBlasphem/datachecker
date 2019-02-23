import { toChecker, Predicate, CheckerDescription } from '../create-checker'

export default () => toChecker({
  predicate: ((checker, v) => typeof v === 'boolean') as Predicate<boolean>,
  options: {
    name: 'boolean'
  }
})