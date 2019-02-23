import dictionaryChecker from '../../src/checkers/dictionary'
import stringChecker from '../../src/checkers/string'

describe('Dictionary', () => {
  it('Should return "dictionary<T>" as name', () => {
    const checker = dictionaryChecker(stringChecker())
    expect(checker.name).toBe('dictionary<string>')
  })

  it('Should return true if the data passed is a dictionary', () => {
    const checker = dictionaryChecker(stringChecker())
    expect(checker.check({ foo: 'bar' })).toBe(true)
  })

  it('Should return an array of errors if the data passed is not a dictionary', () => {
    const checker = dictionaryChecker(stringChecker())
    const testValues = [1, true, () => {}, new Date(), []]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toEqual([
        { key: '', message: 'format', checker, value: testValues[i] }
      ])
    }
  })

  it('Should validate undefined if !isRequired', () => {
    const checker = dictionaryChecker(stringChecker())
    expect(checker.check(undefined)).toBe(true)
  })

  it ('Should not validate undefined if isRequired', () => {
    const checker = dictionaryChecker(stringChecker()).isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined }
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = dictionaryChecker(stringChecker())
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = dictionaryChecker(stringChecker()).isNullable
    expect(checker.check(null)).toBe(true)
  })
})