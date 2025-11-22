const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const urlRouter = require('./src/routes/URLRoutes');
const redirectRouter = require('./src/routes/RedirectRoutes');
dotenv.config();
console.log("CWD:", process.cwd());
console.log("ENV:", process.env.DB_URL);



const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));
app.use(express.json());

app.use("/api/urls",urlRouter) // routes for URL shortening

app.get("/healthz", (req,res)=>{
    res.send({status:"ok"})
})

app.use("/",redirectRouter) // route for redirection

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
