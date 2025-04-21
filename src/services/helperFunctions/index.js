/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import {
  COURSE_ENQUIRY_STATUS,
  LEAD_TYPE,
  USER_TYPE,
  EXIST_LOCAL_STORAGE,
  LOGIN_TYPE,
  PROJECTS_LIST,
  PROJECT_STATUS,
  PAYMENT_STATUS_LIST,
} from "../constants";
import moment from "moment";
import { employeeSchemaModule } from "../module/employee";
import { indianStatesDistricts } from "../data/indianStatesDistricts";

import CryptoJS from "crypto-js";

// First, include CryptoJS if you're in Node.js environment

// Encryption function
function encrypt(text) {
  // return CryptoJS.AES.encrypt(text, "acquiringAT2023").toString();
  return window.btoa(text);
}

function decrypt(encryptedBase64) {
  // let bytes = CryptoJS.AES.decrypt(encryptedBase64, "acquiringAT2023");
  // return bytes.toString(CryptoJS.enc.Utf8);
  return window.atob(encryptedBase64);
}

export const setStorage = (name = "", data = "") => {
  window.localStorage.setItem(encrypt(name), encrypt(data));
};

export const getStorage = (name = "") => {
  let data = window.localStorage.getItem(encrypt(name));
  // console.log('data---',data,encrypt(name),name)
  if (!data) return data;
  return decrypt(data);
};

export function generateOTP() {
  // Generate a random 4-digit number
  return Math.floor(1000 + Math.random() * 9000);
}

export const removeStorage = (name = "") => {
  if (name) {
    localStorage.removeItem(name);
  } else {
    localStorage.clear();
  }
};

export const getUserType = (userType) => {
  switch (userType) {
    case USER_TYPE.SUPPER_ADMIN:
      return "Supper Admin";
    case USER_TYPE.ADMIN:
      return "Admin";
    case USER_TYPE.CANDIDATE:
      return "Candidate";
    case USER_TYPE.TRAINER:
      return "Trainer";
    case USER_TYPE.BRANCH_ADMIN:
      return "Branch Admin";
    default:
      return "No User";
  }
};

export const getJoinAndLeadStatus = (status) => {
  switch (status) {
    case COURSE_ENQUIRY_STATUS.REQUESTED:
      return "Requested";
    case COURSE_ENQUIRY_STATUS.NOT_RESPONDING:
      return "Not Responding";
    case COURSE_ENQUIRY_STATUS.PROCESSING:
      return "Processing";
    case COURSE_ENQUIRY_STATUS.INTERESTED:
      return "Interested";
    case COURSE_ENQUIRY_STATUS.NOT_INTERESTED:
      return "Not Interested";
    case COURSE_ENQUIRY_STATUS.JOINED:
      return "Joined";
    default:
      return "No Status";
  }
};

export const getBatchStatus = (status) => {
  switch (status) {
    case 0:
      return "Not Yet";
    case 1:
      return "Processing";
    case 2:
      return "Complited";
    case 3:
      return "Hold";
    case COURSE_ENQUIRY_STATUS.NOT_INTERESTED:
      return "Not Interested";
    case COURSE_ENQUIRY_STATUS.JOINED:
      return "Joined";
    default:
      return "No Status";
  }
};

export const gePaymentStatus = (data) => {
  const value = PAYMENT_STATUS_LIST?.find((status) => status.value === data);

  return value ? value : "No Status";
};
export const getOverAllPayment = (billingInfo = []) => {
  if (billingInfo.length === 0) return 0; // Early return if empty

  return billingInfo.reduce((total, { payFees }) => {
    return total + (Number(payFees) || 0); // Convert to number, default to 0 if invalid
  }, 0);
};

export const getPendingPayment = (billingInfo = [], totalAmount = 0) => {
  if (billingInfo.length === 0) return totalAmount; // Early return if empty

  return (
    Number(totalAmount) -
    billingInfo.reduce((total, { payFees }) => {
      return total + (Number(payFees) || 0); // Convert to number, default to 0 if invalid
    }, 0)
  );
};

export const getYesNotStatus = (status) => {
  switch (status) {
    case 0:
      return "No";
    case 1:
      return "Yes";
    default:
      return "No Status";
  }
};

export const getLeadType = (type) => {
  switch (type) {
    case LEAD_TYPE.ADMIN:
      return "Admin";
    case LEAD_TYPE.BRANCH:
      return "Branch";
    case LEAD_TYPE.TRAINER:
      return "Trainer";
    case LEAD_TYPE.INSTAGRAM:
      return "Instagram";
    default:
      return "No lead type found";
  }
};

export const getIdByLabel = (list = [], id) => {
  try {
    if (list?.length > 0) {
      if (Array.isArray(id)) {
        return id.map(
          (iss) =>
            list?.find(({ value }) => value === iss)?.label ?? "No Batch Found"
        );
      }
      const res = list?.find(({ value }) => value === id);
      return res.label ? res.label : "No User";
    }
    return "No User List";
  } catch (e) {
    return "some error occurred ";
  }
};

export const getCoursebyIdLabel = (list = [], id = []) => {
  try {
    if (list?.length > 0) {
      const res = list.filter(({ value }) => id.includes(value), id);
      console.log(res);
      return res || [];
    }
    return [];
  } catch (e) {
    return [];
  }
};

export const isEmptyObj = (obj = {}) => {
  return Object?.keys(obj).length === 0;
};

export const convertStringToHTML = (htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");

  return html.body.toString();
};

export const formatTimestamp = (date) => {
  if (date?.seconds && date?.nanoseconds) {
    const timestampInMilliseconds =
      date.seconds * 1000 + date.nanoseconds / 1000000;
    return moment(timestampInMilliseconds).format("DD MMM YYYY");
  }
  return moment(date).format("DD MMM YYYY");
};

export const multySearchObjects = (array = [], searchCriteria = {}) => {
  // eslint-disable-next-line no-debugger
  // debugger;
  try {
    const criteriaKeys = Object.keys(searchCriteria).filter(
      (key) => searchCriteria[key] !== ""
    );

    return array.filter((item) => {
      return criteriaKeys.every((key) => {
        const value = searchCriteria[key];
        if (typeof value === "string") {
          if (key === "userName") {
            const name = `${item?.fname} ${item?.lname}`;
            return name?.toString().toLowerCase().includes(value.toLowerCase());
          }
          if (key === "createdBy") {
            const createdByDate = Array.isArray(item?.createdBy)
              ? item?.createdBy?.[0]?.date
              : item?.createdBy?.date;
            if (createdByDate) {
              return moment(value).isSame(
                moment(formatTimestamp(createdByDate)),
                "month"
              );
            }
          }
          if (key === "projectId") {
            return (
              item?.projects?.some((project) => project?.id === value) ?? false
            );
          }

          if (key === "batchId") {
            return (
              item?.batchIds?.some((batch) => batch?.id === value) ?? false
            );
          }

          return item[key]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        if (typeof value === "number" && Array.isArray(item[key])) {
          return item[key]?.includes(value);
        }
        return item[key] === value;
      });
    });
  } catch (e) {
    console.log("-------", e);
    return array;
  }
};

export const getRandomThreeDigitNumber = () => {
  return `${new Date().getSeconds()}-${Math.floor(Math.random() * 900) + 100}`;
};

export const userGetByRole = (userList, role) => {
  return userList
    .map((data) => {
      if (Array.isArray(role) && role?.includes(data?.userType)) {
        return data;
      }
      if ([role, USER_TYPE.SUPPER_ADMIN]?.includes(data?.userType)) {
        return data;
      }
      return null;
    })
    .filter(Boolean);
};

export const candidateComplitePer = (batchList, batchId) => {
  try {
    const batch = batchList?.find(({ value }) => value === batchId);
    if (batch) {
      const current = moment();
      const stDate = moment(batch.stDate, "YYYY-MM-DD");
      const endDate = moment(batch.endDate, "YYYY-MM-DD");
      const complitedDays = current.diff(stDate, "days");
      const overDays = endDate.diff(stDate, "days");
      console.log("diff-------", complitedDays, overDays);

      return Math.round((complitedDays * 100) / overDays);
    }
  } catch (e) {
    return 0;
  }
};

export const batchComplitePer = (batch) => {
  try {
    if (batch) {
      const current = moment();
      const stDate = moment(batch.stDate, "YYYY-MM-DD");
      const endDate = moment(batch.endDate, "YYYY-MM-DD");
      const complitedDays = current.diff(stDate, "days");
      const overDays = endDate.diff(stDate, "days");
      console.log("diff-------", complitedDays, overDays);

      return Math.round((complitedDays * 100) / overDays);
    }
  } catch (e) {
    return 0;
  }
};

export const getCurentUserTrainerId = () => {
  let curentUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
  if (curentUser) {
    curentUser = JSON.parse(curentUser);

    return [USER_TYPE.TRAINER, USER_TYPE.SUPPER_ADMIN].includes(
      curentUser.userType
    )
      ? curentUser.userId
      : "";
  }
  return "";
};

export const employeeListObjectMakeIdLabel = (list = []) => {
  return list.map((item) => ({
    label: `${item.name.first} ${item.name.last}`,
    value: item.id,
  }));
};

export const letterAvatar = (name = "", size = 60, useColour = true) => {
  const colours = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#ecf0f1",
    "#95a5a6",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#bdc3c7",
    "#7f8c8d",
  ];

  const nameSplit = name.toUpperCase().split(" ");
  const initials =
    nameSplit.length === 1
      ? nameSplit[0].charAt(0)
      : nameSplit[0].charAt(0) + nameSplit[1].charAt(0);

  const pixelRatio = window.devicePixelRatio || 1;
  size *= pixelRatio;

  const charIndex = initials === "?" ? 72 : initials.charCodeAt(0);
  const colourIndex = (charIndex - 65) % 20;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  context.fillStyle = useColour ? colours[colourIndex] : "transparent";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = `${Math.round(canvas.width / 2.2)}px Arial`;
  context.textAlign = "center";
  context.fillStyle = useColour ? "#FFF" : "#454545";
  context.fillText(initials, size / 2, size / 1.5);

  const dataURI = canvas.toDataURL();

  return dataURI;
};

export const getLoginUserDetail = () => {
  return new Promise((resolve) => {
    const myInterval = setInterval(() => {
      const userData = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      console.log(userData, "-userData--");
      if (userData) {
        clearInterval(myInterval);
        resolve(JSON.parse(userData)); // Resolving the promise once data is found
      }
    }, 100); // You can adjust the interval time as needed
  });
};

export const handleGetStatusTextColour = (list = [], status) => {
  const res = list?.find(({ value }) => value === status);
  return res?.color;
};

export const getMultyBatchId = (batchList, batchIds) => {
  // batchList.map(()=>)
  // return userList?.find(({ email: userEmail }) => userEmail === email);
};

export const getDisplayName = () => {
  const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
  if (storedUser) {
    const user = JSON.parse(storedUser);

    if (user.loginType === LOGIN_TYPE.CANDIDATE) {
      return `${user.name}`;
    } else if (user.loginType === LOGIN_TYPE.EMPLOYEE) {
      return `${user?.name?.first} ${user?.name?.last}`;
    } else {
      return "User Name";
    }
  }
};

export function getTimePeriodPercentage(startDate, endDate) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return 0; // Not started yet
  if (now > end) return 100; // Already finished

  const percentage = ((now - start) / (end - start)) * 100;
  return `${percentage?.toFixed()}%`; // Returns percentage with 2 decimal places
}

export function calculateProfileStrength(obj = {}, requiredKeys = []) {
  try {
    const totalKeys = requiredKeys?.length;
    const presentKeys = requiredKeys?.filter((key) => key in obj)?.length || 0;

    return `${((presentKeys / totalKeys) * 100).toFixed()}%`; // Rounded to 2 decimal places
  } catch (e) {
    return 0;
  }
}

export const handleGetProjectCompletedCount = (project = [], candidate) => {
  const projects = PROJECTS_LIST?.find(
    ({ id }) => id === candidate?.liveClassId
  )?.projectList;

  // Return '0/0' if no projects or project list is not found
  if (!projects || !Array.isArray(projects)) return "0/0";

  const totalProjects = projects.length;
  const completedProjects = project.length;
  const verifiedCount = project.filter(
    ({ status }) => status === PROJECT_STATUS.APPROVAL
  ).length;
  return (
    <span>
      Completed <strong>{completedProjects}</strong> projects,{" "}
      <strong>{verifiedCount}</strong> verified by management, out of{" "}
      <strong>{totalProjects}</strong> total.
    </span>
  );
};

export const getStateById = (stateId) => {
  if (!indianStatesDistricts?.states) return "";

  const state = indianStatesDistricts.states.find(
    (state) => state.value === stateId
  );
  return state ? state.label : "";
};

export const getCityById = (stateId, districtId) => {
  if (!indianStatesDistricts?.states) return "";

  const state = indianStatesDistricts.states.find(
    (state) => state.value === stateId
  );
  if (!state || !state.districts) return "";

  const district = state.districts.find(
    (district) => district.value === districtId
  );
  return district ? district.label : "";
};

export const extractCandidateCode = (input) => {
  const str = String(input); // Convert input to string
  const match = str.match(/\d+$/); // Match digits at the end
  return match ? Number(match[0]) : 0; // Convert match to number or return 0
};
