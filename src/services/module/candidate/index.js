import { YES_NO_STATUS, CLASS_MODE } from "../../constants";
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
  batchIds: [],
  classStartDate: "",
  classEndDate: "",
  candidateCode:"",
  billingInfo: [
    {
      payFees: "",
      payDate: "",
      payedAccount: null,
    },
  ],
};
