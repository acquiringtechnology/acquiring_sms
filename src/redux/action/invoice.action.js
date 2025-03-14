import {
getAllInvoice
  } from "../../services/api/invoice";
  import invoiceStateSlice from "../slices/invoice.slices";
  
  export const invoiceSliceActions = invoiceStateSlice.actions;


  
  export function getAllInvoiceList() {
    return async (dispatch) => {
      try {
        dispatch(invoiceSliceActions.setisInvoiceListLoader(true)); // Set loading state to true
        const response = await getAllInvoice(); // Fetch leads
        dispatch(invoiceSliceActions.setInvoiceListData(response)); // Update state with leads
      } catch (error) {
        console.error("Failed to fetch leads:", error); // Log any errors that occur
        dispatch(invoiceSliceActions.setInvoiceListData([])); // Optionally, reset data on error
      } finally {
        dispatch(invoiceSliceActions.setisInvoiceListLoader(false)); // Set loading state to false regardless of success/failure
      }
    };
  }