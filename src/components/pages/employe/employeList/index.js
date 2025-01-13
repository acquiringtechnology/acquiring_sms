import faces from "../../../../assets/images/faces-clipart/pic-1.png";
import { getIdByLabel } from "../../../../services/helperFunctions";
import {
  EMPLOYEE_DESIGNATION_LIST,
  EMPLOYEE_STATUS_LIST,
  STATUS,
} from "../../../../services/constants";
export const EmployeList = ({
  employeeListData = [],
  isEmployeeListLoader = false,
}) => {
  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <table className="table ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {employeeListData?.map((employee) => (
                <tr>
                  <td class="py-1">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <img
                          src={faces}
                          alt={`${employee?.name?.first} ${employee?.name?.last}`}
                        />
                      </div>
                      <div class="flex-grow-1 ms-3">
                        {employee?.name?.first} {employee?.name?.last}
                        <small className="d-flex mt-2 text-muted">
                          {employee?.empCode}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>{employee?.email}</td>
                  <td> {employee?.phone}</td>
                  <td>
                    {" "}
                    {getIdByLabel(
                      EMPLOYEE_DESIGNATION_LIST,
                      employee?.designation
                    )}{" "}
                  </td>
                  <td>
                    <label
                      className={`badge  ${
                        employee?.status === STATUS.ACTIVE
                          ? " badge-gradient-success"
                          : " badge-gradient-danger"
                      }`}
                    >
                      {getIdByLabel(EMPLOYEE_STATUS_LIST, employee?.status)}
                    </label>{" "}
                  </td>
                </tr>
              ))}

              {isEmployeeListLoader && (
                <tr>
                  <td colSpan="7" className="text-center">
                    <h4>Loading...</h4>
                  </td>
                </tr>
              )}
              {!isEmployeeListLoader && employeeListData?.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    <h4>No Data...</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
