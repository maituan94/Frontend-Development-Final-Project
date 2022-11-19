export const createCustomerElements = [
    {
      name: 'firstName',
      rules: {
        required: { value: true, message: 'First Name is empty' },
        pattern: {
          value: /^[A-Za-z][A-Za-z0-9 ]+$/,
          message: 'First Name must be more than 2 characters and not start with number or special characters'
        }
      },
      type: 'text',
      placeholder: 'First Name'
    },
    {
        name: 'lastName',
        rules: {
          required: { value: true, message: 'Last Name is empty' },
          pattern: {
            value: /^[A-Za-z][A-Za-z0-9 ]+$/,
            message: 'First Name must be more than 2 characters and not start with number or special characters'
          }
        },
        type: 'text',
        placeholder: 'Last Name'
    },
    {
        name: 'gender',
        rules: {
          required: { value: true, message: 'Must select a gender' },
        },
        type: 'radio',
        placeholder: ''
    },
    {
        name: "email",
        rules: {
          required: { value: true, message: "Email is empty" },
          pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/, message: "Email is invalid" }
        },
        type: "text",
        placeholder: "Email"
      },
    {
      name: 'homeNumber',
      type: 'text',
      placeholder: 'Home Number'
    },
    {
        name: 'address',
        type: 'text',
        placeholder: 'Home Address'
    },
    {
      name: 'state',
      type: 'dropdown'
    },
    {
      name: 'dateOfBirth',
      type: 'text',
      placeholder: 'Date of Birth'
    },
  ]
  