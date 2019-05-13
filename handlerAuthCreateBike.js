"use strict";
const register = require("./bikes/create/registryForUser").makeRegister();
const {createAwsResponse, extractApiKey} = require("./modules/awsHelper")

module.exports.createBike = async (event) => {

  const { vendor, serialNumber, frameNumber, ipfsHash, userId } = JSON.parse(event.body);

  const apiKey = extractApiKey(event);

  const result = await register(
    vendor,
    serialNumber,
    frameNumber,
    ipfsHash,
    apiKey,
    userId
  );

  const response = createAwsResponse(result);

  return response;
}