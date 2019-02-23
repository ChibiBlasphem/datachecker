import booleanChecker from '../../src/checkers/boolean'

describe('Boolean', () => {
  it('Should return "boolean" as name', () => {
    const checker = booleanChecker()
    expect(checker.name).toBe('boolean')
  })

  it('Should return true if the data passed is a boolean', () => {
    const checker = booleanChecker()
    expect(checker.check(true)).toBe(true)
    expect(checker.check(false)).toBe(true)
  })

  it('Should return an array of errors if the data passed is not a boolean', () => {
    const checker = booleanChecker()
    const testValues = [1, 'foo', () => {}, new Date(), [], {}]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toEqual([
        { key: '', message: 'format', checker, value: testValues[i] }
      ])
    }
  })

  it('Should validate undefined if !isRequired', () => {
    const checker = booleanChecker()
    expect(checker.check(undefined)).toBe(true)
  })

  it ('Should not validate undefined if isRequired', () => {
    const checker = booleanChecker().isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined }
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = booleanChecker()
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = booleanChecker().isNullable
    expect(checker.check(null)).toBe(true)
  })
})