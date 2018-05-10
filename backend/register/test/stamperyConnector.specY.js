
const makeCreateBlockchainRecord = require('../src/stamperyConnector').makeCreateBlockchainRecord;
const cryptoFunctions = require("../../modules/src/cryptoFunctions");

const secrets = require("../../secrets");
const config = require("../../config");

const expect = require('chai').expect;
const assert = require('chai').assert;


it('makeRegister should not be null', async () => {

    
    const createBlockchainRecord = makeCreateBlockchainRecord(secrets, config);
    
    const key = cryptoFunctions.generateNewKey();

    const messageToSign = {
        action: "register",
        assetType: "bicycle",
        uniqueId: "lolMyBikeIs Cool"
    }

    const signedMessage = cryptoFunctions.sign(JSON.stringify(messageToSign), key.privateKey);

    const result = await createBlockchainRecord(signedMessage, messageToSign.uniqueId);
    
    console.log(result);

    const firstDate = "2018-05-10 19:06:00.270483";
    const secondDate = "2018-05-10 19:06:00.270484";
    console.log(new Date(firstDate));
})