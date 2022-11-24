import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Table from '../Table';
import { ALERT } from '../../redux/constants'
import { getProducts, deleteProduct } from '../../api/products';
import { createAlert } from '../../redux/alert/alertSlice'
import { openModalStack } from '../../redux/alert/alertSlice';
import PageTop from '../PageTop';
import TableData from './tableData';
import { initializeProducts } from '../../redux/records/recordsSlice';

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
  const [data, setData] = useState([]);
  const { products } = useSelector(state => state.records)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setData(response.data)
      dispatch(initializeProducts(response.data))
    }
    fetchData();
  }, []);

  const onClick = () => {
    dispatch(
      openModalStack({
        type: 'products',
        title: 'Create Product',
        id: 'addProduct'
      })
    )
  }

  const handleOnDelete = (id) => {
    deleteProduct(id)
    const newProducts = products.filter(product => product.id !== id)
    dispatch(initializeProducts(newProducts))
    setTimeout(() => {
      dispatch(
        createAlert({
          title: 'Success',
          message: 'Product deleted successfully',
          type: ALERT.SUCCESS
        })
      )
    }, 2000)
  }

  if (!products.length)
    return (
      <PageTop
        heading='No Products'
        description='Create a new product'
        btnOnClick={onClick}
        btnLabel='Add Product'
      />)

  const tableData = <TableData data={products || []} onClickRemove={handleOnDelete} />

  return (
    <>
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
    </>
  );
};

export default Products;
