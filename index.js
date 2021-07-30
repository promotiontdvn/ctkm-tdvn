// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

import * as firebaseui from 'firebaseui';

// Document elements
const signinButton = document.getElementById('sign-in');

const firebaseConfig = {
  apiKey: 'AIzaSyBmZyM7IRxOgqyddLRdq7Kr9k7QzOlA1rs',
  authDomain: 'promotion-vn.firebaseapp.com',
  projectId: 'promotion-vn',
  storageBucket: 'promotion-vn.appspot.com',
  messagingSenderId: '376493899244',
  appId: '1:376493899244:web:d0030f9cc6b2990fcb14c9',
  measurementId: 'G-MSK0TLE24Q'
};

firebase.initializeApp(firebaseConfig);

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      var user = authResult.user;
      var credential = authResult.credential;
      var isNewUser = authResult.additionalUserInfo.isNewUser;
      var providerId = authResult.additionalUserInfo.providerId;
      var operationType = authResult.operationType;
      return true;
    },
    signInFailure: function(error) {
      return handleUIError(error);
    }
  },
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  queryParameterForWidgetMode: 'mode',
  queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInFlow: 'popup',

  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image',
        size: 'invisible',
        badge: 'bottomleft'
      }
    }
  ],
  immediateFederatedRedirect: false
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Listen to Signin button clicks
signinButton.addEventListener('click', () => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
    window.location.reload(false);
  } else {
    ui.start('#firebaseui-container', uiConfig);
  }
});

// Listen to the current Auth state
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    signinButton.textContent = 'Thoát';
    const render = document.getElementById('render');
    render.innerHTML = promo1;
  } else {
    signinButton.textContent = 'Đăng nhập để tham gia các CTKM';
    ui.start('#firebaseui-container', uiConfig);
  }
});

var promo1 = `    
<iframe src="https://forms.office.com/Pages/ResponsePage.aspx?id=62RipKCYDkqpMX3lWybeVQIvF_sPJmRLgjSxG3g6yEdUOFBEVlNOTVAyTUxTQzJIWVZKNDVJSEVSVi4u&embed=true" width=100% height="1310" frameborder="0" marginheight="0" marginwidth="0">Đang tải…</iframe>            
`;
