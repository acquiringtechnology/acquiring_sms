import { useState, useEffect, useRef } from "react";
import { NormalInput, NormalButton } from "../../../common";
import { recordingClassSchemaModule } from "../../../../services/module/recordingClass";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SimpleReactValidator from "simple-react-validator";
import { useParams } from "react-router";
export const BatchRecordForm = () => {
  const { batchId } = useParams();
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
  const [recordingClassFormObject, setRecordingClassFormObjectFormObject] =
    useState({
      ...recordingClassSchemaModule,
    });
  const [, forceUpdate] = useState();

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name },
    } = event;

    setRecordingClassFormObjectFormObject({
      ...recordingClassFormObject,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleleadSubmit = () => {
    try {
      const formValid = simpleValidator.current.allValid();
      if (formValid) {
        const reqBody = {
          ...recordingClassFormObject,
          batchId,
        };
        console.log("reqBody----", reqBody);
        //   const recClassRes = await createRecordingClass(reqBody);
        //   onSucess(reqBody, recClassRes);
        //   setIsLoadingFrom(false);
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <NormalInput
          label="Enter Class Date"
          name="date"
          type="date"
          onChange={handleInputChange}
          value={recordingClassFormObject.date}
          errorMessage={simpleValidator.current.message(
            "Class Date",
            recordingClassFormObject.date,
            "required"
          )}
        />
      </div>
      <div className="col-md-12">
        <NormalInput
          label="Enter Class section url"
          name="recClassLink"
          onChange={handleInputChange}
          value={recordingClassFormObject.recClassLink}
          errorMessage={simpleValidator.current.message(
            "Class section url",
            recordingClassFormObject.recClassLink,
            "required|url"
          )}
        />
      </div>
      <div className="col-md-12 mb-4">
        <label className="form-label fw-medium">Topic</label>
        <CKEditor
          row="5"
          editor={ClassicEditor}
          data={recordingClassFormObject.topic}
          name="topic"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setRecordingClassFormObjectFormObject({
              ...recordingClassFormObject,
              topic: data,
            });
          }}
        />
        <div className="form-text text-danger">
          {simpleValidator.current.message(
            "Topic",
            recordingClassFormObject.topic,
            "required"
          )}
        </div>
        {/* {JSON.stringify(data)} */}
      </div>
      <div className="col-md-12">
        <NormalButton
          className="me-2 btn-gradient-danger"
          //   disabled={isLoadingFrom}
          label="Cancel"
          color="primary"
        />
        <NormalButton
          className="me-2 btn-gradient-primary"
          //   isLoader={isLoadingFrom}
          onClick={handleleadSubmit}
          label="Save Changes"
        />
      </div>
    </div>
  );
};
