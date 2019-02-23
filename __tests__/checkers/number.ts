import numberChecker from '../../src/checkers/number'

describe('Number', () => {
  it('Should return "number" as name', () => {
    const checker = numberChecker()
    expect(checker.name).toBe('number')
  })

  it('Should return true if the data passed is a number', () => {
    const checker = numberChecker()
    expect(checker.check(1)).toBe(true)
  })
  
  it('Should return an array of errors if the data passed is not a number', () => {
    const checker = numberChecker()
    const testValues = ['test', true, () => {}, new Date(), [], {}]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toEqual([
        { key: '', message: 'format', checker, value: testValues[i] }
      ])
    }
  })

  it('Should validate undefined if !isRequired', () => {
    const checker = numberChecker()
    expect(checker.check(undefined)).toBe(true)
  })

  it ('Should not validate undefined if isRequired', () => {
    const checker = numberChecker().isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined }
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = numberChecker()
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = numberChecker().isNullable
    expect(checker.check(null)).toBe(true)
  })
})