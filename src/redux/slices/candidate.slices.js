import { createSlice } from "@reduxjs/toolkit";

const initialCandidateState = {
  candidateListData: [],
  isCandidateListLoader: false,
  isCreateUpdateLoader: false,
};

const candidateStateSlice = createSlice({
  name: "candidateSync",
  initialState: initialCandidateState,
  reducers: {
    setCandidateDataList(state, action) {
      state.candidateListData = action.payload;
      state.isCandidateListLoader = false;
    },
    setisCandidateListLoader(state, action) {
      state.isCandidateListLoader = action?.payload;
    },
    setIsCreateUpdateLoader(state, action) {
      state.isCreateUpdateLoader = action?.payload;
    },

    setNewCandidateData(state, action) {
      state.candidateListData = [action.payload, ...state.candidateListData];
      state.isCreateUpdateLoader = false;
    },
    setUpdateCandidateData(state, action) {
      const candidateList = [...state.candidateListData];
      const index = candidateList?.findIndex(
        (data) => data.id === action.payload?.id
      );
      if (index !== -1) {
        candidateList[index] = action.payload;
      }
      state.candidateListData = [...candidateList];
      state.isCreateUpdateLoader = false;
    },
    setDeleteCandidateData(state, action) {
      const candidateList = [...state.candidateListData]?.filter(
        (data) => data.id !== action.payload
      );

      state.candidateListData = [...candidateList];
      state.isCreateUpdateLoader = false;
    },
  },
});


export default candidateStateSlice;
