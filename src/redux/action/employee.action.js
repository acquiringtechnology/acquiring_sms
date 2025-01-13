import { createEmployee, getAllEmployees } from "../../services/api/employee";
import employeeStateSlice from "../slices/employee.slices";

export const employeeStateSliceActions = employeeStateSlice.actions;

export function getAllEmployee() {
  return async (dispatch) => {
    try {
      dispatch(employeeStateSliceActions.setisEmployeeListLoader(true)); // Set loading state to true
      const response = await getAllEmployees(); // Fetch leads
      dispatch(employeeStateSliceActions.setEmployeeDataList(response)); // Update state with leads
    } catch (error) {
      console.error("Failed to fetch leads:", error); // Log any errors that occur
      dispatch(employeeStateSliceActions.setEmployeeDataList([])); // Optionally, reset data on error
    } finally {
      dispatch(employeeStateSliceActions.setisEmployeeListLoader(false)); // Set loading state to false regardless of success/failure
    }
  };
}

export function createNewEmployee(reqObj) {
  return async (dispatch) => {
    try {
      dispatch(employeeStateSliceActions.setIsCreateUpdateLoader(true));
      const response = await createEmployee({ ...reqObj }); // Fetch leads
      console.log(response, "--response");
      dispatch(employeeStateSliceActions.setNewEmployeeData(response));
    } catch (error) {
      dispatch(employeeStateSliceActions.setIsCreateUpdateLoader(false));
      console.error(error);
    }
  };
}
