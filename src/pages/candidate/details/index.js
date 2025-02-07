import {ProfileCard} from '../../../components/pages'
import {Breadcrumb} from '../../../components/common'
import { useEffect ,useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { getCandidateDetailById } from "../../../redux/action/candidate.action";
import { useParams } from "react-router";
export const CandidateDetailPage=()=>{
      const candidateSync = useAppSelector((state) => state.candidateSync);
        const dispatch = useAppDispatch();
    const { candidateId } = useParams();
    const [userDetail, setUserDetail] = useState(null);

  
    useEffect(() => {
      try {
 
        if (candidateId) {
            dispatch(getCandidateDetailById(candidateId))
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }, []);
     
    useEffect(() => {
       console.log('candidateSync?.candidateData---',candidateSync?.candidateData)
      }, [candidateSync?.candidateData]);

    return (
        <div>
             <Breadcrumb
                    label={candidateId?`Candidate Details`:`My Profile`}
                    icon="mdi-account"
                  />
           <ProfileCard isCandidate userDetail={candidateSync?.candidateData}/>
            {/* Add your profile page components here */}
        </div>
    )
}