import { createSlice } from "@reduxjs/toolkit";

const initialBatchState = {
  batchRecordingData: [],
  isBatchRecordingListLoader: false,
  isCreateUpdateLoader: false,
};

const batchRecordingSlice = createSlice({
  name: "batchRecordingSync",
  initialState: initialBatchState,
  reducers: {
    setBatchRecordingDataList(state, action) {
      state.batchRecordingData = action.payload;
      state.isBatchRecordingListLoader = false;
    },
    setisBatchRecordingListLoader(state, action) {
      state.isBatchRecordingListLoader = action?.payload;
    },
    setIsCreateUpdateLoader(state, action) {
      state.isCreateUpdateLoader = action?.payload;
    },

    setNewBatchRecordingData(state, action) {
      state.batchRecordingData = [action.payload, ...state.batchRecordingData];
      state.isCreateUpdateLoader = false;
    },
    setUpdateBatchRecordingData(state, action) {
      const batchRecordingList = [...state.batchRecordingData];
      const index = batchRecordingList?.findIndex(
        (data) => data.id === action.payload?.id
      );
      if (index !== -1) {
        batchRecordingList[index] = action.payload;
      }
      state.batchRecordingData = [...batchRecordingList];
      state.isCreateUpdateLoader = false;
    },
    setDeleteBatchRecordingData(state, action) {
      const batchRecordingList = [...state.batchRecordingData]?.filter(
        (data) => data.id !== action.payload
      );

      state.batchRecordingData = [...batchRecordingList];
      state.isCreateUpdateLoader = false;
    },
  },
});


export default batchRecordingSlice;
