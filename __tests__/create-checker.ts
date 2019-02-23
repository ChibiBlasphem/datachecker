import { createChecker, Checker } from '../src/create-checker'

const predicate = (checker: Checker<any>, value: any) => {
  return typeof value === 'number' && value > 5
}
const optionsWithNoDescription = { name: 'custom checker' }
const optionsWithStrDescription = { name: 'custom checker', description: 'base description' }
const optionsWithFnDescription = { name: 'custom checker', description: instanceDescription => `|${instanceDescription}|` }

describe('Checker', () => {
  describe('createChecker', () => {
    it('Should return a checker', () => {
      const checker = createChecker(predicate, optionsWithStrDescription)
      
      expect(checker.$$typeof).toBe('checker')
      expect(checker.name).toBe('custom checker')
      expect(checker.required).toBe(false)
      expect(checker.nullable).toBe(false)
      expect(checker.description).toBe('base description')
      expect(checker.options).toEqual(optionsWithStrDescription)
    })
  })

  describe('createChecker.setDescription', () => {
    it('Should add a description for only one instance', () => {
      const checkerWithDescription = createChecker(predicate, optionsWithStrDescription)
      const checker = createChecker(predicate, optionsWithStrDescription)

      checkerWithDescription.setDescription('instance description')
      expect(checkerWithDescription.description).not.toBe(checker.description)
    })

    it('Should return instance description if no base description exists', () => {
      const checker = createChecker(predicate, optionsWithNoDescription)
      
      expect(checker.description).toBe('')
      checker.setDescription('instance description')
      expect(checker.description).toBe('instance description')
      checker.setDescription(checker => checker.name)
      expect(checker.description).toBe(optionsWithNoDescription.name)
    })

    it('Should return concatenated base & instance description if base description is a string', () => {
      const checker = createChecker(predicate, optionsWithStrDescription)
      
      expect(checker.description).toBe(`${optionsWithStrDescription.description}`)
      checker.setDescription('instance description')
      expect(checker.description).toBe(`${optionsWithStrDescription.description}\ninstance description`)
      checker.setDescription(checker => checker.name)
      expect(checker.description).toBe(`${optionsWithStrDescription.description}\n${optionsWithStrDescription.name}`)
    })

    it('Should return composed base & instance description if base description is a function', () => {
      const checker = createChecker(predicate, optionsWithFnDescription)
      
      expect(checker.description).toBe('||')
      checker.setDescription('instance description')
      expect(checker.description).toBe(`|instance description|`)
      checker.setDescription(checker => checker.name)
      expect(checker.description).toBe(`|${optionsWithStrDescription.name}|`)
    })
  })

  describe('checker.check', () => {
    it('Should return true when check is valid', () => {
      const checker = createChecker(predicate, optionsWithStrDescription)

      expect(checker.check(6)).toBe(true)
    })

    it('Should return an array of errors when check is not valid', () => {
      const checker = createChecker(predicate, optionsWithStrDescription)

      const valueToCheck = 5
      const checkResults = checker.check(valueToCheck)
      expect(checkResults).toBeInstanceOf(Array)
      expect(checkResults).toHaveLength(1)

      const error = checkResults[0]
      expect(error).toHaveProperty('key', '')
      expect(error).toHaveProperty('value', valueToCheck)
      expect(error).toHaveProperty('checker', checker)
      expect(typeof error.message).toBe('string')
    })
  })

  describe('checker.isRequired', () => {
    it('Should set the required field to true', () => {
      const checker = createChecker(predicate, optionsWithStrDescription)

      expect(checker.required).toBe(false)
      checker.isRequired
      expect(checker.required).toBe(true)
    })
  })

  describe('checker.isNullable', () => {
    it('Should set the required field to true', () => {
      const checker = createChecker(predicate, optionsWithStrDescription)

      expect(checker.nullable).toBe(false)
      checker.isNullable
      expect(checker.nullable).toBe(true)
      expect(checker.name).toBe('custom checker|null')
    })
  })
})