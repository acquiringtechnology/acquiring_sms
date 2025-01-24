import { useState } from "react";
import { BatchList, BatchRecordForm } from "../../../components/pages";
import { Breadcrumb, NormalModal } from "../../../components/common";

export const BatchDetail = () => {
  const [isOpenRecordingForm, setIsOpenRecordForm] = useState(false);

  const handleAddRecording = () => {
    setIsOpenRecordForm(true);
  };

  return (
    <div>
      <Breadcrumb
        label={`ATEFSWD1001`}
        icon="mdi-group"
        onClickRightButton={handleAddRecording}
        rightButtonLabel={
          <>
            <span class="mdi mdi-group"></span> Add Recording
          </>
        }
      />

      <NormalModal
        togle={() => setIsOpenRecordForm(false)}
        isShow={isOpenRecordingForm}
        title="Add Recording"
      >
<BatchRecordForm/>

      </NormalModal>
    </div>
  );
};
