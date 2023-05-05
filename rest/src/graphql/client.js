const GraphQLClient = require('graphql-request').GraphQLClient


const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, { headers: { "x-hasura-admin-secret": "mingle" } })

module.exports = client