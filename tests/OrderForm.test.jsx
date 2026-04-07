import { validate } from '../src/pages/CustomOrder'

describe('Custom Order form validation', () => {
  const baseForm = {
    name: 'Ana',
    email: 'ana@test.com',
    pieceType: 'Ring',
    material: 'Resin only',
    colorInspiration: '',
    description: 'I want a lily resin ring in gold and cream colors.',
  }

  test('returns no errors for a valid form', () => {
    const errors = validate(baseForm)
    expect(Object.keys(errors)).toHaveLength(0)
  })

  test('shows error when name is empty', () => {
    const errors = validate({ ...baseForm, name: '' })
    expect(errors.name).toMatch(/name is required/i)
  })

  test('shows error when name is only whitespace', () => {
    const errors = validate({ ...baseForm, name: '   ' })
    expect(errors.name).toMatch(/name is required/i)
  })

  test('shows error when email is invalid', () => {
    const errors = validate({ ...baseForm, email: 'notanemail' })
    expect(errors.email).toMatch(/valid email/i)
  })

  test('shows error when email is empty', () => {
    const errors = validate({ ...baseForm, email: '' })
    expect(errors.email).toMatch(/valid email/i)
  })

  test('shows error when description is too short', () => {
    const errors = validate({ ...baseForm, description: 'short' })
    expect(errors.description).toMatch(/at least 20 characters/i)
  })

  test('shows error when description is empty', () => {
    const errors = validate({ ...baseForm, description: '' })
    expect(errors.description).toMatch(/at least 20 characters/i)
  })

  test('accepts description with exactly 20 characters', () => {
    const errors = validate({ ...baseForm, description: '12345678901234567890' })
    expect(errors.description).toBeUndefined()
  })
})
