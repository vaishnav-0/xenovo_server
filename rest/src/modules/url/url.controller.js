
const graphqlClient = require("../../graphql/client")
const graphql = require("graphql-request")
const redisClient = require("../../redis/client")

const query = graphql.gql`
  query GET_AD($key: String = "") {
  ad_shares(where: {key: {_eq: $key}}) {
    id
    ad {
      url
    }
  }
}
`

const updateCount = graphql.gql`
mutation UPDATE_CLICK($id: uuid = "") {
  update_ad_shares(where: {id: {_eq: $id}}, _inc: {clicks: 1}) {
    affected_rows
  }
}
`


const redirect = async (req, res) => {
    const { key } = req.params;

    try {

        const data = await graphqlClient.request(query, { key })
        console.log(data)
        if (data.ad_shares.length === 0)
            return res.status(401).json({ message: "url not found" });
        console.log(redisClient)
        const visited = await redisClient.sIsMember(key, req.socket.remoteAddress)
        console.log(visited)
        if (!visited) {

            console.log(req.socket.remoteAddress)
            await redisClient.sAdd(key, req.socket.remoteAddress)
            await redisClient.expireAt(key, parseInt((+new Date) / 1000) + 86400);


            await graphqlClient.request(updateCount, { id: data.ad_shares[0].id })
            console.log("updated")
            return res.redirect(307, data.ad_shares[0].ad.url);
        }

        return res.redirect(307, data.ad_shares[0].ad.url);
    } catch (e) {
        console.log(e)
        return res.status(500).json();
    }

}


module.exports = { redirect }