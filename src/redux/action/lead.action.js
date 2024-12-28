import { getAllLeads } from "../../services/api/lead";
import leadStateSlice from "../slices/lead.slices";



export const leadStateSliceActions = leadStateSlice.actions;
export function getAllLead() {
  return async (dispatch) => {
    try {
      dispatch(leadStateSliceActions.setisLeadListLoader(true));  // Set loading state to true
      const response = await getAllLeads();  // Fetch leads
      dispatch(leadStateSliceActions.setLeadDataList(response));  // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error);  // Log any errors that occur
      dispatch(leadStateSliceActions.setLeadDataList([]));  // Optionally, reset data on error
    } finally {
      dispatch(leadStateSliceActions.setisLeadListLoader(false));  // Set loading state to false regardless of success/failure
    }
  };
}
