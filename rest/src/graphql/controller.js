const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const s3Helper = require('../modules/s3/s3.helper');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    s3Url(key: String!): Url
  }

  type Url {
    url:String!
  }
`);

const rootResolver = {
    s3Url: graphqlInput => s3Helper.getS3signedUrl(graphqlInput && graphqlInput.key).then(url => { return { url: url } })
};

const graphql = graphqlHTTP({
    schema,
    rootValue: rootResolver,
    graphiql: false, // this creates the interactive GraphQL API explorer with documentation.
});

module.exports = graphql;