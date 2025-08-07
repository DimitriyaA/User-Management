const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const usersCollection = db.collection('users');

exports.createUser = async (userData) => {
  const id = uuidv4();
  const user = { id, ...userData };
  await usersCollection.doc(id).set(user);
  return user;
};

exports.getUserById = async (id) => {
  const doc = await usersCollection.doc(id).get();
  return doc.exists ? doc.data() : null;
};

exports.getUserByEmail = async (email) => {
  const snapshot = await usersCollection.where('email', '==', email).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
};

exports.getAllUsers = async ({ sortBy, search, page = 1, limit = 10 }) => {
  let query = usersCollection;

  if (search) {
    const snapshot = await query.get();
    let results = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const combined = `${data.firstName} ${data.lastName} ${data.email}`.toLowerCase();
      if (combined.includes(search.toLowerCase())) {
        results.push(data);
      }
    });

    if (sortBy === 'lastName') {
      results.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else if (sortBy === 'dateOfBirth') {
      results.sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth));
    }

    const start = (page - 1) * limit;
    return results.slice(start, start + parseInt(limit));
  }

  if (sortBy === 'lastName' || sortBy === 'dateOfBirth') {
    query = query.orderBy(sortBy);
  }

  const snapshot = await query.get();
  const users = snapshot.docs.map(doc => doc.data());

  const start = (page - 1) * limit;
  return users.slice(start, start + parseInt(limit));
};

exports.updateUser = async (id, data) => {
  const docRef = usersCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) return null;

  await docRef.update(data);
  const updated = await docRef.get();
  return updated.data();
};

exports.deleteUser = async (id) => {
  const docRef = usersCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) return false;

  await docRef.delete();
  return true;
};