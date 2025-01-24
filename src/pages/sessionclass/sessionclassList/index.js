import { Breadcrumb, NormalModal } from "../../../components/common";
import { SessionclassList} from "../../../components/pages";
export const SessionclassListPage = () => {
  return (
    <div>
      <Breadcrumb label={`Class`} icon="mdi-book-open-blank-variant" />

      <SessionclassList/>
    </div>
  );
};
