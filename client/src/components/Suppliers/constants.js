export const createSupplierElements = [
    {
      name: 'companyName',
      rules: {
        required: { value: true, message: 'Company Name is empty' },
        pattern: {
          value: /^[A-Za-z][A-Za-z0-9 ]+$/,
          message: 'Company Name must be more than 2 characters and not start with number or special characters'
        }
      },
      type: 'text',
      placeholder: 'Company Name'
    },
    {
        name: 'phone',
        rules: {
          required: { value: true, message: 'Phone number is empty' },
          pattern: {
            value: /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/,
            message: 'Phone Number is not in the format +1(234)456-6789'
          }
        },
        type: 'text',
        placeholder: '+1(234)456-6789'
    },
    {
        name: 'email',
        rules: {
          required: { value: true, message: 'Email cannot be empty' },
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/,
            message: 'Email is not in the formal abcde@xyz.com'
          }
        },
        type: 'text',
        placeholder: 'abcde@xyz.com'
    },
    {
      name: 'address',
      type: 'text',
      placeholder: 'Home address'
    },
    {
      name: 'state',
      type: 'dropdown'
    },
    {
      name: 'password',
      rules: {
        required: { value: true, message: 'Password cannot be empty' },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          message: 'Password is not valid!'
        }
      },
      type: 'password',
      placeholder: 'Password'
    }
  ]
  