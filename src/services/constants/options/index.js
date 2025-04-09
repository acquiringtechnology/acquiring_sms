import {
  GENDER,
  USER_TYPE,
  // CLASS_TYPE,
  SETTLEMENT_TYPE,
  EXPENSE_CATEGORY_TYPE,
  COURSE_ENQUIRY_STATUS,
  LEAD_TYPE,
  CLASS_MODE,
  CANDIDATE_COURSE_STATUS,
  STATUS,
  PAYMENT_STATUS,
  EXPENSE_TYPE
} from "../flags";
import Ecom from '../../../assets/images/projects/Ecom.svg'
import Restaurant from '../../../assets/images/projects//Restaurant.svg'
import bookMyShow from '../../../assets/images/projects/bookMyShow.svg'
import bulkEmail from '../../../assets/images/projects/bulkEmail.svg'
import loginSignUp from '../../../assets/images/projects/loginSignUp.svg'
import netflix from '../../../assets/images/projects/netflix.svg'
import portfolio from '../../../assets/images/projects/portfolio.svg'
import toDoList from '../../../assets/images/projects/toDoList.svg'
import weather from '../../../assets/images/projects/weather.svg'

export const COURSE_ENQUIRY_STATUS_LIST = [
  {
    label: "Requested",
    value: COURSE_ENQUIRY_STATUS.REQUESTED,
    color: "warning",
  },
  {
    label: "Not Responding",
    value: COURSE_ENQUIRY_STATUS.NOT_RESPONDING,
    color: "secondary",
  },
  {
    label: "Processing",
    value: COURSE_ENQUIRY_STATUS.PROCESSING,
    color: "info",
  },
  {
    label: "Interested",
    value: COURSE_ENQUIRY_STATUS.INTERESTED,
    color: "primary",
  },
  {
    label: "Not Interested",
    value: COURSE_ENQUIRY_STATUS.NOT_INTERESTED,
    color: "danger",
  },
  {
    label: "Joined",
    value: COURSE_ENQUIRY_STATUS.JOINED,
    color: "success",
  },
];

export const CANDIDATE_CLASS_STATUS_LIST = [
  {
    label: "yet to start",
    value: CANDIDATE_COURSE_STATUS.YET_TO_START,
    color: "bg-warning",
  },
  {
    label: "Processing",
    value: CANDIDATE_COURSE_STATUS.PROCESSING,
    color: "bg-secondary",
  },
  {
    label: "Hold",
    value: CANDIDATE_COURSE_STATUS.DELETE,
    color: "bg-info",
  },
  {
    label: "Complited",
    value: CANDIDATE_COURSE_STATUS.DELETE,
    color: "bg-primary",
  },
];

export const GENDER_TYPE = [
  {
    label: "Male",
    value: GENDER.MALE,
  },
  {
    label: "Female",
    value: GENDER.FEMALE,
  },
];


export const PAYMENT_STATUS_LIST = [
  {
    label: "Pending",
    value: PAYMENT_STATUS.PENDING,
    color: "primary",
  },
  {
    label: "Partial Pending",
    value: PAYMENT_STATUS.PARTIAL_PENDING,
    color: "secondary",
  },
  {
    label: "Completed",
    value: PAYMENT_STATUS.COMPLETED,
    color: "success",
  },
  {
    label: "Refunded Pending",
    value: PAYMENT_STATUS.REFUNDED_PENDING,
    color: "warning",
  },
  {
    label: "Refunded",
    value: PAYMENT_STATUS.REFUNDED,
    color: "warning",
  },
];

export const USER_ROLE = [
  {
    label: "Candidate",
    value: USER_TYPE.CANDIDATE,
  },
  {
    label: "Trainer",
    value: USER_TYPE.TRAINER,
  },
  {
    label: "Branch Admin",
    value: USER_TYPE.BRANCH_ADMIN,
  },
  {
    label: "Admin",
    value: USER_TYPE.ADMIN,
  },
  {
    label: "Supper Admin",
    value: USER_TYPE.SUPPER_ADMIN,
  },
];

export const LEAD_TYPE_LIST = [
  {
    label: "Branch",
    value: LEAD_TYPE.BRANCH,
  },
  {
    label: "Trainer",
    value: LEAD_TYPE.TRAINER,
  },
  {
    label: "Branch Admin",
    value: LEAD_TYPE.BRANCH_ADMIN,
  },
  {
    label: "Instagram",
    value: LEAD_TYPE.INSTAGRAM,
  },
];

export const DEMO_STATUS_LIST = [
  {
    label: "YES",
    value: SETTLEMENT_TYPE.YES,
  },
  {
    label: "NO",
    value: SETTLEMENT_TYPE.NO,
  },
];

export const BRANCH_LIST = [
  {
    label: "T.Nagar",
    value: 1,
  },
  {
    label: "Perumbakkam",
    value: 2,
  },
  {
    label: "Avadi",
    value: 3,
  },
  {
    label: "Kolathur",
    value: 4,
  },
  {
    label: "Ambattur",
    value: 5,
  },
];

export const PAY_BANK_LIST = [
  {
    label: "Greens",
    value: 1,
  },
  {
    label: "Plotel",
    value: 2,
  },
  {
    label: "Jayashree",
    value: 3,
  },
  {
    label: "Anvesh",
    value: 4,
  },
];

export const YES_NO_LIST = [
  {
    label: "Yes",
    value: 1,
  },
  {
    label: "No",
    value: 0,
  },
];

export const BATCH_STATUS_LIST = [
  {
    label: "Not Yet",
    value: 0,
    color: "secondary",
  },
  {
    label: "Processing",
    value: 1,
    color: "primary",
  },
  {
    label: "Complited",
    value: 2,
    color: "success",
  },
  {
    label: "Hold",
    value: 3,
    color: "warning",
  },
];

export const WEEK_LIST = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

export const CLASS_MODE_LIST = [
  {
    label: "Offline",
    value: CLASS_MODE.OFFLINE,
  },
  {
    label: "Online",
    value: CLASS_MODE.ONLINE,
  },
];

export const EMPLOYEE_STATUS_LIST = [
  {
    label: "Active",
    value: STATUS.ACTIVE,
  },
  {
    label: "Inactive",
    value: STATUS.DE_ACTIVE,
  },
];

export const EMPLOYEE_DESIGNATION_LIST = [
  {
    label: "Front end Developer",
    value: 0,
  },
  {
    label: "Backend Developer",
    value: 1,
  },
  {
    label: "Founder",
    value: 2,
  },
  {
    label: "CEO",
    value: 3,
  },
];

export const COURSE_LIST = [
  {
    label: "Full Stack Web Devlopment",
    value: "d5eb2822-507c-11ee-be56-0242ac120002",
  },
];

export const BANK_DETAILS_LIST = [
  {
    label: "Jayashree (Canara )",
    value: 1,
  },
  {
    label: "Jayashree (HDFC)",
    value: 2,
  },
  {
    label: "Jayashree (SBI)",
    value: 3,
  },
];

export const PROJECTS_LIST = [
  {
    label: "Full Stack",
    id: "d5eb2822-507c-11ee-be56-0242ac120002",
    projectList: [
      {
        label: "portfolio",
        value: "1",
        img:portfolio
      },
      {
        label: "Restaurant",
        value: "2",
        img: Restaurant
      },
      {
        label: "To-Do List",
        value: "3",
        img: toDoList
      },
      {
        label: "E-Commerce",
        value: "4",
        img: Ecom
      },
      {
        label: "weather application ",
        value: "5",
        img: weather
      },
      {
        label: "bulk mail application ",
        value: "6",
        img: bulkEmail
      },
      {
        label: "Netflix Clone ",
        value: "7",
        img: netflix
      },
      {
        label: "Bookmyshow Clone ",
        value: "8",
        img: bookMyShow
      },
    ],
  },
];

export const EXPENSE_TYPE_LIST=[
  {
    label: "Salary",
    value: EXPENSE_TYPE.SALARY,
    color: "primary",
  },
  {
    label: "Others",
    value: EXPENSE_TYPE.OTHERS,
    color: "primary",
  }
];

export const EXPENSE_CATEGORY_LIST=[
  {
    label: "Digital Markting",
    value: EXPENSE_CATEGORY_TYPE.DIGITAL_MARKTING,
    color: "primary",
  },
  {
    label: "Mobile Recharge",
    value: EXPENSE_CATEGORY_TYPE.MOBILE_RECHARGE,
    color: "primary",
  },
  {
    label: "Transportation",
    value: EXPENSE_CATEGORY_TYPE.TRANSPORTATION,
    color: "primary",
  },
  {
    label: "Meta Ads",
    value: EXPENSE_CATEGORY_TYPE.META_ADS,
    color: "primary",
  }
];