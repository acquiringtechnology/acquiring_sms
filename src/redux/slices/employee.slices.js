import { createSlice } from "@reduxjs/toolkit";

const initialEmployeeState = {
  employeeListData: [],
  isEmployeeListLoader: false,
  isCreateUpdateLoader: false,
};

const employeeStateSlice = createSlice({
  name: "employeeSync",
  initialState: initialEmployeeState,
  reducers: {
    setEmployeeDataList(state, action) {
      state.employeeListData = action.payload;
      state.isEmployeeListLoader = false;
    },
    setisEmployeeListLoader(state, action) {
      state.isEmployeeListLoader = action?.payload;
    },
    setIsCreateUpdateLoader(state, action) {
      state.isCreateUpdateLoader = action?.payload;
    },

    setNewEmployeeData(state, action) {
      console.log("action.payload,", action.payload);
      console.log("action.payload,", [action.payload, ...state.employeeListData]);
      state.employeeListData = [action.payload, ...state.employeeListData];
      state.isCreateUpdateLoader = false;
    },
    setUpdateEmployeeData(state, action) {
      const employeeList = [...state.employeeListData];

      const index = employeeList?.findIndex(
        (data) => data.id === action.payload?.id
      );
      console.log("index---", index);
      console.log("indeactionx---", action.payload);
      if (index !== -1) {
        employeeList[index] = action.payload;
      }
      state.employeeListData = [...employeeList];
      state.isCreateUpdateLoader = false;
    },
    setDeleteLeadData(state, action) {
      const employeeList = [...state.employeeListData]?.filter(
        (data) => data.id !== action.payload
      );

      state.employeeListData = [...employeeList];
      state.isCreateUpdateLoader = false;
    },
  },
});


export default employeeStateSlice;
