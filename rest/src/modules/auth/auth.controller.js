
const admin = require("./firebase")
const graphqlClient = require("../../graphql/client")
const graphql = require("graphql-request")
const fetch = require("node-fetch")

const query = graphql.gql`
  mutation SET_USER($email: String = "", $name: String = "", $id: String = "") {
  insert_users_one(object: {email: $email, name: $name, id: $id}) {
    id
  }
}
`

const registerUser = function (req, res) {


    if (!req.user["https://hasura.io/jwt/claims"]) {
        const customClaims = {
            "https://hasura.io/jwt/claims": {
                "x-hasura-default-role": "user",
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-user-id": req.user.uid
            }
        };

        const variables = {
            id: req.user.uid,
            name: req.user.name,
            email: req.user.email
        }


        // console.log("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+ req.headers.authorization.split(" ")[1])
        // fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+ req.headers.authorization.split(" ")[1], {
        // }).then(r => r.json()).then(data => {
        //     res.json(data)
        // })

        return admin
            .auth()
            .setCustomUserClaims(req.user.uid, customClaims)
            .then(() => {
                graphqlClient.request(query, variables).then(data => {
                    res.json({ message: "success" })
                }).catch(e => {
                    console.log(e)
                    res.status(500).json({
                        e
                    });
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error
                });
            });
    } else {
        res.status(400).json({
            message: "user already registered"
        });
    }


}



const addAdmin = function (req, res) {
    const uids = ["woF5LK6vrVT5BJe0RpCHczLO1zR2", "kx4jxdRAaTbQsUpTySgTJGCLiIy2", "A22qdIlY1CP29S8S9e08RCDNelT2"]


    uids.forEach((uid) => {
        const customClaims = {
            "https://hasura.io/jwt/claims": {
                "x-hasura-default-role": "admin",
                "x-hasura-allowed-roles": ["user", "admin"],
                "x-hasura-user-id": uid
            }
        };
        admin
            .auth()
            .setCustomUserClaims(uid, customClaims)
            .then(() => {
                res.json({ message: "success" })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error
                });
            });
    })

}

module.exports = { registerUser, addAdmin }


