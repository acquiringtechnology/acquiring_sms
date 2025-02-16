import React, { useImperativeHandle } from "react";
import "./certificate.scss";
import certificate_bg from "../../../../assets/images/certificate/certificate_bg.svg";
import logo from "../../../../assets/images/certificate/logo.svg";
import * as htmlToImage from "html-to-image";

export const CertificateDoc = React.forwardRef((props, ref) => {
  const handleDownload = () => {
    // handlePDFDownload()
    handleIMGDownload();
  };

  const handleIMGDownload = () => {
    const element = document.getElementById("printElement");
    htmlToImage
      .toJpeg(element, { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      });
  };

  useImperativeHandle(ref, () => ({
    handleDownload,
  }));

  // Inline styles for React
  const styles = {
    certificateContainer: {
      backgroundColor: "#fff",
      width: "100%",
      height: "100%",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      textAlign: "center",
    },
    logo: {
      width: "237px",
      marginTop: "5rem",
    },
    heading: {
      fontSize: "4rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      background:
        "linear-gradient(96deg, rgba(191,25,34,1) 0%, rgba(11,27,31,1) 100%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
    },
    subHeading: {
      color: "rgba(18, 18, 18, 0.3)",
      fontSize: "2.5rem",
    },
    candidateName: {
      color: "rgba(190, 154, 69, 1)",
      fontSize: "8rem",
      fontFamily: '"Damion", serif',
      fontStyle: "normal",
    },
    candidateNameSpan: {
      borderBottom: "5px dashed",
      padding: "0 8rem",
    },
    certificateCoursename: {
      color: "rgba(18, 18, 18, 0.3)",
    },
    container: {
      width: "80%",
      margin: "0 auto",
    },
    founderSigSpan: {
      borderBottom: "5px dashed #7D141D",
      padding: "0 8rem",
    },
    textApp: {
      color: "#7D141D",
    },
  };

  return (
    <div
      className="certificate-container"
      id="printElement"
      style={styles.certificateContainer}
    >
      <div className="card rounded-0">
        <img src={certificate_bg} className="card-img rounded-0" alt="..." />
        <div className="card-img-overlay rounded-0">
          <div className="row">
            <div className="col-12">
              <img src={logo} className="logo" style={styles.logo} />
            </div>
          </div>
          <div className="continer" style={styles.container}>
            <div className="row mt-5">
              <div className="col-12">
                <h1 className="heading" style={styles.heading}>
                  CERTIFICATE
                </h1>
                <h4 className="sub-heading" style={styles.subHeading}>
                  of completion This certificate is awarded to
                </h4>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <h1 className="candidate-name" style={styles.candidateName}>
                  <span style={styles.candidateNameSpan}>Arun Raj</span>
                </h1>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <h1 className="certificate-id">CERTIFICATE ID: ATFSWDB1001</h1>
                <h1
                  className="certificate-coursename"
                  style={styles.certificateCoursename}
                >
                  Completed course in Full Stack Development at <br />
                  Acquiring Technology
                </h1>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <h1 className="founder-sig mb-1">
                  <span style={styles.founderSigSpan}></span>
                </h1>
                <h2 className="text-app" style={styles.textApp}>
                  Jayashree
                  <br />
                  Founder & CEO
                </h2>
              </div>
              <div className="col-6">
                <h1 className="founder-sig mb-1">
                  <span style={styles.founderSigSpan}>17 JAN 2025</span>
                </h1>
                <h2 className="text-app" style={styles.textApp}>
                  DATE
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
