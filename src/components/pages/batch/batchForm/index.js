import { useState, useRef, useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import _ from "lodash";
import {
  NormalInput,
  NormalSelect,
  NormalButton,
  NormalCheckbox,
} from "../../../common";
import {
  COURSE_LIST,
  WEEK_LIST,
  STATUS,
  BATCH_STATUS_LIST,
} from "../../../../services/constants";
import { batchSchemaModule } from "../../../../services/module/batch";
import { employeeListObjectMakeIdLabel } from "../../../../services/helperFunctions";
import {
  createNewBatch,
  updateBatchData,
} from "../../../../redux/action/batch.action";
import { useAppDispatch } from "../../../../hooks/reducHooks";

export const BatchFrom = ({
  batchSync = null,
  employeeListData = [],
  onSucess = () => {},
  editBatchObject = null,
}) => {
  const dispatch = useAppDispatch();
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [batchFormObject, setBatchFormObject] = useState({
    ...batchSchemaModule,
    ...editBatchObject,
  });
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (!_.isEmpty(editBatchObject)) {
      const trainer = editBatchObject.trainerIds.find(
        ({ status }) => status === STATUS.ACTIVE
      );
      setBatchFormObject({ ...editBatchObject, trainerId: trainer?.trainerId });
    }
  }, [editBatchObject]);

  const handleBatchFormChange = (event) => {
    const { value, checked, type, name } = event.target;

    setBatchFormObject((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeDate = (event) => {
    const { value } = event.target;
    const day = Number(value);

    setBatchFormObject((prevFormObject) => {
      const classDays = new Set(prevFormObject.classDays);

      if (classDays.has(day)) {
        classDays.delete(day);
      } else {
        classDays.add(day);
      }

      return { ...prevFormObject, classDays: [...classDays] };
    });
  };

  const handleBatchSubmit = async () => {
    try {
      const formValid = simpleValidator.current.allValid();
      console.log("formValid-----", simpleValidator.current);
      if (formValid) {
        const { trainerId, trainerIds, ...restOfBatchForm } = batchFormObject;

        const updatedTrainerIds = [
          ...trainerIds.map((trainer) => ({
            ...trainer,
            status: STATUS.DE_ACTIVE,
            eDate: new Date(),
          })),
          {
            trainerId,
            sDate: new Date(),
            status: STATUS.ACTIVE,
          },
        ];

        const body = { ...restOfBatchForm, trainerIds: updatedTrainerIds };

        console.log("body-----", body);

        // const res = await dispatch(createNewBatch(body));
        // If needed, uncomment the next lines to handle API calls:
        const res = batchFormObject?.id
          ? await dispatch(updateBatchData(body, batchFormObject.id))
          : await dispatch(createNewBatch(body));

        onSucess();
      } else {
        console.log("body-----", batchFormObject);
        simpleValidator.current.showMessages();
        forceUpdate(1); // Consider removing this if possible
      }
    } catch (e) {
      // Better logging strategy
      console.error("Error during form submission:", e);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <NormalSelect
          label="Course"
          option={COURSE_LIST}
          value={batchFormObject.course}
          placeholder="Select Course"
          name="course"
          onChange={handleBatchFormChange}
          errorMessage={simpleValidator.current.message(
            "Course",
            batchFormObject.course,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          label="Trainer"
          option={employeeListObjectMakeIdLabel(employeeListData)}
          value={batchFormObject.trainerId}
          placeholder="Select Trainer"
          name="trainerId"
          onChange={handleBatchFormChange}
          errorMessage={simpleValidator.current.message(
            "Trainer",
            batchFormObject.trainerId,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="date"
          label="Enter Start Date"
          onChange={handleBatchFormChange}
          value={batchFormObject.stDate}
          name="stDate"
          errorMessage={simpleValidator.current.message(
            "Start Date",
            batchFormObject.stDate,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="date"
          label="Enter End Date"
          onChange={handleBatchFormChange}
          value={batchFormObject.endDate}
          name="endDate"
          errorMessage={simpleValidator.current.message(
            "End Date",
            batchFormObject.endDate,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="time"
          label="Enter Batch Start Time"
          onChange={handleBatchFormChange}
          value={batchFormObject.batSTime}
          name="batSTime"
          errorMessage={simpleValidator.current.message(
            "Batch Start Time",
            batchFormObject.batSTime,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="time"
          label="Enter Batch End Time"
          onChange={handleBatchFormChange}
          value={batchFormObject.batETime}
          name="batETime"
          errorMessage={simpleValidator.current.message(
            "Batch End Time",
            batchFormObject.batETime,
            "required"
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          //   multiple
          label="Batch Status"
          name="status"
          option={BATCH_STATUS_LIST}
          onChange={handleBatchFormChange}
          value={batchFormObject.status}
          errorMessage={simpleValidator.current.message(
            "Batch Status",
            batchFormObject.status,
            "required"
          )}
        />
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label d-flex">Class Days</label>
          {WEEK_LIST?.map(({ label, value }, i) => (
            <NormalCheckbox
              label={label}
              value={value}
              name="classDays"
              onChange={(e) => handleChangeDate(e, i)}
              checked={batchFormObject.classDays.includes(value)}
            />
          ))}
        </div>
      </div>
      <div className="col-md-12">
        <NormalButton
          className="me-2 btn-danger"
          disabled={batchSync?.isCreateUpdateLoader}
          label="Cancel"
          color="primary"
        />
        <NormalButton
          className="me-2 btn-primary"
          disabled={batchSync?.isCreateUpdateLoader}
          onClick={handleBatchSubmit}
          // eslint-disable-next-line no-constant-condition
          label={`${batchFormObject.id ? "Update" : "Save"} Changes`}
        />
      </div>
    </div>
  );
};
