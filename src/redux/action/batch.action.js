import {
  createBatch,
  getAllBatchList,
  updateBatch,
  deleteBatch,
  getBatchById
} from "../../services/api/batch";
import batchStateSlice from "../slices/batch.slices";

export const batchStateSliceActions = batchStateSlice.actions;

export function getAllBatch() {
    return async (dispatch) => {
    try {
      dispatch(batchStateSliceActions.setisBatchListLoader(true)); // Set loading state to true
      const response = await getAllBatchList(); // Fetch leads
      dispatch(batchStateSliceActions.setBatchDataList(response)); // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error); // Log any errors that occur
      dispatch(batchStateSliceActions.setBatchDataList([])); // Optionally, reset data on error
    } finally {
      dispatch(batchStateSliceActions.setisBatchListLoader(false)); // Set loading state to false regardless of success/failure
    }
  };
}

export function getBatchDetailsById(batchId) {
  return async (dispatch) => {
    try {
      dispatch(batchStateSliceActions.setBatchDetailByIdLoader(true)); // Set loading state to true
      const response = await getBatchById(batchId); // Fetch leads
      dispatch(batchStateSliceActions.setBatchDetailById(response)); // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error); // Log any errors that occur
      dispatch(batchStateSliceActions.setBatchDetailById(null)); // Optionally, reset data on error
    } finally {
      dispatch(batchStateSliceActions.setBatchDetailByIdLoader(false)); // Set loading state to false regardless of success/failure
    }
  };
}

export function createNewBatch(reqObj) {
  return async (dispatch) => {
    try {
      dispatch(batchStateSliceActions.setIsCreateUpdateLoader(true));
      const response = await createBatch({ ...reqObj }); // Fetch leads
      console.log(response, "--response");
      dispatch(batchStateSliceActions.setNewBatchData(response));
    } catch (error) {
      dispatch(batchStateSliceActions.setIsCreateUpdateLoader(false));
      console.error(error);
    }
  };
}

export function updateBatchData(reqObj, id) {
  return async (dispatch) => {
    try {
      dispatch(batchStateSliceActions.setIsCreateUpdateLoader(true));
      const response = await updateBatch(reqObj, id); // Fetch leads
      console.log(reqObj);
      dispatch(
        batchStateSliceActions.setUpdateBatchData({ ...reqObj, id: reqObj.id })
      );
    } catch (error) {
      dispatch(batchStateSliceActions.setIsCreateUpdateLoader(false));
      console.error(error);
    }
  };
}

export function deleteBatchData(id) {
  return async (dispatch) => {
    try {
      dispatch(batchStateSliceActions.setIsCreateUpdateLoader(true));
      const response = await deleteBatch(id); // Fetch leads
      console.log(response);
      dispatch(batchStateSliceActions.setDeleteBatchData(id));
    } catch (error) {
      dispatch(batchStateSliceActions.setIsCreateUpdateLoader(false));
      console.error(error);
    }
  };
}
