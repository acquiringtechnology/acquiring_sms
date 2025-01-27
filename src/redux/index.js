import { combineReducers, configureStore } from '@reduxjs/toolkit';
import leadStateSlice from './slices/lead.slices';
import employeeStateSlice from './slices/employee.slices';
import batchStateSlice from './slices/batch.slices';
import candidateStateSlice from './slices/candidate.slices';
import batchRecordingSlice from './slices/batchRecording.slices';

const combinedReducer = combineReducers(
    {
        leadSync: leadStateSlice.reducer,
        employeeSync: employeeStateSlice.reducer,
        batchSync: batchStateSlice.reducer,
        candidateSync: candidateStateSlice.reducer,
        batchRecordingSync: batchRecordingSlice.reducer,
    }
)

const rootReducer = (state, action) => {
    if (action.type === 'commonData/logout') {
        state = {
            
        }
    }
    return combinedReducer(state, action);
}

const store = configureStore(
    {
        reducer: rootReducer
    }
)

export default store;