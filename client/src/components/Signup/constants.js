export const defaultSignupValue = {
  isSupplier: false,
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: ''
}

export const signUpElements = (passwordRef) => [
  {
    name: "isSupplier",
    rules: {},
    type: "toggle",
    label: {
      "false": "Sign up as a customer",
      "true": "Sign up as a supplier"
    }
  },
  {
    name: "firstName",
    rules: {
      required: { value: true, message: "First name is empty" },
      pattern: { value: /^[A-Za-z][A-Za-z0-9 ]+$/, message: "First name must be at least 2 characters and not start with number or special characters" }
    },
    type: "text",
    placeholder: "First Name"
  },
  {
    name: "lastName",
    rules: {
      required: { value: true, message: "Last name is empty" },
      pattern: { value: /^[A-Za-z][A-Za-z0-9 ]+$/, message: "Last name must be at least 2 characters and not start with number or special characters" }
    },
    type: "text",
    placeholder: "Last Name"
  },
  {
    name: "companyName",
    rules: {},
    type: "text",
    placeholder: "Company Name"
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
    name: "phone",
    rules: {
      required: { value: true, message: "Phone is empty" },
      pattern: { value: /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/, message: "Invalid phone number. For example: +1(234)456-7777" }
    },
    type: "text",
    placeholder: "Phone number: +1(234)456-7777"
  },
  {
    name: "password",
    rules: {
      required: { value: true, message: "Password is empty" },
      pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message: "Password must be at least 8 mix-characters of uppercase letter, number and special character" }
    },
    type: "password",
    placeholder: "Password"
  },
  {
    name: "passwordConfirm",
    rules: {
      required: { value: true, message: "Confirm Password is empty" },
      pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message: "Confirm Password must be at least 8 mix-characters of uppercase letter, number and special character" },
      validate: value => {
        return value === passwordRef?.current || "The passwords do not match"
      }
    },
    type: "password",
    placeholder: "Password Confirm"
  },
]
