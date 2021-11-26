import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyA4QGsBnRZhX5eNMNGeJhvtN8qv1evyvgM",
	authDomain: "managepro-project.firebaseapp.com",
	projectId: "managepro-project",
	storageBucket: "managepro-project.appspot.com",
	messagingSenderId: "1046783589177",
	appId: "1:1046783589177:web:a5b6aaca10c1993f6f06e8",
}

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

const projectAuth = firebase.auth()

const projectStorage = firebase.storage()

const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
