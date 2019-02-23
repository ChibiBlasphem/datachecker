import instanceofChecker from '../../src/checkers/instanceof'

class Dummy {}

describe('InstanceOf', () => {
  it('Should return "Class.name" as name', () => {
    const checker = instanceofChecker(Dummy)
    expect(checker.name).toBe('Dummy')
  })

  it('Should return true if the data passed is a string', () => {
    const checker = instanceofChecker(Dummy)
    expect(checker.check(new Dummy())).toBe(true)
  })
  
  it('Should return an array of errors if the data passed is not a string', () => {
    const checker = instanceofChecker(Dummy)
    const testValues = [1, true, () => {}, new Date(), [], {}]
    
    for (let i = 0, l = testValues.length; i < l; ++i) {
      expect(checker.check(testValues[i])).toEqual([
        { key: '', message: 'format', checker, value: testValues[i] }
      ])
    }
  })

  it('Should validate undefined if !isRequired', () => {
    const checker = instanceofChecker(Dummy)
    expect(checker.check(undefined)).toBe(true)
  })

  it ('Should not validate undefined if isRequired', () => {
    const checker = instanceofChecker(Dummy).isRequired
    expect(checker.check(undefined)).toEqual([
      { key: '', message: 'required', checker, value: undefined }
    ])
  })

  it('Should not validate null value if !isNullable', () => {
    const checker = instanceofChecker(Dummy)
    expect(checker.check(null)).toEqual([
      { key: '', message: 'non_nullable', checker, value: null },
    ])
  })
  
  it('Should validate null value if isNullable', () => {
    const checker = instanceofChecker(Dummy).isNullable
    expect(checker.check(null)).toBe(true)
  })
})