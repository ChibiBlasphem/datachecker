import { toChecker, Predicate } from '../create-checker'

export default (Class: Function) => toChecker({
  predicate: ((checker, v) => v instanceof Class) as Predicate<typeof Class>,
  options: {
    name: Class.name,
  }
})