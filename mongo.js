const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const env = require("./env/environment");

const mongoURI = `mongodb://${env.dbName}:${env.key}@${
	env.dbName
}.documents.azure.com:${env.cosmosPort}/?ssl=true`;

function connect() {
	mongoose.set("debug", true);
	mongoose.set("useCreateIndex", true);
	return mongoose.connect(mongoURI);
}
module.exports = {
	connect,
	mongoose,
};
