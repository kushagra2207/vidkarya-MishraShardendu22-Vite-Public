import firebaseApp from '../Firebase/firebaseInit';
import { ref, getDatabase, get, child } from 'firebase/database';

async function getJSONFromFirebase(path) {
  try {
    const dbRef = ref(getDatabase(firebaseApp));
    const snapshot = await get(child(dbRef, path));

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data in RTDB');
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { getJSONFromFirebase };
