const GraphQLClient = require('graphql-request').GraphQLClient


const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, { headers: { "x-hasura-admin-secret": process.env.GRAPHQL_SECRET } })

module.exports = client