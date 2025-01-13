import {NormalButton} from '../../../common'

export const BatchList = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card rounded border">
          <div className="card-body">
          {/* <NormalButton className='btn btn-inverse-dark btn-icon me-2 float-end' label={<i className="mdi mdi-microsoft-internet-explorer"></i>} />
          <NormalButton className='btn btn-inverse-danger btn-icon me-2 float-end' label={<i className="mdi mdi-microsoft-internet-explorer"></i>} />
         */}
            <label className="badge badge-gradient-danger rounded-pill float-end">
              Pending
            </label>
            <h4 className="card-title">ATFWD1001</h4>

            <div className="card-content mt-2">
              <div className="d-flex align-items-center mb-2">
                <p className="fw-bold mb-0  text-truncate lh-1">
                  <span className="text-batch-qu"> Trainer :</span>
                  <span className="fw-semibold text-primary ms-1">
                    Anvesh Babu
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <p className="fw-bold mb-0  text-truncate lh-1">
                  <span className="text-batch-qu"> Time :</span>
                  <span className="fw-semibold  ms-1">8:00 PM to 9:00 PM</span>
                </p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <p className="fw-bold mb-0  text-truncate lh-1">
                  <span className="text-batch-qu"> Total candidates :</span>
                  <span className="fw-semibold  ms-1">10</span>
                </p>
              </div>

              <div className="d-flex mt-4 justify-content-between text-body-tertiary fw-semibold">
                <p className="mb-2"> Progress</p>
                <p className="mb-2 text-body-emphasis">100%</p>
              </div>
              <div className="progress" style={{ height: "7px" }}>
                <div
                  className="progress-bar bg-gradient-success"
                  role="progressbar"
                  style={{ width: "25%", height: "7px" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div className="mt-4">
                <p className="mb-0 fw-bold fs-9 mb-2">
                  Started :
                  <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                    {" "}
                    03 Aug 2024
                  </span>
                </p>
                <p className="mb-0 fw-bold fs-9">
                  Deadline :{" "}
                  <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                    30 Sep 2024
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="card-footer text-center">
            <NormalButton className='btn btn-gradient-success me-2' label='Edit' />
            <NormalButton className='btn btn-gradient-danger' label='Delete' />

            </div>
        </div>
      </div>
    </div>
  );
};
