//add var fetch = require('node-fetch'); after "user strict"
//in $/node_modules/amazon-cognito-identity-js/lib/Client.js
//workaround to make aws amplify work on server side (ONLY FOR TESTING!)

const Auth = require('aws-amplify').Auth;
const API = require('aws-amplify').API;

Auth.configure({
    Auth: {
        identityPoolId: 'us-east-1:7def8cb7-a390-4ba8-a3c3-63fb2f85290b',
        region: 'us-east-1',
        userPoolId: 'us-east-1_ptfudUdBB',
        userPoolWebClientId: '5m7rkuhq4bqv6e0bh2i6c03k6l',
    }
});

API.configure({
    API: {
        endpoints: [
            {
                name: "assets",
                endpoint: "https://uxd0ifjso8.execute-api.us-east-1.amazonaws.com/dev",
                region: "us-east-1"
            },
        ]
    }
})

/*
Auth.signIn("yyy", "xxx")
    .then(user => {
        console.log(user);
        API.get("assets", "/assets")
            .then(result => console.log(JSON.stringify(result)))
            .catch(err => console.log(err))
    })
    .catch(err => {
        console.log("lol error");
        console.log(err);
    });
*/




Auth.signIn("meinTestNutzer@gibtsnicht.ui", "tempPassword1234!")
    .then(user => {
        //console.log(user);
        Auth.completeNewPassword(user, 'tempPassword12345!')
            .then(result => console.log(result))
            .catch(err => {
                console.log("changePassword error")
                console.log(err)}
            )
    })
    .catch(err => {
        console.log("lol error");
        console.log(err);
    });
    
/*
Auth.signOut()
    .then(result => {
        console.log(result);
        API.get("assets", "/assets")
        .then(result => console.log(result))
        .catch(err => console.log(err))
    });
*/
