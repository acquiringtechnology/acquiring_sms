import {Breadcrumb} from '../../components/common'
import {MyProjectStatus,MyRanking} from '../../components/pages'

export const HomePage=()=>{

    return(
        <div>
            <Breadcrumb label={`Home`} icon="mdi-home"/>
          
          <div className='row'>

             <div className='col-md-4 grid-margin stretch-card'>
                 <MyRanking/>
             </div>
             <div className='col-md-8 grid-margin stretch-card'>
                 <MyProjectStatus/>
             </div>
          </div>
        </div>
    )
}