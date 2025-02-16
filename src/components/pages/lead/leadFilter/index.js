import { NormalSearch, NormalSelect, NormalButton, NormalInput } from "../../../common";
import {
  LEAD_TYPE_LIST,
  COURSE_ENQUIRY_STATUS_LIST,
  COURSE_ENQUIRY_STATUS,
} from "../../../../services/constants";
import { useState } from "react";
import Swal from "sweetalert2";
import { createCandidate } from "../../../../services/api/candidate";
import { candidateSchemaModule } from "../../../../services/module/candidate";

export const LeadFilter = ({ onChange = () => {}, leadListData = [] }) => {
  const [filterObject, setFilterObject] = useState({
    name: "",
    branch: "",
    leadFrom: "",
    leadType: "",
    status: "",
    createdBy:""
  });

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name },
    } = event;

    const filterValue = {
      ...filterObject,
      [name]: type === "checkbox" ? checked : value,
    };

    setFilterObject(filterValue);

    onChange(filterValue);
  };

//   function getATCCode(input) {
//     if (typeof input === 'number' && input > 0) {
//         let formattedInput = input < 10 ? `0${input}` : input;
//         return `ATC-FSWD${formattedInput}`;
//     }
//     return 'Invalid input';
// }

  const handleClearFilter = () => {
    const filterValue = {
      name: "",
      branch: "",
      leadFrom: "",
      status: "",
      leadType: "",
    };
    onChange(filterValue);
    setFilterObject(filterValue);
  };

  const handleMoveLeadToCandidate = async () => {
    const joinedList = leadListData?.filter(
      ({ status }) => status === COURSE_ENQUIRY_STATUS.JOINED
    );
    // 7 112

    const latestDuplicates = await findLatestDuplicates(joinedList);
    // const latestDuplicatessec = findLatestDuplicates(latestDuplicates);
    console.log(
      latestDuplicates,
      "-------latestDuplicates"
    );
    // latestDuplicates.forEach( async (data, i) => {
    //   let candidateData = {
    //     ...candidateSchemaModule,
    //     ...data,
    //     leadId: data.id,
    //     comments:[],
    //     updatedBy:[],
    //     createdBy:{},
    //     candidateCode:getATCCode(i++),
    //     batchIds:[
    //       {
    //         id:'DYP3pbTSNXmNpMB5gGSz',
    //         trainerId:"85WmhADQdeKjMVcHoHXf",
    //         sDate: new Date(),
    //         status: 1,
    //         eDate:"",
    //         totfees:0
    //       }
    //     ]
    //   };
    // await  createCandidate(candidateData)
    //   console.log("candidateData---", candidateData);
    // });

    if (!joinedList && joinedList?.length === 0) {
      console.warn("Join list is empty");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: `You have selected ${joinedList?.length} lead(s). Do you want to move these leads to candidates?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Move it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(deleteLeadData(id));
      }
    });
  };

  // Function to find the latest duplicates using forEach
  const findLatestDuplicates = (arr) => {
    const seen = [];
    let latestDuplicates = [];

    // Iterate over the array in reverse order using forEach
    arr.reverse().forEach((item) => {
      const key = `${item.phone}-${item.name}`; // Combine phone and name to form a unique key
      if (seen.includes(key)) {
        // latestDuplicates.push(item); // If we've already seen this key, it's a duplicate
      } else {
        seen.push(key); // Mark this combination as seen
        latestDuplicates.push(item); // Ma
      }
    });

    // Return duplicates in reverse order (from latest to earliest)
    return latestDuplicates.reverse();
  };
  return (
    <div className="row">
      <div className="col-md-3">
        <NormalSearch
          placeholder="Name"
          name="name"
          value={filterObject.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          label="Status"
          name="status"
          value={filterObject.status}
          onChange={handleInputChange}
          option={COURSE_ENQUIRY_STATUS_LIST}
        />
      </div>

      <div className="col-md-2">
        <NormalInput
          option={LEAD_TYPE_LIST}
          type='month'
          isLabel={false}
          name="createdBy"
          value={filterObject.createdBy}
          onChange={handleInputChange}
          // label="Select Month"
        />
      </div>
      {/* <div className="col-md-2">
        <NormalSelect
          option={LEAD_TYPE_LIST}
          isLabel={false}
          name="leadType"
          value={filterObject.leadType}
          onChange={handleInputChange}
          label="Lead Type"
        />
      </div> */}
      <div className="col-md-1">
        {/* <NormalButton label="Search" /> */}
        <NormalButton
          className=" ms-3 btn btn-secondary"
          onClick={handleClearFilter}
          label="Clear"
        />
      </div>
      <div className="col-md-3">
        {/* <NormalButton label="Search" /> */}
        <NormalButton
          className=" ms-3 btn btn-primary btn-icon-text"
          onClick={handleMoveLeadToCandidate}
          label={
            <>
              <span className="mdi mdi-account-arrow-right"></span> Move Lead to
              Candidate
            </>
          }
        />
      </div>
    </div>
  );
};
