const { PayoutLink } = require("razorpayx-nodejs-sdk")("", "");

const graphqlClient = require("../../graphql/client")
const paymentHelper = require('./payments.helper');


/*
"account_number": "7878780080857996",
  "contact": {
    "name": "Gaurav Kumar",
    "contact": "912345678",
    "email": "gaurav.kumar@example.com",
    "type": "customer"
  },
  "amount": 1000,
  "currency": "INR",
  "purpose": "refund",
  "description": "Payout link for Gaurav Kumar",
  "receipt": "Receipt No. 1",
  "send_sms": true,
  "send_email": true,
  "notes": {
    "notes_key_1":"Tea, Earl Grey, Hot",
    "notes_key_2":"Tea, Earl Grey… decaf."
  },
  "expire_by": 1545384058 //This parameter can be used only if you have enabled the expiry feature for Payout Links.
  */

// Create a payout link
async function createPayoutLink(name, contact, email, amount, description) {
    const days_till_expiry = 1
    const expiry = Math.round((new Date().getTime() + (days_till_expiry * 86400000)) / 1000);
    try {
        const payload = {
            "account_number": "",
            "contact": {
                "name": name,
                "contact": contact,
                "email": email,
                // "type": "customer"
            },
            "amount": amount,
            "currency": "INR",
            "purpose": "payout",
            "description": description,
            // "receipt": "Receipt No. 1",
            "send_sms": true,
            "send_email": true,
            // "notes": {
            //     "notes_key_1": "Tea, Earl Grey, Hot",
            //     "notes_key_2": "Tea, Earl Grey… decaf."
            // },
            "expire_by": expiry
        }

        const payoutLink = await PayoutLink.createPayoutLink()
        console.log('Payout link created:', payoutLink);
        return payoutLink;
    } catch (error) {
        console.error('Error creating payout link:', error);
    }
}

// Call the function to create a payout link
// createPayoutLink(1000, 'Sample payout').then((link) => {
//   // Use the payout link for further processing
//   console.log('Payout link:', link.short_url);
// });

const SHARE_QUERY = graphql.gql`
    query GET_SHARE_DETAILS($id: uuid) {
        ad_shares_completed(where: {id: {_eq: $id}}) {
          user {
            email
            phone
            name
          }
          clicks
          price
        }
}

`
const sharePayoutLinkHandler = function (req, res) {
    id = req.body.id;

    graphqlClient.request(SHARE_QUERY, { id }).then(data => {
        const payout = paymentHelper.getPayoutAmount(data.clicks, data.price);
        createPayoutLink(data.name, data.phone, data.email, payout, "Payout to " + data.name).then(link => {

            res.json({ link })

        })
    }).catch(e => {
        console.log(e)
        res.status(500).json({
            e
        });
    })
}
