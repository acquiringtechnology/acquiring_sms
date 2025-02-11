
import { NormalButton } from '../../../common';
import {useNavigate} from 'react-router'
import'./quizeComplite.scss'


import congIng from '../../../../assets/images/cong.png';
export const QuizeComplite = ({quizResultDetail=null,quizId=null}) => {
    const navigate = useNavigate();

    return (
        <div className={`container text-center mt-5 quizeCompliteContiner`}>

            <div className="row">
                <div className="col-md-12 mb-5">
                    <h4 className="quizeTitle">Result</h4>
                    <h4 className='mb-5'>{quizResultDetail?.correct || 0}/{quizResultDetail?.total}</h4>
                    <NormalButton className='btn-lg btn-primary' onClick={() => navigate('/atQuiz')} label='Go to Main Page' />
                </div>
                <div className="col-md-12">
                    <img className='img-fluid' alt='congratulations' src={congIng} />

                </div>
            </div>


        </div>




    )

}