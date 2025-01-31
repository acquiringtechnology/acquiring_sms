import { getAllCandidate ,createCandidate} from "../../services/api/candidate";
import candidateStateSlice from "../slices/candidate.slices";

export const candidateSliceActions = candidateStateSlice.actions;
export function getAllCandidates() {
  return async (dispatch) => {
    try {
      dispatch(candidateSliceActions.setisCandidateListLoader(true)); // Set loading state to true
      const response = await getAllCandidate(); // Fetch leads
      dispatch(candidateSliceActions.setCandidateDataList(response)); // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error); // Log any errors that occur
      dispatch(candidateSliceActions.setCandidateDataList([])); // Optionally, reset data on error
    } finally {
      dispatch(candidateSliceActions.setisCandidateListLoader(false)); // Set loading state to false regardless of success/failure
    }
  };
}


export function createNewCandidate(body) {
  return async (dispatch) => {
    try {
      dispatch(candidateSliceActions.setIsCreateUpdateLoader(true)); // Set loading state to true
      const response = await createCandidate(body); // Fetch leads
      dispatch(candidateSliceActions.createCandidate(response)); // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error); // Log any errors that occur
      dispatch(candidateSliceActions.setNewCandidateData([])); // Optionally, reset data on error
    } finally {
      dispatch(candidateSliceActions.setIsCreateUpdateLoader(false)); // Set loading state to false regardless of success/failure
    }
  };
}