const graphqlClient = require("../../graphql/client")
const graphql = require("graphql-request")

const query = graphql.gql`mutation Insert_Referral($referred: String = "", $referrer: String = "") {
  insert_referals_one(object: {referred: $referred, referrer: $referrer}) {
    id
  }
}`

const completeReferral = function (req, res, next) {

  const { key } = req.params;

  graphqlClient.request(query, { referred: req.user.uid, referrer: key }).then(data => {
    res.json({ message: "success" })
  }).catch(e => {
    console.log(e)
    res.status(400).json();
  })

}

module.exports = { completeReferral }