import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Table from '../Table';
import { ALERT } from '../../redux/constants'
import { getCustomers, deleteCustomer } from '../../api/customers';
import { createAlert } from '../../redux/alert/alertSlice'
import { openModalStack } from '../../redux/alert/alertSlice';
import { initializeCustomers } from '../../redux/records/recordsSlice';
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
  'Actions',
]

const Customers = () => {
  const [data, setData] = useState([]);
  const { customers } = useSelector(state => state.records)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCustomers();
      setData(response.data)
      dispatch(initializeCustomers(response.data))
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

  const handleOnDelete = (id) => {
    deleteCustomer(id)
    const newCustomers = customers.filter(customer => customer.id !== id)
    dispatch(initializeCustomers(newCustomers))
    setTimeout(() => {
      dispatch(
        createAlert({
          title: 'Success',
          message: 'Customer deleted successfully',
          type: ALERT.SUCCESS
        })
      )
    }, 2000)
  }

  if (!customers?.length)
    return (
      <PageTop
        heading='No customers'
        description='Create a new customer'
        btnOnClick={onClick}
        btnLabel='Add customer'
      />)

  const tableData = <TableData data={customers} onClickRemove={handleOnDelete} />

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
