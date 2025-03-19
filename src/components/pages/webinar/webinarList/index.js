import {NormalButton} from '../../../common'
export const WebinarList = () => {
  return (
    <div className="row">
      <div className="col-md-4 col-sm-12 col-lg-3">
        <div className="card">
          <img
            className="card-img-top"
            alt="fsd"
            src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/112/570/original/LP_%282%29.webp?1741179428"
          />

          <div className="card-body">
            <h4 className="card-title">Roadmap to Full Stack Web Devlopment</h4>
            <div className="mt-4">
              <p className="mb-0 fw-bold fs-9 mb-2">
                Star time :
                <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                  {" "}
                  17 Jan 2025 7:30 PM (IST)
                </span>
              </p>
              <p className="mb-0 fw-bold fs-9">
                End time :{" "}
                <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                  17 Jan 2025 7:30 PM (IST)
                </span>
              </p>
            </div>
          </div>
          <div className="card-footer text-center">
<NormalButton className='btn-sm btn-primary' label='Edit' />
<NormalButton className='btn-danger btn-sm ms-2' label='Delete' />
            </div>
        </div>
      </div>
    </div>
  );
};
