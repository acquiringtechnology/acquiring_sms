
import { NormalButton } from '../../../common';
import getStart from '../../../../assets/images/get-start.svg';
import  './getStartQuize.scss'

export const GetStartQuize = (props) => {

let {

onQuizeStatusChange=()=>{}

} =props;


    return (
        <div className={`container text-center mt-5 getStartQuizeContiner`}>

            <div className="row">
                <div className="col-md-12 mb-5">
                <img className={`img-fluid mb-2 getStartQuizeImage`} alt='Get Start' src={getStart} />
                    <h4 className="quizeTitle">Ready to Take Test?</h4>

                    <p className='mb-5'>Make sure you have a good and stable internet connection. <br/> Do not refresh, reload or press back button while taking test Dont switch the tab while taking test</p>

                    <NormalButton className='btn-lg btn-primary' label='Get Start' onClick={()=>onQuizeStatusChange(1)} />
                </div>
           
            </div>


        </div>




    )

}