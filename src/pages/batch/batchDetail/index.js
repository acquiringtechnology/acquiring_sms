import { useState ,useEffect } from "react";
import { BatchRecordList, BatchRecordForm } from "../../../components/pages";
import { Breadcrumb, NormalModal } from "../../../components/common";
import { getBatchRecordingById } from "../../../redux/action/batchRecording.action";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { useParams ,useLocation } from "react-router";
export const BatchDetail = () => {
  const [isOpenRecordingForm, setIsOpenRecordForm] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const BatchCode = queryParams.get("batchCode");
  const [batchCode,setBatchCode] = useState(BatchCode)
  const { batchId } = useParams();
    const dispatch = useAppDispatch();
    const batchRecordingSync = useAppSelector((state) => state.batchRecordingSync);


 useEffect(() => {

  handleGetBatchRecordingList()
  }, []);


  const handleGetBatchRecordingList=()=>{
    console.log('batchId----',batchId)
   dispatch(getBatchRecordingById(batchId));
  }



  const handleAddRecording = () => {
    setIsOpenRecordForm(true);
  };


const handleAddRecordingSucess=()=>{
  setIsOpenRecordForm(false)
}

  return (
    <div>
      <Breadcrumb
        label={batchCode}
        icon="mdi-group"
        onClickRightButton={handleAddRecording}
        rightButtonLabel={
          <>
            <span class="mdi mdi-group"></span> Add Recording
          </>
        }
      />

      <BatchRecordList batchRecordingData={batchRecordingSync?.batchRecordingData} />

      <NormalModal
        toggle={() => setIsOpenRecordForm(false)}
        isShow={isOpenRecordingForm}
        title="Add Recording"
      >
        <BatchRecordForm onSucess={handleAddRecordingSucess} batchRecordingSync={batchRecordingSync} />
      </NormalModal>
    </div>
  );
};
