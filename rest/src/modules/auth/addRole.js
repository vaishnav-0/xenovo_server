
const admin = require("./firebase")

const uid = "dTA51cOSa8Yct3q5dEfuDyq7ID53"
const customClaims = {
    "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-user-id": uid
    }
};

admin.auth()
    .setCustomUserClaims(uid, customClaims)
    .then(() => {
       console.log("success") 
    });