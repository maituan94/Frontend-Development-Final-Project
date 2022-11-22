import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

import Table from '../Table';
import { getCustomers } from '../../api/customers';
import { openModalStack } from '../../redux/alert/alertSlice';
import PageTop from '../PageTop';
import TableData from './tableData';

const HEADERS = [
  'Customer ID',
  'First Name',
  'Last Name',
  'Gender',
  'Phone',
  'Email',
  'Home number',
  'Address',
  'State',
  'DOB'
]

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCustomers();
      setCustomers(response.data)
    }
    fetchData();
  }, []);

  const onClick = () => {
    dispatch(
      openModalStack({
        type: 'customers',
        title: 'Create Customers',
      })
    )
  }

  if (!customers.length)
    return (
      <PageTop
        heading='No customers'
        description='Create a new customer'
        btnOnClick={onClick}
        btnLabel='Add customer'
      />)

  const tableData = <TableData data={customers} />

  return (
    <div>
      <PageTop
        heading='My customers'
        description='Manage your customers here.'
        btnOnClick={onClick}
        btnLabel='Add customer'
      />
      <Table
        headers={HEADERS}
        data={tableData}
      />
    </div>
  );
};

export default Customers;
