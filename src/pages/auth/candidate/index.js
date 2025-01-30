import { LoginPage } from "../login";
import { LOGIN_TYPE } from "../../../services/constants";
export const CandidateLoginPage = () => {
  return <LoginPage loginType={LOGIN_TYPE.CANDIDATE} />;
};
