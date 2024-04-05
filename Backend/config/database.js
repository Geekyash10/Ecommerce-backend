const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    }).then((data) => {
        console.log(`mongodb connected with server : ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
// database connection ka code ya par hai
//jo ki server me call kar rakha hai
// mongo atlas use kiya hai
// to uka url lagega
// connect with vsc ode choose kariyo clustrer me
//password yad rakha hai
