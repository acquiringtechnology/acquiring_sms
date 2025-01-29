import { Breadcrumb, NormalModal } from "../../../components/common";
import { SessionclassDetail } from "../../../components/pages";
import { getBatchRecordingById } from "../../../redux/action/batchRecording.action";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { useParams } from "react-router";
import { useEffect } from "react";
export const SessionclassDetailPage = () => {
  const { batchId } = useParams();
  const dispatch = useAppDispatch();
  const batchRecordingSync = useAppSelector(
    (state) => state.batchRecordingSync
  );

  useEffect(() => {
    handleGetBatchRecordingList();
  }, [batchId]);

  const handleGetBatchRecordingList = () => {
    console.log('batchRecording', batchId);
    dispatch(getBatchRecordingById(batchId));
  };
  return (
    <div>
      <Breadcrumb label={`ATFSEDB1001`} icon="mdi-book-open-blank-variant" />

      <SessionclassDetail
        batchRecordingData={batchRecordingSync?.batchRecordingData}
      />
    </div>
  );
};
