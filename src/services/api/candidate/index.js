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
import { DB_NAME } from "../../constants";

export const getAllCandidate = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(getFirestore(), DB_NAME.CANDIDATE)
    );
    const data = querySnapshot.docs
      .map((doc) => {
        const originalCode = doc.data()?.candidateCode || "0"; // Default to "0" if undefined
        const numericCode = originalCode.replace(/\D/g, ""); // Remove non-numeric characters

        return {
          ...doc.data(),
          candidateCode: `ATC-FSWD${numericCode}`,
          id: doc.id,
          numericCandidateCode: Number(numericCode), // Store the numeric part for sorting
        };
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
    if (snap.exists()) return snap.data();
    else return null;
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
    const q = query(employeesRef, orderBy("candidateCode", "desc"), limit(1));

    const querySnapshot = await getDocs(q);

    console.log("querySnapshot.empty----", querySnapshot.empty);

    if (!querySnapshot.empty) {
      // The first document (the most recent one)
      console.log("querySnapshot.docs[0]---", querySnapshot.docs[0].data());
      const latestEmployee = querySnapshot.docs[0].data();
      const lastCode = latestEmployee.candidateCode; // Assuming employee code is the document ID
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
      doc(getFirestore(), DB_NAME.CANDIDATE, id),
      userReq
    );
    // await updateDoc(docRef, {
    //   fieldName: deleteField()
    // });
    Toast({ message: "Updated successfully" });
    console.log(docRef, "pdated successfully");
    return body;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
