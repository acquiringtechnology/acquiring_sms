import { CourseInvoiceDetail } from "../../../components/pages";
import { useEffect, useRef  } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reducHooks";
import { STATUS } from "../../../services/constants";
import { getCandidateDetailById } from "../../../redux/action/candidate.action";
import { getBatchDetailsById } from "../../../redux/action/batch.action";
import logo from "../../../assets/images/purple_logo.svg";
import logoMini from "../../../assets/images/logo-mini.svg";
import { useParams } from "react-router";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
export const CourseInvoice = () => {
  const candidateSync = useAppSelector((state) => state.candidateSync);
  const batchSync = useAppSelector((state) => state.batchSync);
  const dispatch = useAppDispatch();
  const { candidateId } = useParams();
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${new Date().getTime()}-${candidateSync?.candidateData?.name}.pdf`);
    });
  };
  useEffect(() => {
    try {
      if (candidateId) {
        dispatch(getCandidateDetailById(candidateId));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    handleGetBatchDetails();
  }, [candidateSync?.candidateData]);

  const handleGetBatchDetails = () => {
    if (candidateSync?.candidateData) {
      const batchId = candidateSync?.candidateData?.batchIds.find(
        ({ status }) => status === STATUS?.ACTIVE
      )?.id;
      if (batchId) {
        dispatch(getBatchDetailsById(batchId));
      }
    }
  };

  return (
    <div>
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row shadow">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <a class="navbar-brand brand-logo" href="index.html">
            <img alt="logo" src={logo} />
          </a>
          <a class="navbar-brand brand-logo-mini" href="index.html">
            <img alt="logo" src={logoMini} />
          </a>
        </div>
        <button onClick={downloadPDF} className="btn btn-outline-primary btn-icon-text btn-sm"><i class="mdi mdi-download btn-icon-prepend"></i> Download</button>
      </nav>
      <div style={{marginTop:100}}>
      <CourseInvoiceDetail
       ref={pdfRef}
        batchDetail={batchSync?.batchDetail}
        candidateData={candidateSync?.candidateData}
      />
    </div>
    </div>
  );
};
