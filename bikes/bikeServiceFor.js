const makeDependencies = require("./bikeServiceForDependencyMaker");

exports.makeGetBikesFor = (deps) => {

    if(!deps) deps = makeDependencies();

    const getBikeFors = async (userId, apiKey) => {
        try {

            const apiKeyMapping = await deps.apiKeyRepository.get(apiKey);
            const creatorId = apiKeyMapping.userId;
            const userRecord = await deps.userRepository.get(userId, creatorId);

            if (!userRecord) {
                return {
                    hasError: true,
                    message: "not found or allowed to read user"
                }
            }

            return await deps.smartContractService.getBikes(userRecord.ethAddress);

        } catch (error) {
            return {
                hasError: true,
                message: error.message
            }
        }
    }
    return getBikeFors;
}