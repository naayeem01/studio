// src/lib/firebase/firestore.ts
'use server';

import { db } from './config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, getDoc, setDoc } from 'firebase/firestore';

// Generic function to add a document to a collection
export async function addDocument<T>(collectionName: string, data: T, id?: string): Promise<string> {
  if (id) {
    await setDoc(doc(db, collectionName, id), data);
    return id;
  } else {
    const docRef = await addDoc(collection(db, collectionName), data as any);
    return docRef.id;
  }
}

// Generic function to get all documents from a collection, with optional ordering
export async function getDocuments<T>(collectionName: string, orderField?: string, orderDirection: 'asc' | 'desc' = 'desc'): Promise<(T & { id: string })[]> {
  const collRef = collection(db, collectionName);
  const q = orderField ? query(collRef, orderBy(orderField, orderDirection)) : query(collRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ ...doc.data() as T, id: doc.id }));
}

// Generic function to get a single document by ID
export async function getDocument<T>(collectionName: string, id: string): Promise<(T & { id: string }) | null> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ...docSnap.data() as T, id: docSnap.id };
    } else {
        return null;
    }
}


// Generic function to update a document in a collection
export async function updateDocument<T>(collectionName: string, id: string, data: Partial<T>): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data as any);
    return true;
  } catch (error) {
    console.error(`Error updating document ${id} in ${collectionName}:`, error);
    return false;
  }
}

// Generic function to delete a document from a collection
export async function deleteDocument(collectionName: string, id: string): Promise<boolean> {
   try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document ${id} in ${collectionName}:`, error);
    return false;
  }
}
