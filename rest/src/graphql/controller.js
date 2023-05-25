const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const s3Helper = require('../modules/s3/s3.helper');
const paymentHelper = require('../modules/payments/payments.helper');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    s3Url(key: String!): Url
    
    payout(clicks: Int!, ppc: Float!): PayoutOut
  }


  type PayoutOut {
      amount: Float!
  }

  type Url {
    url:String!
  }
`);

function payoutResolver(input){
  if(input.clicks === undefined || input.ppc === undefined){
    throw new Error('invalid input');
  }

  return {
    amount: paymentHelper.getPayoutAmount(input.clicks, input.ppc)
  }
}

const rootResolver = {
    s3Url: graphqlInput => s3Helper.getS3signedUrl(graphqlInput && graphqlInput.key).then(url => { return { url: url } }),
    payout: payoutResolver
};

const graphql = graphqlHTTP({
    schema,
    rootValue: rootResolver,
    graphiql: false, // this creates the interactive GraphQL API explorer with documentation.
});

module.exports = graphql;