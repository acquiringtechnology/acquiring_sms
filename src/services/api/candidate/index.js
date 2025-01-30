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
  where,
} from "firebase/firestore";
import { Toast } from "../../../services/toast";
import { DB_NAME } from "../../constants";

export const getAllCandidate = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(getFirestore(), DB_NAME.CANDIDATE)
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // data.map((doc) => {
    //   console.log({...doc,password:"Acquiring@1001"});
    //   updateCandidate({...doc,password:"Acquiring@1001"},doc.id)
    // })
    console.log('done----',data);

    return data;
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
    const q = query(employeesRef, orderBy("createdBy.date", "desc"), limit(1));

    const querySnapshot = await getDocs(q);

    console.log("querySnapshot.empty----", querySnapshot.empty);

    if (!querySnapshot.empty) {
      // The first document (the most recent one)
      console.log("querySnapshot.docs[0]---", querySnapshot.docs[0].data());
      const latestEmployee = querySnapshot.docs[0].data();
      const lastCode = latestEmployee.empCode; // Assuming employee code is the document ID

      // Extract the numeric part of the code
      const lastCodeNumber = parseInt(lastCode.replace("ATC", "")) || 100; // Default to 100 if parsing fails

      // Generate the new employee code
      const newCodeNumber = lastCodeNumber + 1;
      const newEmployeeCode = "ATC" + newCodeNumber.toString().padStart(3, "0");

      console.log("New Employee Code:", newEmployeeCode);
      return newEmployeeCode;
    } else {
      // If no employee found, start from ATE101
      return "ATC101";
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
    // Toast({ message: "Lead Add successfully" });
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
    Toast({ message: "Candidate Updated successfully" });
    console.log(docRef);
    return docRef;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
