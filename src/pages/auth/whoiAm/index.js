import "./whoiAm.scss";
import learning from "../../../assets/images/auth/learning.png";
import trainear from "../../../assets/images/auth/trainear.png";
import purple_logo from "../../../assets/images/purple_logo.svg";
export const WhoIAmPage = () => {
  return (
    <div className="row whoiAm">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12 text-center">
            <img src={purple_logo} className="brand-logo" />
            <h2> Welcome to Acquiring Technology.</h2>
            <p>
              Select your user type and enter your details if you already have
              an account.
            </p>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center mt-5">
          <div className="whoiAm-container">
            <div className="d-flex flex-row mb-3">
              <div className="me-2 text-center whoiAm-card card border  w-50">
                <div className="card-body">
                  <img src={learning} className="img-fluid" />
                  <h4 class="title">Learner</h4>
                  <p class="mb-0">For Induviduals</p>
                </div>
              </div>
              <div className="mr-2 text-center whoiAm-card card border  w-50">
                <div className="card-body">
                  <img src={trainear} className="img-fluid" />
                  <h4 class="title">Learner</h4>
                  <p class="mb-0">For Induviduals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
