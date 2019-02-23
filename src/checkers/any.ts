import { toChecker, Predicate, CheckerDescription } from '../create-checker'

export default () => toChecker({
  predicate: (() => true) as Predicate<any>,
  options: {
    name: 'any'
  }
})