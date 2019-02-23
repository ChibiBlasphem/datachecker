import shapeChecker from '../../src/checkers/shape'
import stringChecker from '../../src/checkers/string'

const shape = () => ({ foo: stringChecker() })

describe('Shape', () => {
  it('Should return "any" as name', () => {
    const checker = shapeChecker(shape())
    expect(checker.name).toBe('literal object')
  })

  it('Should return true if the data passed is a string', () => {
    const checker = shapeChecker(shape())
    expect(checker.check({ foo: 'bar' })).toBe(true)
  })
  
  it('Should return an array of errors if the data passed is not a string', () => {
    const checker = shapeChecker(shape())
    const testValues = [1, true, () => {}, new Date(), []]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toEqual([
        { key: '', message: 'format', checker, value: testValues[i] }
      ])
    }
  })

  it('Should validate undefined if !isRequired', () => {
    const checker = shapeChecker(shape())
    expect(checker.check(undefined)).toBe(true)
  })

  it ('Should not validate undefined if isRequired', () => {
    const checker = shapeChecker(shape()).isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined }
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = shapeChecker(shape())
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = shapeChecker(shape()).isNullable
    expect(checker.check(null)).toBe(true)
  })
})