import { useRef, useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { NormalInput, NormalButton } from "@/components/common";
import SimpleReactValidator from "simple-react-validator";

export const WebinarOtpVerify = ({
  toggle,
  isOpen,
  webinarEnrolledFormObj,
  webinearEnrolledOtpVerify,
  otpVerifySucess,
  webinearEnrolledOtpResend
}) => {
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState(0);
  const [isFormLoder, setIsFormLoder] = useState(false);
  const [isOtpResendLoder, setIsOtpResendLoder] = useState(false);
  const [isOtpVeSucessrified, setIsOtpVeSucessrified] = useState(false);
  const [otpFromObj, setOtpFromObj] = useState({
    otpCode: "",
  });

  const handleOtpInputChange = (event) => {
    const {
      target: { value, checked, type, name },
    } = event;

    setOtpFromObj({
      ...otpFromObj,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const formValid = validator.current.allValid();
      if (formValid) {
        // webinearEnrolledOtpVerify();

        setIsFormLoder(true);

        const webinarEnrolledOtpVerifiedReq = await webinearEnrolledOtpVerify(
          otpFromObj,
          webinarEnrolledFormObj?.id
        );
        setIsFormLoder(false);
        // webinarEnrolledOtpVerifiedData
        const { status } = webinarEnrolledOtpVerifiedReq;
        if (status) {
       
          setIsOtpVeSucessrified(true);
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      setIsFormLoder(false);
      // console
    }
  };

  const handleResendOtp = async () => {
   try{
    setIsOtpResendLoder(true);

    const body ={
phone: webinarEnrolledFormObj.phone
    }

    const courseEnquiryOtpResendReq = await webinearEnrolledOtpResend(body,
        webinarEnrolledFormObj?.id
    );
    setIsOtpResendLoder(false);
   } catch (e) {
    setIsOtpResendLoder(false);
    // console
  }
  };

  const handleSucess=()=>{
    setIsOtpVeSucessrified(false);
    otpVerifySucess();
    setOtpFromObj({
        otpCode:""
    })
  }
  


  return (
    <Modal
      isOpen={isOpen}
      className={`modal-dialog-centered`}
      backdrop={"static"}
      toggle={toggle}
    >
      <div className="modal-header bg-primary text-white">
        <h5 className="modal-title ">Verify OTP</h5>
        <button
          type="button"
          onClick={toggle}
          className="btn-close text-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <ModalBody>
        <div className="row">
        {isOtpVeSucessrified ? (
            <div className="col-md-12">
              <div class="alert alert-success" role="alert">
                You have successfully registered for this Webinar.
              </div>
            </div>
          ) : (
            <div className="col-12">
            <NormalInput
              placeholder="Enter the OTP to verify and proceed"
              title={`OTP sent to ${webinarEnrolledFormObj?.phone}`}
              onChange={handleOtpInputChange}
              name="otpCode"
              errorMessage={validator.current.message(
                "OTP",
                otpFromObj.otpCode,
                "required|min:4|max:4|numeric"
              )}
              value={otpFromObj.otpCode}
            />
            {isOtpResendLoder ? (
              <div
                class="float-end  spinner-border text-primary spinner-border-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span
                className="float-end text-decoration-underline cursor-pointer"
                onClick={handleResendOtp}
                // style={}
              >
                Resend OTP
              </span>
            )}
          </div>
          )}

         
          <div className="col-md-12 text-center">
            {!isOtpVeSucessrified && (
              <NormalButton
                className="btn btn-primary btn-sm w-100 mt-2"
                type="submit"
                style={{ minHeight: "34px" }}
                title="Proceed"
                isLoader={isFormLoder}
                onClick={handleFormSubmit}
              />
            )}

            {isOtpVeSucessrified && (
              <NormalButton
                className="btn btn-primary px-4 mt-2"
                type="submit"
                title="Ok"
                isLoader={isFormLoder}
                onClick={handleSucess}
              />
            )}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
