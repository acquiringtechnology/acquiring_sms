import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Toast } from "../../../services/toast";
import { DB_NAME } from "../../constants";
// Toast({ type: 'success', message: 'user created successfully', title: 'Error' })
export const getAllLeads = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(getFirestore(), DB_NAME.COURSE_ENQUIRY)
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

export const createLead = async (body) => {
  try {
    const userReq = {
      ...body,
      // createdBy: { name: `${fname} ${lname}`, user_id }
      createdBy: [{ name: `Anvesh Babu`, user_id: "guest" }],
    };
    const docRef = await addDoc(
      collection(getFirestore(), DB_NAME?.COURSE_ENQUIRY),
      userReq
    );
    Toast({ message: "Lead Add successfully" });
    return docRef.id;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

export const updateLead = async (body, id) => {
  try {
    const userReq = {
      ...body, // Spread the properties of 'body'
      updatedBy: [
        ...(body.updatedBy || []), // Ensure 'updatedBy' is an array
        {
          name: `Anvesh Babu`,
          userId: "guest",
          date: new Date().toISOString(),
        },
      ],
    };
    delete userReq.id;
    const docRef = await updateDoc(
      doc(getFirestore(), DB_NAME.COURSE_ENQUIRY, id),
      userReq
    );
    Toast({ message: "Lead Updated successfully" });
    console.log(docRef);
    return docRef;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

export const deleteLead = async (body) => {
  try {
    const docRef = await deleteDoc(
      doc(getFirestore(), DB_NAME?.COURSE_ENQUIRY, body)
    );

    console.log("docRef--", docRef);

    Toast({ message: "Lead successfully Deleted" });
    return docRef;
  } catch (e) {
    // eslint-disable-next-line no-undef
    const message = error?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e;
  }
};
