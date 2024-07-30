// userService.js
import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const addUser = async (userData, file) => {
  try {
    let fileUrl = "";

    if (file) {
      const storageRef = ref(storage, `userPictures/${userData.id}`);
      const snapshot = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, "users"), {
      ...userData,
      pictureUrl: fileUrl,
    });
    alert("successfully added user.");
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Someting is wrong!");
  }
};
const deleteUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is not provided!");
    }

    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No such user!");
    }

    let userDocRef = null;
    let userData = null;

    querySnapshot.forEach((doc) => {
      userDocRef = doc.ref; // Get the document reference
      userData = doc.data();
    });

    // Check and delete the user's picture from Firebase Storage, if it exists
    if (userData.pictureUrl) {
      try {
        // Extract the path from the pictureUrl
        const storagePath = userData.pictureUrl.split("/o/")[1].split("?")[0];
        const storageRef = ref(storage, decodeURIComponent(storagePath));

        console.log("Storage Ref:", storageRef);
        await deleteObject(storageRef);
      } catch (storageError) {
        console.error("Error deleting user picture: ", storageError);
        alert(
          "Error deleting user picture, but proceeding with user deletion."
        );
      }
    } else {
      console.warn("No picture URL found for this user.");
    }

    // Delete the user document from Firestore
    await deleteDoc(userDocRef);

    console.log("User deleted with ID: ", userId);
    alert("Successfully deleted user.");
  } catch (e) {
    console.error("Error deleting user: ", e);
    alert("Something went wrong!");
  }
};
const updateUserPayroll = async (userId, payrollData) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No such user!");
    }

    let userDocRef = null;
    let userData = null;

    querySnapshot.forEach((doc) => {
      userDocRef = doc.ref; // Get the document reference
      userData = doc.data();
    });

    const userPayroll = userData.payroll || [];
    userPayroll.push(payrollData);

    const totalTaka = Number(userData.total) + Number(payrollData.amount); // Ensure the amount is a number

    await setDoc(
      userDocRef,
      { payroll: userPayroll, total: totalTaka },
      { merge: true }
    );

    const querySnapshotMeta = await getDocs(collection(db, "metadata"));
    const meta = [];
    querySnapshotMeta.forEach((doc) => {
      meta.push({ id: doc.id, ...doc.data() });
    });
    const metaDoc = doc(db, "metadata", meta[0].id);
    await setDoc(
      metaDoc,
      { totalAll: Number(meta[0].totalAll) + Number(payrollData.amount) },
      { merge: true }
    );
    console.log("Payroll updated for user ID: ", userId);
    alert("Successfully updated!");
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const userSnapshot = await getDocs(usersCollection);
  const userList = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return userList;
};

const getUserById = async (userId) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No such user!");
    }

    let userData = null;
    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() };
    });

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
const createRule = async (rule) => {
  try {
    const docRef = await addDoc(collection(db, "rules"), rule);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const getRules = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "rules"));
    const rules = [];
    querySnapshot.forEach((doc) => {
      rules.push({ id: doc.id, ...doc.data() });
    });
    return rules;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

const updateRule = async (id, updatedRule) => {
  try {
    const ruleDoc = doc(db, "rules", id);
    await setDoc(ruleDoc, updatedRule, { merge: true });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
const deleteRule = async (id) => {
  try {
    await deleteDoc(doc(db, "rules", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
const createMetaData = async (id, updatedMeta) => {
  try {
    const metaDoc = doc(db, "metadata", id);
    await setDoc(metaDoc, updatedMeta, { merge: true });
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
const getMetaData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "metadata"));
    const meta = [];
    querySnapshot.forEach((doc) => {
      meta.push({ id: doc.id, ...doc.data() });
    });
    return meta[0];
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

export {
  addUser,
  deleteUser,
  updateUserPayroll,
  getUsers,
  getUserById,
  createRule,
  getRules,
  updateRule,
  deleteRule,
  createMetaData,
  getMetaData,
};
