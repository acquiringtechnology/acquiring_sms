import { createSlice } from "@reduxjs/toolkit";

const initialCashExpensesState = {
  cashExpensesListData: [],
  isCashExpensesListLoader: false,
  isCreateUpdateLoader: false,
  cashExpensesDetail: "",
  //   isBatchDetailByIdLoader: false,
};

const cashExpensesStateSlice = createSlice({
  name: "cashExpensesSync",
  initialState: initialCashExpensesState,
  reducers: {
    setCashExpensesList(state, action) {
      state.cashExpensesListData = action.payload;
      state.isCashExpensesListLoader = false;
    },

    setisCashExpensesLoader(state, action) {
      state.isCashExpensesListLoader = action?.payload;
    },
    setIsCreateUpdateLoader(state, action) {
      state.isCreateUpdateLoader = action?.payload;
    },
    setNewCashExpensesData(state, action) {
      state.cashExpensesListData = [
        action.payload,
        ...state.cashExpensesListData,
      ];
      state.isCreateUpdateLoader = false;
    },
    setUpdateCashExpensesData(state, action) {
      const cashExpensesListData = [...state.cashExpensesListData];

      const index = cashExpensesListData?.findIndex(
        (data) => data.id === action.payload?.id
      );
      if (index !== -1) {
        cashExpensesListData[index] = action.payload;
      }
      state.cashExpensesListData = [...cashExpensesListData];
      state.isCreateUpdateLoader = false;
    },
    setDeleteCashExpensesDataData(state, action) {
        const cashExpensesListData = [...state.cashExpensesListData]?.filter(
          (data) => data.id !== action.payload
        );
  
        state.cashExpensesListData = [...cashExpensesListData];
        state.isCreateUpdateLoader = false;
      },
  },
});

export default cashExpensesStateSlice;
