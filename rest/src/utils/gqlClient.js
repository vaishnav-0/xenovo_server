const fetch = require('node-fetch');

async function graphQLClient(query,variables,operationName){
    try {
        let data = fetch(process.env.HASURA_RESOURCE_URL, {
            method: "POST",
            headers: {
                "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
                operationName: operationName
            })
        }).then((result) => result.json());

        return data;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

module.exports = { graphQLClient }