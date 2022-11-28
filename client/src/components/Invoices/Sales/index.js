import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Table from '../../Table';
import { ALERT } from '../../../redux/constants'
import { getSales, deleteSale } from '../../../api/sales';
import { createAlert } from '../../../redux/alert/alertSlice'
import { openModalStack } from '../../../redux/alert/alertSlice';
import { initializeSales } from '../../../redux/records/recordsSlice';
import PageTop from '../../PageTop';
import TableData from './tableData';

const HEADERS = [
  'Supplier ID',
  'Date',
  'Orders',
  'Total items',
  'Price per unit',
  'Price total'
]

const Sales = () => {
  const [data, setData] = useState([]);
  const { Sales } = useSelector(state => state.records)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSales();
      setData(response.data)
      dispatch(initializeSales(response.data))
    }
    fetchData();
  }, []);

  const onClick = () => {
    dispatch(
      openModalStack({
        type: 'sales',
        title: 'Create Sales',
      })
    )
  }

  const handleOnDelete = (id) => {
    deleteSale(id)
    const newSales = Sales.filter(Sale => Sale.id !== id)
    dispatch(initializeSales(newSales))
    setTimeout(() => {
      dispatch(
        createAlert({
          title: 'Success',
          message: 'Sale deleted successfully',
          type: ALERT.SUCCESS
        })
      )
    }, 2000)
  }

  if (!Sales?.length)
    return (
      <PageTop
        heading='No Sales'
        description='Create a new Sale'
        btnOnClick={onClick}
        btnLabel='Add Sale'
      />)

  const tableData = <TableData data={Sales} onClickRemove={handleOnDelete} />

  return (
    <div>
      <PageTop
        heading='My sales'
        description='Manage your sales here.'
        btnOnClick={onClick}
        btnLabel='Add sale'
      />
      <Table
        headers={HEADERS}
        data={tableData}
      />
    </div>
  );
};

export default Sales;
