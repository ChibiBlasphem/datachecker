import arrayChecker from '../../src/checkers/array'
import stringChecker from '../../src/checkers/string'

describe('Array', () => {
  it('Should return "array<T>" as name', () => {
    const checker = arrayChecker(stringChecker())
    expect(checker.name).toBe('array<string>')
  })

  it('Should return true if the data passed is an array', () => {
    const checker = arrayChecker(stringChecker())
    expect(checker.check([])).toBe(true)
    expect(checker.check(['foo'])).toBe(true)
    expect(checker.check(['bar', 'baz'])).toBe(true)
  })

  it('Should return an array of errors if the data passed not an array', () => {
    const checker = arrayChecker(stringChecker())
    const testValues = [1, 'foo', true, () => {}, new Date(), {}]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toEqual([
        { key: '', message: 'format', checker, value: testValues[i] }
      ])
    }
  })

  it('Should validate undefined if !isRequired', () => {
    const checker = arrayChecker(stringChecker())
    expect(checker.check(undefined)).toBe(true)
  })
  
  it ('Should not validate undefined if isRequired', () => {
    const checker = arrayChecker(stringChecker()).isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined }
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = arrayChecker(stringChecker())
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = arrayChecker(stringChecker()).isNullable
    expect(checker.check(null)).toBe(true)
  })
})