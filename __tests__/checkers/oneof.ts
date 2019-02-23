import oneofChecker from '../../src/checkers/oneof'
import stringChecker from '../../src/checkers/string'
import numberChecker from '../../src/checkers/number'

describe('OneOf', () => {
  it('Should return "T1|T2" as name', () => {
    const checker = oneofChecker(stringChecker(), numberChecker())
    expect(checker.name).toBe('string|number')
  })

  it('Should throw when trying to create a Checker with invalid checker', () => {
    expect(() => oneofChecker('test' as any)).toThrowError('invalid checker')
  })
  
  it('Should return true if the data passed is either of specified types', () => {
    const checker = oneofChecker(stringChecker(), numberChecker())
    expect(checker.check('foo')).toBe(true)
    expect(checker.check(1)).toBe(true)
  })
  
  it('Should return an array of errors if the data passed is none of specified types', () => {
    const checker = oneofChecker(stringChecker(), numberChecker())
    const testValues = [true, () => {}, new Date(), [], {}]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toEqual([
        { key: '', message: 'format', checker, value: testValues[i] }
      ])
    }
  })
  
  it('Should validate undefined if !isRequired', () => {
    const checker = oneofChecker(stringChecker(), numberChecker())
    expect(checker.check(undefined)).toBe(true)
  })
  
  it ('Should not validate undefined if isRequired', () => {
    const checker = oneofChecker(stringChecker(), numberChecker()).isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined }
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = oneofChecker(stringChecker(), numberChecker())
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = oneofChecker(stringChecker(), numberChecker()).isNullable
    expect(checker.check(null)).toBe(true)
  })
})