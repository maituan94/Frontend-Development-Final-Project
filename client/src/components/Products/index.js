import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

import Table from '../Table';
import { getProducts } from '../../api/products';
import { openModalStack } from '../../redux/alert/alertSlice';
import PageTop from '../PageTop';
import TableData from './tableData';

const HEADERS = [
  'Product ID',
  'Product name',
  'Supplier ID',
  'Buying Price',
  'Selling Price',
  'Image',
  'Description',
  'Actions',
]

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setProducts(response.data)
    }
    fetchData();
  }, []);

  const onClick = () => {
    dispatch(
      openModalStack({
        type: 'products',
        title: 'Create Product',
      })
    )
  }

  if (!products.length)
    return (
      <PageTop
        heading='No Products'
        description='Create a new product'
        btnOnClick={onClick}
        btnLabel='Add Product'
      />)

  const tableData = <TableData data={products || []} />

  return (
    <div>
      <PageTop
        heading='My products'
        description='Manage your products here.'
        btnOnClick={onClick}
        btnLabel='Add Product'
      />
      <Table
        headers={HEADERS}
        data={tableData}
      />
    </div>
  );
};

export default Products;
