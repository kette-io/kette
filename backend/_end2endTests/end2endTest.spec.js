global.fetch = require('node-fetch');

global.localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key]
    },
    setItem: function (key, value) {
        this.store[key] = value
    },
    removeItem: function (key) {
        delete this.store[key]
    }
};

global.window = global.window || {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    WebSocket: global.WebSocket,
    ArrayBuffer: global.ArrayBuffer,
    addEventListener: function () { },
    navigator: { onLine: true },
    localStorage: global.localStorage
};


const expect = require('chai').expect;
const Amplify = require("aws-amplify").default;
const secrets = require("../secrets");
const awsConfig = require("./awsConfig")
const amplifyConfig = require("./amplifyConfig")
const AWS = require('aws-sdk');

const eMail = "nix@doesnotExist.iy";


describe('...', function () {
    this.timeout(15000);
    it('[End2EndTest]', async () => {

        const tempPassword = "LolOlo123123!"

        var params = {
            UserPoolId: awsConfig.cognito.USER_POOL_ID,
            Username: eMail,
            DesiredDeliveryMediums: ["EMAIL"],
            ForceAliasCreation: false,
            TemporaryPassword: tempPassword,
            UserAttributes: [
                { Name: "email", Value: eMail },
                { Name: "email_verified", Value: "true" }
            ]
        };

        var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ region: awsConfig.cognito.REGION, accessKeyId: secrets.awsAccessKeyId, secretAccessKey: secrets.awsSecretAccessKey });
        const createUserResult = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();

        Amplify.configure(amplifyConfig);
        const user = await Amplify.Auth.signIn(eMail, tempPassword);
        await Amplify.Auth.completeNewPassword(user, "D!iesDa1232139");
        
        const apiKeys = await Amplify.API.get("apiKeys", "/apiKeys");

        console.log("api keys");
        console.log(apiKeys);

        /*
        const firstApiKey = apiKeys[0];

        const apiKey = firstApiKey.apiKey;
        const init = { headers: { 'x-api-key': apiKey } };
        const getUsersResponse = await fetch("https://uxd0ifjso8.execute-api.us-east-1.amazonaws.com/dev/users", init)
        const users = await getUsersResponse.json();

        users.forEach(user => {
            console.log(user.UserAttributes[3].Value)
        });*/

    })
})
