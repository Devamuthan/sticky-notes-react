const admin = require('firebase-admin')

// Fetch the service account key JSON file contents
const serviceAccount = require('./sticky-notes-react-app-firebase-adminsdk-ewx0w-eebce4d622.json')

// Initialize the app with a service account, granting admin privileges
const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sticky-notes-react-app-default-rtdb.firebaseio.com'
})

