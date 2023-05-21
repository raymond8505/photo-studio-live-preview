const PocketBase = require("pocketbase");

const db = new PocketBase("http://localhost:8090");

module.exports = db;
