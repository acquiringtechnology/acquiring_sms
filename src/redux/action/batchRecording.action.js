import { createBatchRecording ,getBatchRecordingListById } from "../../services/api/batchRecording";
import batchRecordingSlice from "../slices/batchRecording.slices";

export const batchRecordingSliceActions = batchRecordingSlice.actions;



export function getBatchRecordingById(batchId) {
  return async (dispatch) => {
    try {
      dispatch(batchRecordingSliceActions.setisBatchRecordingListLoader(true)); // Set loading state to true
      const response = await getBatchRecordingListById(batchId); // Fetch leads
      dispatch(batchRecordingSliceActions.setBatchRecordingDataList(response)); // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error); // Log any errors that occur
      dispatch(batchRecordingSliceActions.setBatchRecordingDataList([])); // Optionally, reset data on error
    } finally {
      dispatch(batchRecordingSliceActions.setisBatchRecordingListLoader(false)); // Set loading state to false regardless of success/failure
    }
  };
}

export function createNewBatchRecording(reqObj) {
  return async (dispatch) => {
    try {
      dispatch(batchRecordingSliceActions.setIsCreateUpdateLoader(true));
      const response = await createBatchRecording({ ...reqObj }); // Fetch leads
      dispatch(batchRecordingSliceActions.setNewBatchRecordingData(response));
    } catch (error) {
      dispatch(batchRecordingSliceActions.setIsCreateUpdateLoader(false));
      console.error(error);
    }
  };
}
