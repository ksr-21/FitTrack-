const bcrypt = require('bcryptjs');
const hash = "$2a$10$X.aT3G.DkIeT9h1v9oO5y.5m3sO2q/X.8F6/fT9G4/6q5/nO/8e0m";
const match = bcrypt.compareSync("password123", hash);
console.log("MATCH:", match);
