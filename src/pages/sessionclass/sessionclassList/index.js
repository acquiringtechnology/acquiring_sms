import { useEffect, useState } from "react";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { SessionclassList } from "../../../components/pages";
import { getStorage } from "../../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE, STATUS } from "../../../services/constants";
import { getBatchDetailsById } from "../../../redux/action/batch.action";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
export const SessionclassListPage = () => {
  const [userDetail, setUserDetail] = useState(null);
    const dispatch = useAppDispatch();
    const batchSync = useAppSelector((state) => state.batchSync);
  useEffect(() => {
    try {
      const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const batchId = user?.batchIds?.find(
          ({ status }) => status === STATUS?.ACTIVE
        )?.id;
        if (batchId) {
          dispatch(getBatchDetailsById(batchId));
        }
        setUserDetail(user);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  return (
    <div>
      <Breadcrumb label={`Class`} icon="mdi-book-open-blank-variant" />

      <SessionclassList isBatchDetailByIdLoader={batchSync?.isBatchDetailByIdLoader} batchDetail={batchSync?.batchDetail} />
    </div>
  );
};
