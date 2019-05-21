import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import  config  from './config'


/**
 * @class Firebase
 * @description Creates an instance of Firebase with relevant API methods
 */

class Firebase {
  constructor() {
    // Main initialization of firebase

    app.initializeApp(config)

    // Helper - Database && Server Connectivity

    this.serverValue = app.database.ServerValue

    // Helper - Email Authentication Initialization

    this.emailAuthProvider = app.auth.EmailAuthProvider

    // Firebase auth and database APIs

    this.auth = app.auth()
    this.db = app.database()

    // Instantiates a new OAuth provider for a given social app

    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
    this.twitterProvider = new app.auth.TwitterAuthProvider()
  }

  // Authorization API Methods
  // Each invokes a Firebase Auth API Function

  /**
   * @method doCreateUserWithEmailandPassword
   * @param {string} email
   * @param {string} password
   * @description Creates a new user and stores the user's email and hashed password
   *
   */

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  /**
   * @method doSignInWithEmailAndPassword
   * @param {string} email
   * @param {string} password
   * @description Will sign in an existing user and handle hashing/encoding.
   *
   */

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  /**
   * @method doSignInWithGoogle
   * @method doSignInWithFacebook
   * @method doSignInWithTwitter
   * @description Invokes the corresponding Firebase OAuth2.0 Sign-in APIs
   *
   */

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider)

  /**
   * @method doSignOut
   * @description Firebase API sign out function.
   */

  doSignOut = () => this.auth.signOut()

  /**
   * @method doPasswordReset
   * @method doPasswordUpdate
   * @description These Firebase API functions allow users to reset and update their existing passwords.
   *
   */

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  /**
   * @method doSendEmailVerification
   * @description Verifies email when user signs up with an email && password.
   */

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'https://chore-monkey-app.firebaseapp.com/'
    })

  // Helper method which merges the Firebase Authentication Storage Container with the Realtime Database API

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()

            // merges authorized admin user with dbUser
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              roles: { ADMIN: 'ADMIN' },
              ...dbUser
            }

            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // User API Methods

  // Returns a user by id
  user = uid => this.db.ref(`users/${uid}`)

  // Returns all users
  users = () => this.db.ref('users')
}

export default Firebase
