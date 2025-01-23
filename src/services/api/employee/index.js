import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { Toast } from "../../../services/toast";
import { DB_NAME } from "../../constants";

export const getAllEmployees = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(getFirestore(), DB_NAME.EMPLOYEE)
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

async function getLatestEmployee() {
  try {
    const db = getFirestore();
    const employeesRef = collection(db, DB_NAME?.EMPLOYEE);

    // Query to get the latest employee based on the 'createdBy.date' timestamp
    const q = query(employeesRef, orderBy("createdBy.date", "desc"), limit(1));

    const querySnapshot = await getDocs(q);

    console.log('querySnapshot.empty----',querySnapshot.empty)

    if (!querySnapshot.empty) {
      // The first document (the most recent one)
      console.log('querySnapshot.docs[0]---',querySnapshot.docs[0].data())
      const latestEmployee = querySnapshot.docs[0].data();
      const lastCode = latestEmployee.empCode; // Assuming employee code is the document ID

      // Extract the numeric part of the code
      const lastCodeNumber = parseInt(lastCode.replace("ATE", "")) || 100; // Default to 100 if parsing fails

      // Generate the new employee code
      const newCodeNumber = lastCodeNumber + 1;
      const newEmployeeCode = "ATE" + newCodeNumber.toString().padStart(3, "0");

      console.log("New Employee Code:", newEmployeeCode);
      return newEmployeeCode;
    } else {
      // If no employee found, start from ATE101
      return "ATE101";
    }
  } catch (e) {
    console.error("Error fetching employee:", e);
    const message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
}

export const createEmployee = async (body) => {
  try {
    const userReq = {
      ...body,
      empCode:await getLatestEmployee(),
      createdBy: {
        name: `Anvesh Babu`,
        user_id: "guest",
        date: serverTimestamp(),
      },
    };
    console.log('userReq----',userReq)
    const docRef = await addDoc(
      collection(getFirestore(), DB_NAME?.EMPLOYEE),
      userReq
    );
    Toast({ message: "Employee Add successfully" });
    return{id: docRef.id,...userReq}
  } catch (e) {
    console.error("Error fetching Employee's:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
