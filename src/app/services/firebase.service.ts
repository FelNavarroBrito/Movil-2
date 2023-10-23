import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilSvc = inject(UtilsService);
  storage = inject(AngularFireStorage);

  // AUTENTICACION

  getAuth() {
    return getAuth();
  }

    // ACCEDER
  
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

    // CREAR USUARIO

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

    // ACTUALIZAR USUARIO

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

    // RECUPERACION DE CONTRASEÑA

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // SIGN-OUT

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilSvc.routerLink('/auth')
  }

  // BASE DE DATOS

  // OBTENER DOC DE UNA COLECCION

  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), { idField: 'id' });

  }

  // SETEAR DOCUMENTO

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // ACTUALZAR DOC

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  // OBTENER DOCUMENTO

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // AGREGAR DOC

  AddDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  // ALMACENAMIENTO FIREBASE

  // SUBIR IMAGEN

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }

  // GET RUTA IMAGEN

  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath
  }

}