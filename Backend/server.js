const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
console.log("CWD:", process.cwd());
console.log("ENV:", process.env.DB_URL);



const app = express();
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));
app.use(express.json());

const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
