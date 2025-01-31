import { Breadcrumb, NormalModal } from "../../../components/common";
import { SessionclassDetail } from "../../../components/pages";
import { getBatchRecordingById } from "../../../redux/action/batchRecording.action";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { getBatchDetailsById } from "../../../redux/action/batch.action";
import { useParams } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";
export const SessionclassDetailPage = () => {
  const { batchId } = useParams();
  const dispatch = useAppDispatch();
  const batchRecordingSync = useAppSelector(
    (state) => state.batchRecordingSync
  );
  const batchSync = useAppSelector((state) => state.batchSync);

  useEffect(() => {
    handleGetBatchRecordingList();
  }, [batchId]);

  useEffect(() => {
   console.log('batchSync---',batchSync.batchDetail)
  }, [batchSync?.batchDetail]);

  const handleGetBatchRecordingList = () => {
    console.log('batchRecording', batchId);
    dispatch(getBatchRecordingById(batchId));
    dispatch(getBatchDetailsById(batchId));
  };

  const handleJoinClass = () => {
    console.log('handleJoinClass');
    if(batchSync?.batchDetail?.classLink){
      window.open(batchSync?.batchDetail?.classLink,'_blank');
    }else{
      Swal.fire({
        title: "Oops...",
        text: "No class link found for this session class",
        icon: "warning",
      });
    }
  };
  return (
    <div>
      <Breadcrumb onClickRightButton={handleJoinClass} rightButtonLabel='Join the class' label={batchSync.batchDetail?.batchCode} icon="mdi-book-open-blank-variant" />

      <SessionclassDetail
      batchDetail={batchSync.batchDetail}
        batchRecordingData={batchRecordingSync?.batchRecordingData}
      />
    </div>
  );
};
