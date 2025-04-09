import {EXPENSE_CATEGORY_LIST,EXPENSE_TYPE_LIST ,EXPENSE_CATEGORY_TYPE} from '../../../../../services/constants'
import {getIdByLabel} from '../../../../../services/helperFunctions';
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reducHooks";
import { deleteCashExpensesDataById } from "../../../../../redux/action/cashExpenses.action";
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import moment from 'moment';
export const CashExpensesList = ({cashExpensesListData=[],onEdit=()=>{},}) => {
  const dispatch = useAppDispatch();


  const handleDeleteExpence=(id)=>{
     Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteCashExpensesDataById(id));
          }
        });
  }
  return (
    <div class="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> S.no </th>
                    <th> Date </th>
                    <th> Expense Type </th>
                    <th> Expense Name </th>
                    <th> Spend to </th>
                    <th>Amount </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {cashExpensesListData?.map((expenses,i)=>
                  <tr key={expenses?.id}>
                    <td>{i+1}</td>
                  <td>{moment(expenses?.date).format('DD MMM YYYY')}</td>
                  <td>{getIdByLabel(EXPENSE_TYPE_LIST,expenses?.type)}</td>
                  <td>{getIdByLabel(EXPENSE_CATEGORY_LIST,expenses?.category)}</td>
                  {EXPENSE_CATEGORY_TYPE.DIGITAL_MARKTING === expenses?.category &&  <td>{expenses?.agencyName}</td>}
                  {EXPENSE_CATEGORY_TYPE.META_ADS === expenses?.category &&  <td>{expenses?.metaAdsAcountName}</td>}
                  {EXPENSE_CATEGORY_TYPE.MOBILE_RECHARGE === expenses?.category &&  <td>{expenses?.rechargeNumber}</td>}
                  <td>{expenses?.amount}</td>
                  <td>{expenses?.desc}</td>
                  <td>
                  <button
                            type="button"
                            className="btn btn-outline-success btn-icon me-2"
                            onClick={() => onEdit(expenses)}
                          >
                            <i className="mdi mdi-pencil-outline"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger  btn-icon"
                            onClick={() => handleDeleteExpence(expenses?.id)}
                          >
                            <i className="mdi mdi-delete-outline"></i>
                          </button>
                  </td>
                </tr>
                  )}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
