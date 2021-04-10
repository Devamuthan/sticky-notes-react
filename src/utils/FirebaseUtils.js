import firebase from 'firebase'

// Defining the configuration variables
let firebaseConfig = {
    apiKey: 'AIzaSyCYCtu4FLzbbty4IAZvHryJkEWRG-mir1I',
    authDomain: 'sticky-notes-react-app.firebaseapp.com',
    databaseURL: 'https://sticky-notes-react-app-default-rtdb.firebaseio.com',
    projectId: 'sticky-notes-react-app',
    storageBucket: 'sticky-notes-react-app.appspot.com',
    messagingSenderId: '20257188997',
    appId: '1:20257188997:web:677a1891db8ab3c3e2cdec',
    measurementId: 'G-RW7JQ9Z2E1'
}

// Initializing the firebase app
firebase.initializeApp(firebaseConfig)

// Exporting the firebase app
export default firebase