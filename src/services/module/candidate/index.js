import { YES_NO_STATUS, CLASS_MODE, PROJECT_STATUS } from "../../constants";
import { leadSchemaModule } from "../lead";

export const candidateSchemaModule = {
  ...leadSchemaModule,
  payedfees: 0,
  liveCourseId: "",
  totfees: 0,
  jobStatus: YES_NO_STATUS.YES,
  projectStatus: YES_NO_STATUS.NO,
  classMode: CLASS_MODE.ONLINE,
  gitAccountId: "",
  gitAccount: YES_NO_STATUS.NO,
  projectLink: "",
  projects: [
    {
      projectLink: "",
      mark: "",
      gitLink: "",
      id: "",
      status: PROJECT_STATUS.NOT_APPROVAL,
    },
  ],
  batchIds: [],
  classStartDate: "",
  password: "",
  classEndDate: "",
  candidateCode: "",
  paymentDueDate:"",
  billingInfo: [
    {
      payFees: "",
      payDate: "",
      payedAccount: null,
      payedRef: null,
    },
  ],
};
