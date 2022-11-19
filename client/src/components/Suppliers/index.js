import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

import Table from '../Table';
import { getSuppliers } from '../../api/suppliers';
import { openModalStack } from '../../redux/alert/alertSlice';
import PageTop from '../PageTop';
import TableData from './tableData';

const HEADERS = [
  'Company name',
  'Phone',
  'Email',
  'Address',
  'Province',
  'Product',
]

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSuppliers();
      setSuppliers(response.data)
    }
    fetchData();
  }, []);

  const onClick = () => {
    dispatch(
      openModalStack({
        type: 'suppliers',
        title: 'Create Suppler',
      })
    )
  }

  if (!suppliers.length)
    return (
      <PageTop
        heading='No Suppliers'
        description='Create a new supplier'
        btnOnClick={onClick}
        btnLabel='Add Supplier'
      />)

  const tableData = <TableData data={suppliers} />

  return (
    <div>
      <PageTop
        heading='My suppliers'
        description='Manage your suppliers here.'
        btnOnClick={onClick}
        btnLabel='Add supplier'
      />
      <Table
        headers={HEADERS}
        data={tableData}
      />
    </div>
  );
};

export default Suppliers;
