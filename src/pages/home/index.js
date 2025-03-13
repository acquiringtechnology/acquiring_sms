import { Breadcrumb } from "../../components/common";
import { MyProjectStatus, MyRanking ,LeadStatusCountCard } from "../../components/pages";
import { getAllCandidates } from "../../redux/action/candidate.action";
import { useAppDispatch, useAppSelector } from "../../hooks/reducHooks";
import { getStorage } from "../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE, LOGIN_TYPE } from "../../services/constants";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [userDetail, setUserDetail] = useState(null);
    const dispatch = useAppDispatch();
    const candidateSync = useAppSelector((state) => state.candidateSync);

  useEffect(() => {
    handleGetBatchRecordingList();
    getCandidateListData()
  }, []);

  const handleGetBatchRecordingList = () => {
    let curentUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
    if (curentUser) {
      curentUser = JSON.parse(curentUser);
      setUserDetail(curentUser);
    }
  };

    function getCandidateListData() {
  
      if(candidateSync?.candidateListData?.length === 0 || !candidateSync?.candidateListData){
        dispatch(getAllCandidates());
      }
   
    }

  return (
    <div>
      <Breadcrumb label={`Home`} icon="mdi-home" />
      {userDetail?.loginType === LOGIN_TYPE.CANDIDATE && (
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <MyRanking />
          </div>
          <div className="col-md-8 grid-margin stretch-card">
            <MyProjectStatus />
          </div>
        </div>
      )}

      {userDetail?.loginType === LOGIN_TYPE.EMPLOYEE && (
        <div className="row">
          <div className="col-md-12">
            <LeadStatusCountCard candidateListData={candidateSync?.candidateListData || []} />
          </div>
          
        </div>
      )}
    </div>
  );
};
