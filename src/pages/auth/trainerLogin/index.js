import {LoginPage} from '../login';
import { LOGIN_TYPE } from "../../../services/constants";
export const TrainerLoginPage = () => {
  return (
    <LoginPage loginType={LOGIN_TYPE.EMPLOYEE} />
    );
};
