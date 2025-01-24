import { NormalButton } from "../../../common";

export const SessionclassList = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <label class="badge badge-gradient-info float-end">
              Processing
            </label>
            <h4 className="card-title">ATFSEDB1001</h4>
            <div className="d-flex">
              <div className="d-flex align-items-center text-muted font-weight-light">
                <i className="mdi  mdi-calendar icon-sm me-2"></i>
                <span>17th Jan 2025 - 18th APR 2025</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 pe-1">
                <img
                  src="https://www.guvi.in/assets/DWZKtEay-laptop-img.webp"
                  className="mb-2 mw-100 w-100 rounded"
                  alt="image"
                />
              </div>
            </div>
            <div className="d-flex mt-5 align-items-top">
              {/* <img src="assets/images/faces/face3.jpg" className="img-sm rounded-circle me-3" alt="image"/> */}
              <div className="mb-0 flex-grow">
                <h5 className="me-2 mb-2">
                  Master Full stack development Program
                </h5>
                <div className="d-flex justify-content-between align-items-baseline">
                  <div className=" text-muted font-weight-light">
                    <i className="mdi mdi-translate icon-sm me-2"></i>
                    <span>Tamil</span>
                  </div>

                  <NormalButton
                    className="me-2 mt-3 btn-gradient-primary float-end btn-rounded btn-fw btn-sm"
                    label="View Course Content"
                    color="primary"
                  />
                  {/* </div> */}
                </div>
              </div>
              <div className="ms-auto">
                <i className="mdi mdi-heart-outline text-muted"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
