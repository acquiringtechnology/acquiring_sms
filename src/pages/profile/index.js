import {ProfileCard} from '../../components/pages'
import {Breadcrumb} from '../../components/common'
import { useEffect ,useState } from 'react';
import { getStorage } from "../../services/helperFunctions";
import { EXIST_LOCAL_STORAGE } from "../../services/constants";

export const ProfilePage=()=>{

    const [userDetail, setUserDetail] = useState(null);

  
    useEffect(() => {
      try {
        const storedUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserDetail(user);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }, []);

    return (
        <div>
             <Breadcrumb
                    label={`My Profile`}
                    icon="mdi-account"
                  />
           <ProfileCard userDetail={userDetail}/>
            {/* Add your profile page components here */}
        </div>
    )
}