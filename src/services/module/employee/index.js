import { STATUS } from "../../constants";

export const employeeSchemaModule = {
  name: {
    first: "", // First Name
    last: "", // Last Name
  },
  age: 0, // Age
  dob: "", // Date of Birth
  email: "", // Email Address
  phone: "", // Phone Number
  status: STATUS.ACTIVE,
  designation: "", // Designation
  role: "", // User type (e.g., Admin, Employee)
  gender: "", // Gender
  aadhar: "", // Aadhar Number
  pan: "", // PAN Number
  salary: [
    // Salary History
    {
      start: "", // Start date
      end: "", // End date
      amount: 25000, // Salary Amount
    },
  ],
  empCode: "", //emp code ATE101
  serviceDateHistory: [
    {
      joinDate: "", // Date of Relieving (or Termination)
      status: "",
      relieveDate: "",
    },
  ], // Joining Date
  updatedBy: [], // List of users who updated the record
  createdBy: {
    name: ``,
    user_id: "guest",
    date: '',
  }, // Creator of the record
};
