export const signInElements = [
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
    type: 'text',
    placeholder: 'Supplier Id'
  },
  {
    name: 'purchasePrice',
    type: 'text',
    placeholder: 'Purchase Price'
  },
  {
    name: 'salePrice',
    type: 'text',
    placeholder: 'Sales Price'
  },
  {
    name: 'imageUrl',
    type: 'text',
    placeholder: 'https://via.placeholder.com/150'
  },
  {
    name: 'description',
    type: 'text',
    placeholder: 'Product Description'
  },
]
