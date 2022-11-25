import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Table from '../Table';
import { ALERT } from '../../redux/constants'
import { deleteSupplier, getSuppliers } from '../../api/suppliers';
import { createAlert } from '../../redux/alert/alertSlice'
import { openModalStack } from '../../redux/alert/alertSlice';
import PageTop from '../PageTop';
import TableData from './tableData';
import { initializeSuppliers } from '../../redux/records/recordsSlice';

const HEADERS = [
  'Supplier ID',
  'Company name',
  'Phone',
  'Email',
  'Address',
  //'Product',
  'Province',
  'Actions'
]

const Suppliers = () => {
  const [data, setData] = useState([]);
  const { suppliers } = useSelector(state => state.records)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSuppliers();
      setData(response.data)
      dispatch(initializeSuppliers(response.data))
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

  const handleOnDelete = (id) => {
    deleteSupplier(id)
    const newSuppliers = suppliers.filter(supplier => supplier.id !== id)
    dispatch(initializeSuppliers(newSuppliers))
    setTimeout(() => {
      dispatch(
        createAlert({
          title: 'Success',
          message: 'Supplier deleted successfully',
          type: ALERT.SUCCESS
        })
      )
    }, 2000)
  }

  if (!suppliers.length)
    return (
      <PageTop
        heading='No Suppliers'
        description='Create a new supplier'
        btnOnClick={onClick}
        btnLabel='Add Supplier'
      />)

  const tableData = <TableData data={suppliers} onClickRemove={handleOnDelete} />

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
