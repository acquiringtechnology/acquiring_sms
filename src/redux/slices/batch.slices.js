import { createSlice } from "@reduxjs/toolkit";

const initialBatchState = {
  batchListData: [],
  isBatchListLoader: false,
  isCreateUpdateLoader: false,
  batchDetail: '',
  isBatchDetailByIdLoader: false,
};

const batchStateSlice = createSlice({
  name: "batchSync",
  initialState: initialBatchState,
  reducers: {
    setBatchDataList(state, action) {
      state.batchListData = action.payload;
      state.isBatchListLoader = false;
    },
    setisBatchListLoader(state, action) {
      state.isBatchListLoader = action?.payload;
    },
    setIsCreateUpdateLoader(state, action) {
      state.isCreateUpdateLoader = action?.payload;
    },
    setBatchDetailById(state, action) {
      state.batchDetail = action.payload;
      state.isBatchDetailByIdLoader = false;
    },
    setBatchDetailByIdLoader(state, action) {
      state.isBatchDetailByIdLoader =  action?.payload;
    },
    setNewBatchData(state, action) {
      state.batchListData = [action.payload, ...state.batchListData];
      state.isCreateUpdateLoader = false;
    },
    setUpdateBatchData(state, action) {
      const batchList = [...state.batchListData];
      const index = batchList?.findIndex(
        (data) => data.id === action.payload?.id
      );
      if (index !== -1) {
        batchList[index] = action.payload;
      }
      state.batchListData = [...batchList];
      state.isCreateUpdateLoader = false;
    },
    setDeleteBatchData(state, action) {
      const batchList = [...state.batchListData]?.filter(
        (data) => data.id !== action.payload
      );

      state.batchListData = [...batchList];
      state.isCreateUpdateLoader = false;
    },
  },
});


export default batchStateSlice;
