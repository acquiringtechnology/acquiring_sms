
import { createSlice } from "@reduxjs/toolkit";

const initialInvoiceState = {
  invoiceListData: [],
  invoiceData: null,
  isInvoiceDataLoader: false,
};

const invoiceStateSlice = createSlice({
  name: "invoiceStateSlice",
  initialState: initialInvoiceState,
  reducers: {
    setInvoiceListData(state, action) {
        JSON.stringify('action.payload---',action.payload)
      state.invoiceListData = action.payload;
      state.isInvoiceDataLoader = false;
    },
    setisInvoiceListLoader(state, action) {
        state.isInvoiceDataLoader = action?.payload;
      },
}
});

export default invoiceStateSlice;
