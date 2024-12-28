import { combineReducers, configureStore } from '@reduxjs/toolkit';
import leadStateSlice from './slices/lead.slices';

const combinedReducer = combineReducers(
    {
        leadSync: leadStateSlice.reducer,
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