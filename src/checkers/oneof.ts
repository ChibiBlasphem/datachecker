import { toChecker, Predicate, Checker, isChecker } from '../create-checker'

export default (...typeCheckers: Checker<any, any>[]) => {
  if (!typeCheckers.every(isChecker)) {
    throw new Error('invalid checker')
  }
  
  return toChecker({
    predicate: ((checker, v) => {
      return typeCheckers.some(c => c.check(v) === true)
    }) as Predicate<any>,
    options: {
      name: () => typeCheckers.map(tc => tc.name).join('|'),
    },
  })
}