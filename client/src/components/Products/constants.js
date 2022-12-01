export const createProductElements = [
  {
    name: 'productName',
    rules: {
      required: { value: true, message: 'Product Name is empty' },
      pattern: {
        value: /^[A-Za-z][A-Za-z0-9 ]+$/,
        message: 'Email is invalid'
      }
    },
    type: 'text',
    placeholder: 'Product Name'
  },
  {
    name: 'supplierId',
    type: 'dropdown',
    placeholder: 'Select Supplier'
  },
  {
    name: 'purchasePrice',
    rules: {
      required: { value: true, message: 'Purchase price cannot be empty' },
    },
    type: 'number',
    placeholder: 'Purchase Price'
  },
  {
    name: 'salePrice',
    rules: {
      required: { value: true, message: 'Sale price cannot be empty' },
    },
    type: 'number',
    placeholder: 'Sales Price'
  },
  {
    name: 'imageUrl',
    rules: {
      required: { value: true, message: 'Image URL required' },
    },
    type: 'text',
    placeholder: 'https://via.placeholder.com/150'
  },
  {
    name: 'description',
    rules: {
      required: { value: true, message: 'Product needs a description' },
    },
    type: 'text',
    placeholder: 'Product Description'
  },
]
