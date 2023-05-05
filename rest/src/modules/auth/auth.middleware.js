firebase = require('./firebase');


const decodeFirebaseIdToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      error: {
        message: 'You did not specify any idToken for this request'
      }
    });
  }

  try {
    TokenArray = req.headers.authorization.split(" ");
    // Use firebase-admin auth to verify the token passed in from the client header.
    // This is token is generated from the firebase client
    // Decoding this token returns the userpayload and all the other token claims you added while creating the custom token
    const userPayload = await firebase.auth().verifyIdToken(TokenArray[1]);

    req.user = userPayload;

    next();
  } catch (error) {
    if (error.code == "auth/id-token-expired") {
      return res.status(401).json({ error })
    }
    
    return res.status(500).json({
      error
    });
  }
};

// Checks if a user is authenticated from firebase admin
const isAuthorized = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({
      error: {
        message: 'You are not authorised to perform this action. SignUp/Login to continue'
      }
    });
  }
};

module.exports = { decodeFirebaseIdToken, isAuthorized }