import {
  createCashExpenses,
  getAllCashExpensesList,
  updateCashExpenses,
  deleteCashExpenses
  } from "../../services/api/cashExpenses";
  import cashExpensesStateSlice from "../slices/cashExpenses.slices";


  
export const cashExpensesStateSliceActions = cashExpensesStateSlice.actions;

export function getAllCashExpenses() {
  return async (dispatch) => {
    try {
      dispatch(cashExpensesStateSliceActions.setisCashExpensesLoader(true)); // Set loading state to true
      const response = await getAllCashExpensesList(); // Fetch leads
      dispatch(cashExpensesStateSliceActions.setCashExpensesList(response)); // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error); // Log any errors that occur
      dispatch(cashExpensesStateSliceActions.setCashExpensesList([])); // Optionally, reset data on error
    } finally {
      dispatch(cashExpensesStateSliceActions.setisCashExpensesLoader(false)); // Set loading state to false regardless of success/failure
    }
  };
};


export function createNewCashExpenses(reqObj) {
  return async (dispatch) => {
    try {
      dispatch(cashExpensesStateSliceActions.setIsCreateUpdateLoader(true));
      const response = await createCashExpenses({ ...reqObj }); // Fetch leads
      console.log(response, "--response");
      dispatch(cashExpensesStateSliceActions.setNewCashExpensesData(response));
    } catch (error) {
      dispatch(cashExpensesStateSliceActions.setIsCreateUpdateLoader(false));
      console.error(error);
    }
  };
};

export function updateCashExpensesById(body,id) {
  return async (dispatch) => {
    try {
      dispatch(cashExpensesStateSliceActions.setIsCreateUpdateLoader(true)); // Set loading state to true
      const response = await updateCashExpenses(body,id); // Fetch leads
      dispatch(cashExpensesStateSliceActions.setUpdateCashExpensesData(body)); // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error); // Log any errors that occur
      dispatch(cashExpensesStateSliceActions.setNewCandidateData([])); // Optionally, reset data on error
    } finally {
      dispatch(cashExpensesStateSliceActions.setIsCreateUpdateLoader(false)); // Set loading state to false regardless of success/failure
    }
  };
}


export function deleteCashExpensesDataById(id) {
  return async (dispatch) => {
    try {
      dispatch(cashExpensesStateSliceActions.setIsCreateUpdateLoader(true));
      const response = await deleteCashExpenses(id); // Fetch leads
      console.log(response);
      dispatch(cashExpensesStateSliceActions.setDeleteCashExpensesDataData(id));
    } catch (error) {
      dispatch(cashExpensesStateSliceActions.setIsCreateUpdateLoader(false));
      console.error(error);
    }
  };
}