import functionChecker from '../../src/checkers/function'

describe('Function', () => {
  it('Should return "function" as name', () => {
    const checker = functionChecker()
    expect(checker.name).toBe('function')
  })

  it('Should return true if the data passed is a function', () => {
    const checker = functionChecker()
    expect(checker.check(() => {})).toBe(true)
  })
  
  it('Should return an array of errors if the data passed is not a string', () => {
    const checker = functionChecker()
    const testValues = [1, 'foo', true, new Date(), [], {}]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toEqual([
        { key: '', message: 'format', checker, value: testValues[i] }
      ])
    }
  })

  it('Should validate undefined if !isRequired', () => {
    const checker = functionChecker()
    expect(checker.check(undefined)).toBe(true)
  })

  it ('Should not validate undefined if isRequired', () => {
    const checker = functionChecker().isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined }
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = functionChecker()
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = functionChecker().isNullable
    expect(checker.check(null)).toBe(true)
  })
})