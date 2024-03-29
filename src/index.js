const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const { PORT } = require('./config/server-config');

const ApiRoutes = require('./routes/index');

const db = require('./models/index');

const setupAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', ApiRoutes);

    app.listen(PORT, () => {
        console.log(`Flight Booking Service is running on PORT ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }
    })

}

setupAndStartServer(); 