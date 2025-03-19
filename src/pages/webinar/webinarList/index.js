import { WebinarList,WebinarsRegisterForm } from "../../../components/pages";
import { Breadcrumb ,NormalModal} from "../../../components/common";

export const WebinerListPage = () => {
  return (
    <>
    <Breadcrumb label={`Webiner`} icon="mdi-google-classroom" />
    <WebinarList />

    <NormalModal isShow={true}>
        <WebinarsRegisterForm/>
    </NormalModal>
    </>
  )
};
