import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  limit,
  serverTimestamp,
  query,
  deleteField,
  where,
  getDoc,
} from "firebase/firestore";
import { Toast } from "../../../services/toast";
import { extractCandidateCode } from "../../../services/helperFunctions";
import { DB_NAME, STATUS } from "../../constants";

export const getAllCandidate = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(getFirestore(), DB_NAME.CANDIDATE)
    );
    const data = querySnapshot.docs
      .map((doc) => {
        const originalCode = doc.data()?.candidateCode || "0"; // Default to "0" if undefined

        return (
          doc.data()?.name && {
            ...doc.data(),
            candidateCode: `ATC-FSWD${originalCode}`,
            id: doc.id,
            numericCandidateCode: Number(originalCode), // Store the numeric part for sorting
          }
        );
      })
      .sort((a, b) => a.numericCandidateCode - b.numericCandidateCode); // Sort by numeric value

    // data.map((doc) => {
    //   updateCandidate({...doc,password:"Acquiring@1001"},doc.testId)
    // })
    console.log("done----", data);

    return data;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

export const getIdByCandidateDetail = async (id) => {
  try {
    const snap = await getDoc(doc(getFirestore(), DB_NAME.CANDIDATE, id));
    if (!snap.exists()) return null;

    const data = snap.data();
    const batchId = data.batchIds.find(
      ({ status }) => status === STATUS.ACTIVE
    )?.id;

    return { ...data, batchId };
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

async function getLatestCandidate() {
  try {
    const db = getFirestore();
    const employeesRef = collection(db, DB_NAME?.CANDIDATE);

    // Query to get the latest employee based on the 'createdBy.date' timestamp
    const q = query(employeesRef, orderBy("candidateCode", "desc"));

    const querySnapshot = await getDocs(q);

    console.log("querySnapshot.empty----", querySnapshot.empty);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs
        .map((doc) => {
          const originalCode = doc.data()?.candidateCode || "0"; // Default to "0" if undefined
          console.log("originalCode---", originalCode);
          // const numericCode = originalCode?.replace(/\D/g, ""); // Remove non-numeric characters

          return (
            doc.data()?.name && {
              numericCandidateCode: Number(originalCode), // Store the numeric part for sorting
            }
          );
        })
        .sort((a, b) => b.numericCandidateCode - a.numericCandidateCode);
      // The first document (the most recent one)
      const maxValue = Math.max(
        ...data.map((item) => item.numericCandidateCode)
      );
      const lastCode = maxValue; // Assuming employee code is the document ID
      // Extract the numeric part of the code
      const lastCodeNumber = Number(lastCode) || 100; // Default to 100 if parsing fails

      console.log("lastCodeNumber---", lastCodeNumber);

      // Generate the new employee code
      const newCodeNumber = lastCodeNumber + 1;
      console.log("newCodeNumber---", newCodeNumber);
      const newEmployeeCode = newCodeNumber;

      console.log("New Employee Code:", newEmployeeCode);
      return newEmployeeCode;
    } else {
      // If no employee found, start from ATE101
      return "01";
    }
  } catch (e) {
    console.error("Error fetching employee:", e);
    const message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
}

export const createCandidate = async (body) => {
  try {
    const userReq = {
      ...body,
      candidateCode: await getLatestCandidate(),
      // createdBy: { name: `${fname} ${lname}`, user_id }
      password: "Acquiring@1001",
      createdBy: {
        name: `Anvesh Babu`,
        user_id: "guest",
        date: serverTimestamp(),
      },
    };

    console.log("userReq----", userReq);

    const isExists = await getDocs(
      query(
        collection(getFirestore(), DB_NAME?.CANDIDATE),
        where("phone", "==", userReq.phone)
      )
    );

    if (!isExists.empty) {
      Toast({
        type: "warn",
        message: "candidate is alredy exist",
        title: "warning",
      });
      return null;
    }

    const docRef = await addDoc(
      collection(getFirestore(), DB_NAME?.CANDIDATE),
      userReq
    );
    console.log("successfully");
    Toast({ message: "candidate Add successfully" });
    return docRef.id;
  } catch (e) {
    console.log("failer");
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

export const updateCandidate = async (body, id) => {
  try {
    const userReq = {
      ...body, // Spread the properties of 'body'
      candidateCode: extractCandidateCode(body?.candidateCode),
      updatedBy: [
        ...(body.updatedBy || []), // Ensure 'updatedBy' is an array
        {
          name: `Anvesh Babu`,
          userId: "guest",
          date: new Date().toISOString(),
        },
      ],
    };
    const { batchId } = {...userReq};
    delete userReq.id;
    delete userReq.batchId;
    delete userReq.userId;

    delete userReq.numericCandidateCode;
    const docRef = await updateDoc(
      doc(getFirestore(), DB_NAME.CANDIDATE, id),
      userReq
    );
    // await updateDoc(docRef, {
    //   fieldName: deleteField()
    // });
      console.log({...body,batchId}, "pdated successfully");
    Toast({ message: "Updated successfully tes" });
  
    return {...body,batchId};
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
