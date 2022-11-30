import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Table from '../../Table';
import { ALERT } from '../../../redux/constants'
import { getPurchases, deletePurchase } from '../../../api/purchases';
import { createAlert } from '../../../redux/alert/alertSlice'
import { openModalStack } from '../../../redux/alert/alertSlice';
import { initializePurchases } from '../../../redux/records/recordsSlice';
import PageTop from '../../PageTop';
import TableData from './tableData';

const HEADERS = [
  'No',
  'Supplier ID',
  'Date',
  'Total products',
  'Total price',
]

const Purchases = () => {
  const [data, setData] = useState([]);
  const { purchases } = useSelector(state => state.records)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPurchases();
      setData(response.data)
      dispatch(initializePurchases(response.data))
    }
    fetchData();
  }, []);

  const onClick = () => {
    dispatch(
      openModalStack({
        type: 'purchases',
        title: 'Create Purchases',
      })
    )
  }

  const handleOnDelete = (id) => {
    deletePurchase(id)
    const newPurchases = purchases.filter(purchase => purchase.id !== id)
    dispatch(initializePurchases(newPurchases))
    setTimeout(() => {
      dispatch(
        createAlert({
          title: 'Success',
          message: 'Purchase deleted successfully',
          type: ALERT.SUCCESS
        })
      )
    }, 2000)
  }

  if (!purchases?.length)
    return (
      <PageTop
        heading='No purchases'
        description='Create a new purchase'
        btnOnClick={onClick}
        btnLabel='Add purchase'
      />)

  const tableData = <TableData data={purchases} onClickRemove={handleOnDelete} />

  return (
    <div>
      <PageTop
        heading='My purchases'
        description='Manage your purchases here.'
        btnOnClick={onClick}
        btnLabel='Add purchase'
      />
      <Table
        headers={HEADERS}
        data={tableData}
      />
    </div>
  );
};

export default Purchases;
