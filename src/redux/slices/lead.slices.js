import { createSlice } from "@reduxjs/toolkit";

const initialLeadState = {
    leadListData: [],
    isLeadListLoader: false,

}


const leadStateSlice = createSlice({
    name: 'leadSync',
    initialState: initialLeadState,
    reducers: {
        setLeadDataList(state, action) {
            state.leadListData = action.payload;
            state.isLeadListLoader = false
        },
        setisLeadListLoader(state, action) {
            state.isLeadListLoader = action?.payload;
        },
    }
});

export default leadStateSlice;