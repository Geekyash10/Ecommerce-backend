const app = require('./app.js');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database')
// handling uncaught errors mainly syntax errors hote hai
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught errors `);
    process.exit(1);
})
dotenv.config({ path: "backend/config/config.env" });
connectDatabase(); // calling connect database function here
const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT} `)
})
//unhandled Promise rejection mainly jisme kuch promise return ho raha ho 
// agar mongodb ki url me gadbad ho toh
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise rjection`);
    server.close(() => {
        process.exit(1); // immeditedtl exit from the code
    })
})
// app.js call huya hai
//uske bad database connect kiya hai
// env files wo data apn use kar sakte hai direct
//server se sare related message yahi aa rahe ahi
// database connection se bhi related sare messages
// server se related two errors yaha par aa rahe hai

