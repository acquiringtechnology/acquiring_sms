import { useState, useRef, useEffect } from "react";
import { NormalInput, NormalSelect, NormalButton } from "../../../common";
import { employeeSchemaModule } from "../../../../services/module/employee";
import SimpleReactValidator from "simple-react-validator";
import {
  STATUS,
  EMPLOYEE_STATUS_LIST,
  EMPLOYEE_DESIGNATION_LIST,
  USER_ROLE,
  GENDER_TYPE,
} from "../../../../services/constants";
import { createNewEmployee } from "../../../../redux/action/employee.action";
import { useAppDispatch } from "../../../../hooks/reducHooks";
export const EmployeeFrom = ({
  employeeSync = "",
  editEmployeeObject = {},
  onSucess = () => {},
  onclose = () => {},
}) => {
  const dispatch = useAppDispatch();
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [, forceUpdate] = useState();
  const [employeeForm, setEmployeeForm] = useState({
    ...editEmployeeObject,
    ...employeeSchemaModule,
  });

  const handleEmployeeFormChange = (event, keyName = "") => {
    const { name, value } = event.target;

    if (name === "name") {
      setEmployeeForm((prevState) => ({
        ...prevState,
        name: {
          ...prevState.name,
          [keyName]: value,
        },
      }));
    } else {
      setEmployeeForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleAddSlab = () => {
    setEmployeeForm((prevState) => ({
      ...prevState,
      salary: [
        ...prevState.salary,
        {
          start: "", // Start date
          end: "", // End date
          amount: 0, // Salary Amount
        },
      ],
    }));
  };

  const handleEmployeeSalaryFormChange = (event, i) => {
    const { name, value } = event.target;
    setEmployeeForm((prevState) => ({
      ...prevState,
      salary: prevState.salary.map((item, index) =>
        index === i ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleEmployeeServiceFormChange = (event, i) => {
    const { name, value } = event.target;
    setEmployeeForm((prevState) => ({
      ...prevState,
      serviceDateHistory: prevState.serviceDateHistory.map((item, index) =>
        index === i ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handEmployeeSubmit = async () => {
    console.log("handEmployeeSubmit------", JSON.stringify(employeeForm));

    try {
      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        // setIsLoadingFrom(true);
        // const res = leadForm?.id
        //   ? await dispatch(updateLeadData(leadForm, leadForm.id))
        //   : await dispatch(createNewLead(leadForm));

        const res = await dispatch(createNewEmployee(employeeForm));
        console.log("end------", JSON.stringify(employeeForm));

        onSucess();
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      // setIsLoadingFrom(false);
    }
  };

  const handleCloseModel = () => {
    setEmployeeForm({ ...employeeSchemaModule });
    onclose();
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <NormalInput
          label="Enter First Name"
          value={employeeForm.name.first}
          placeholder="Enter First Name"
          name="name"
          onChange={(e) => handleEmployeeFormChange(e, "first")}
          errorMessage={simpleValidator.current.message(
            "First Name",
            employeeForm.name.first,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Last Name"
          value={employeeForm.name.last}
          placeholder="Enter Last Name"
          name="name"
          onChange={(e) => handleEmployeeFormChange(e, "last")}
          errorMessage={simpleValidator.current.message(
            "Last Name",
            employeeForm.name.last,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Age"
          value={employeeForm.age}
          placeholder="Enter Age"
          name="age"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "Age",
            employeeForm.age,
            "required"
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalInput
          label="Enter DOB"
          type="date"
          value={employeeForm.dob}
          placeholder="Enter DOB"
          name="dob"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "DOB",
            employeeForm.dob,
            "required"
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalInput
          label="Enter Email"
          value={employeeForm.email}
          placeholder="Enter email"
          name="email"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "Email",
            employeeForm.email,
            "required|email"
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalInput
          label="Enter Phone"
          value={employeeForm.phone}
          placeholder="Enter Phone"
          name="phone"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "Phone",
            employeeForm.phone,
            "required|phone"
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalInput
          label="Enter Aadhar"
          value={employeeForm.aadhar}
          placeholder="Enter Aadhar"
          name="aadhar"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "Aadhar",
            employeeForm.aadhar,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Pan"
          value={employeeForm.pan}
          placeholder="Enter Pan"
          name="pan"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "Pan",
            employeeForm.pan,
            "required"
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalSelect
          label="Status"
          option={EMPLOYEE_STATUS_LIST}
          value={employeeForm.status}
          placeholder="Select Status"
          name="status"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "Status",
            employeeForm.status,
            "required"
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalSelect
          label="Designation"
          option={EMPLOYEE_DESIGNATION_LIST}
          value={employeeForm.designation}
          placeholder="Select Designation"
          name="designation"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "designation",
            employeeForm.designation,
            "required"
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalSelect
          label="Role"
          option={USER_ROLE}
          value={employeeForm.role}
          placeholder="Select Role"
          name="role"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "role",
            employeeForm.role,
            "required"
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalSelect
          label="Gender"
          option={GENDER_TYPE}
          value={employeeForm.gender}
          placeholder="Select Gender"
          name="gender"
          onChange={handleEmployeeFormChange}
          errorMessage={simpleValidator.current.message(
            "gender",
            employeeForm.gender,
            "required"
          )}
        />
      </div>

      <div className="card mb-4">
        <div className="card-body p-3 border rounded">
          <h4 className="title"> Salary Slab</h4>
          <hr />
          {employeeForm.salary.map((salary, i) => (
            <div className="row" key={salary}>
              <div className="col-md-6">
                <NormalInput
                  label="Enter Amount"
                  value={salary.amount}
                  placeholder="Enter Amount"
                  name="amount"
                  onChange={(e) => handleEmployeeSalaryFormChange(e, i)}
                  errorMessage={simpleValidator.current.message(
                    "Amount",
                    salary.amount,
                    "required"
                  )}
                />
              </div>
              <div className="col-md-6">
                <NormalInput
                  label="Enter Start Date"
                  value={salary.start}
                  type="Date"
                  placeholder="Enter start"
                  name="start"
                  onChange={(e) => handleEmployeeSalaryFormChange(e, i)}
                  errorMessage={simpleValidator.current.message(
                    "Start",
                    salary.start,
                    "required"
                  )}
                />
              </div>
              <div className="col-md-6">
                <NormalInput
                  label="Enter End Date"
                  type="Date"
                  value={salary.end}
                  placeholder="Enter End"
                  name="end"
                  onChange={(e) => handleEmployeeSalaryFormChange(e, i)}
                  // errorMessage={simpleValidator.current.message(
                  //   "End",
                  //   salary.end,
                  //   "required"
                  // )}
                />
              </div>
              <div className="col-12">
                <hr />
              </div>
            </div>
          ))}

          <div className=" d-grid gap-2">
            <NormalButton
              className="me-2 btn btn-outline-primary btn-icon-text btn-block  btn-fw"
              //   disabled={leadSync.isCreateUpdateLoader}
              label="Add Slab"
              onClick={handleAddSlab}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-3 border rounded">
          <h4 className="title">Employe History</h4>
          <hr />
          {employeeForm.serviceDateHistory.map((service, i) => (
            <div className="row" key={service}>
              <div className="col-md-6">
                <NormalSelect
                  label="Status"
                  option={EMPLOYEE_STATUS_LIST}
                  value={service.status}
                  placeholder="Select Status"
                  name="status"
                  onChange={(e) => handleEmployeeServiceFormChange(e, i)}
                  errorMessage={simpleValidator.current.message(
                    "status",
                    service.status,
                    "required"
                  )}
                />
              </div>
              <div className="col-md-6">
                <NormalInput
                  label="Enter Join Date"
                  type="Date"
                  value={service.joinDate}
                  placeholder="Enter Join Date"
                  name="joinDate"
                  onChange={(e) => handleEmployeeServiceFormChange(e, i)}
                  errorMessage={simpleValidator.current.message(
                    "join Date",
                    service.joinDate,
                    "required"
                  )}
                />
              </div>
              {service?.status === STATUS.DE_ACTIVE && (
                <div className="col-md-6">
                  <NormalInput
                    label="Enter Relieve Date"
                    type="Date"
                    value={service.relieveDate}
                    placeholder="Enter Relieve Date"
                    name="relieveDate"
                    onChange={(e) => handleEmployeeServiceFormChange(e, i)}
                    // errorMessage={simpleValidator.current.message(
                    //   "join Date",
                    //   service.relieveDate,
                    //   "required"
                    // )}
                  />
                </div>
              )}

              <div className="col-12">
                <hr />
              </div>
            </div>
          ))}

          <div className=" d-grid gap-2">
            <NormalButton
              className="me-2 btn btn-outline-primary btn-icon-text btn-block  btn-fw"
              //   disabled={leadSync.isCreateUpdateLoader}
              label="Add Slab"
              onClick={handleAddSlab}
            />
          </div>
        </div>
      </div>

      <div className="col-md-12 mt-4">
        <NormalButton
          className="me-2 btn-gradient-danger btn-fw"
          disabled={employeeSync.isCreateUpdateLoader}
          label="Back"
          color="secondary"
          onChange={handleCloseModel}
        />
        <NormalButton
          className="me-2  btn-gradient-success btn-fw"
          isLoader={employeeSync.isCreateUpdateLoader}
          onClick={handEmployeeSubmit}
          label="Update Changes"
        />
      </div>
    </div>
  );
};
