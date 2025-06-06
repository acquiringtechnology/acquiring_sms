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
  where,
} from "firebase/firestore";
import { Toast } from "../../../services/toast";
import { setStorage } from "../../helperFunctions";
import {
  DB_NAME,
  LOGIN_TYPE,
  EXIST_LOCAL_STORAGE,
  CANDIDATE_COURSE_STATUS,
} from "../../constants";

export const sendLoginOtp = async (body) => {
  try {
    const q = query(
      collection(
        getFirestore(),
        body.loginType === LOGIN_TYPE.EMPLOYEE
          ? DB_NAME.EMPLOYEE
          : DB_NAME.CANDIDATE
      ),
      where("email", "==", body?.email)
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data[0];
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};

export const userSignIn = async (body) => {
  try {
    const q = query(
      collection(
        getFirestore(),
        body.loginType === LOGIN_TYPE.EMPLOYEE
          ? DB_NAME.EMPLOYEE
          : DB_NAME.CANDIDATE
      ),
      where("email", "==", body?.email)
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.size);

    if (querySnapshot.size === 0) {
      Toast({
        message: "No user found. Please enter the correct user details.",
        type: "error",
      });
      return null;
    }

    // Extract the first user data
    // Extract the first document
    const userDoc = querySnapshot.docs[0];

    const userData = userDoc.data();
    if (
      userData.status === CANDIDATE_COURSE_STATUS.DELETE &&
      body.loginType === LOGIN_TYPE.CANDIDATE
    ) {
      Toast({
        message:
          "Your login is blocked. Please contact the acquiring admin team at 9042771660.",
        type: "error",
      });
      return;
    }
    const userId = userDoc.id; // Get the document ID
    console.log("User Login Successful, Document ID:", userId);
    // Check if the password matches
      const lastLogin = new Date()
    if (userData.password === body.password) {
      // Remove password from the user data
      const { ...user } = userData;
      if (body.loginType === LOGIN_TYPE.CANDIDATE) {
      
        const candidateRef = doc(getFirestore(), DB_NAME.CANDIDATE, userId);
        await updateDoc(candidateRef, {
          // deviceId: "newDeviceId123", // key-value pair to update
         lastLogin, // you can update multiple fields
        });
      }

      Toast({ message: "User Login Successful", type: "success" });

      setStorage(
        EXIST_LOCAL_STORAGE.CURRENT_USER,
        JSON.stringify({ ...user, userId, loginType: body.loginType })
      );
      setStorage(EXIST_LOCAL_STORAGE.AUTHTOKEN, true);
      return user;
    }

    // Incorrect password
    Toast({ message: "Incorrect Password", type: "error" });
    return null;
  } catch (e) {
    console.error("Error fetching leads:", e);
    let message = e?.message || "Something went wrong";
    Toast({ message, type: "error" });
    throw e; // Propagate error to be handled by the caller
  }
};
