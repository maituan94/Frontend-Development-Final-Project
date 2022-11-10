export const defaultSigninValue = {
  isSupplier: false,
  email: '',
  password: '',
}

export const signInElements = [
  {
    name: 'isSupplier',
    rules: {},
    type: 'toggle',
    label: {
      'false': 'Login as a customer',
      'true': 'Login as a supplier'
    }
  },
  {
    name: 'email',
    rules: {
      required: { value: true, message: 'Email is empty' },
      pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/, message: 'Email is invalid' }
    },
    type: 'text',
    placeholder: 'Email'
  },
  {
    name: 'password',
    rules: {
      required: { value: true, message: 'Password is empty' },
      pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message: 'Password must be at least 12 mix-characters of uppercase letter, number and special character' }
    },
    type: 'password',
    placeholder: 'Password'
  }
]
