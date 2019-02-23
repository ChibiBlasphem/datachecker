import anyChecker from '../../src/checkers/any'

describe('Any', () => {
  it('Should return "any" as name', () => {
    const checker = anyChecker()
    expect(checker.name).toBe('any')
  })

  it('Should return true for any non null value', () => {
    const checker = anyChecker()
    const testValues = [1, true, () => {}, new Date(), [], {}]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toBe(true)
    }
  })

  it('Should validate undefined if !isRequired', () => {
    const checker = anyChecker()
    expect(checker.check(undefined)).toBe(true)
  })

  it('Should not validate undefined if isRequired', () => {
    const checker = anyChecker().isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined },
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = anyChecker()
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = anyChecker().isNullable
    expect(checker.check(null)).toBe(true)
  })
})