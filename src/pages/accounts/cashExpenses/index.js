import { CashExpensesList, CashExpensesForm } from "../../../components/pages";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { getAllCashExpenses } from "../../../redux/action/cashExpenses.action";
import { useState, useEffect, useMemo } from "react";

export const CashExpenses = () => {
  const dispatch = useAppDispatch();
  const cashExpensesSync = useAppSelector((state) => state.cashExpensesSync);
  const [editCashExpensesObject, setEditCashExpensesObject] = useState(null);
  const [isOpenCashExpensesForm, setIsOpenCashExpensesForm] = useState(false);

  useEffect(() => {
    // Fetch the list of cash expenses if not already fetched
    if (!cashExpensesSync?.cashExpensesListData.length) {
      dispatch(getAllCashExpenses());
    }
  }, [cashExpensesSync, dispatch]);

  // Calculate the total expenses using useMemo to memoize the result
  const totalExpense = useMemo(() => {
    if (cashExpensesSync?.cashExpensesListData?.length) {
      return cashExpensesSync.cashExpensesListData.reduce((total, { amount }) => total + +amount, 0);
    }
    return 0; // Return 0 if there's no data
  }, [cashExpensesSync?.cashExpensesListData]);

  const handleOpenCashExpensesForm = () => {
    setEditCashExpensesObject(null);
    setIsOpenCashExpensesForm(true);
  };

  const handleEditExpenses=(data)=>{
    setEditCashExpensesObject(data);
    setIsOpenCashExpensesForm(true);
  }

  const handleCloseCashExpensesForm=()=>{
    setEditCashExpensesObject(null);
    setIsOpenCashExpensesForm(false);
  }
  return (
    <>
      <Breadcrumb
        label={`Cash Expenses Total: ₹ ${totalExpense}`}
        onClickRightButton={handleOpenCashExpensesForm}
        icon="mdi-currency-rupee"
        rightButtonLabel={
          <>
            <span className="mdi mdi-currency-rupee"></span> Add Expenses
          </>
        }
      />

      <CashExpensesList onEdit={handleEditExpenses} cashExpensesListData={cashExpensesSync?.cashExpensesListData} />

      <NormalModal toggle={handleCloseCashExpensesForm} title="Add Cash Expenses" isShow={isOpenCashExpensesForm}>
        <CashExpensesForm
        cashExpensesSync={cashExpensesSync}
         editCashExpensesObject={editCashExpensesObject}
          onSucess={handleCloseCashExpensesForm}
          onClose={handleCloseCashExpensesForm}
        />
      </NormalModal>
    </>
  );
};
