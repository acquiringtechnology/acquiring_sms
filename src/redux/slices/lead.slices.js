import { createSlice } from "@reduxjs/toolkit";

const initialLeadState = {
  leadListData: [],
  isLeadListLoader: false,
  isCreateUpdateLoader: false,
};

const leadStateSlice = createSlice({
  name: "leadSync",
  initialState: initialLeadState,
  reducers: {
    setLeadDataList(state, action) {
      state.leadListData = action.payload;
      state.isLeadListLoader = false;
    },
    setisLeadListLoader(state, action) {
      state.isLeadListLoader = action?.payload;
    },
    setIsCreateUpdateLoader(state, action) {
      state.isCreateUpdateLoader = action?.payload;
    },
    setNewLeadData(state, action) {
      console.log("action.payload,", action.payload);
      state.leadListData = [action.payload, ...state.leadListData];
      state.isCreateUpdateLoader = false;
    },
    setUpdateLeadData(state, action) {
      console.log("action.payload,", action.payload);
      const leadList = [...state.leadListData];

      const index = leadList?.findIndex(
        (data) => data.id === action.payload?.id
      );
      if (index !== -1) {
        leadList[index] = action.payload;
      }
      state.leadListData = [...leadList];
      state.isCreateUpdateLoader = false;
    },
  },
});

export default leadStateSlice;
