import {NormalInput} from '../../../common';
import {useRef ,useState} from 'react';
import SimpleReactValidator from "simple-react-validator";

export const WebinarsRegisterForm =()=>{
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "error-message" })
  );
    const [, forceUpdate] = useState();
     const [webinarFormObject, setWebinarFormObject] = useState({
        // ...batchSchemaModule,
        // ...editBatchObject,
      });

const handleInputFormChange=()=>{

}


  return(
   <div className='row'>

    <div className='col-md-6 '>
    <NormalInput
          type="time"
          label="Enter Batch End Time"
          onChange={handleInputFormChange}
          value={webinarFormObject.batETime}
          name="batETime"
          errorMessage={simpleValidator.current.message(
            "Batch End Time",
            webinarFormObject.batETime,
            "required"
          )}
        />
    </div>

   </div>
  )
}