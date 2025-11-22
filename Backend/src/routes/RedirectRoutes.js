const express = require('express');
const pool = require('../db/db');

const router = express.Router();

router.get("/:code", async (req, res )=>{
    const { code } = req.params;

    if(code==="api" || code==="healthz"){
        return res.status(404).json({ error: "Not found" });
    }

    try {
       const client = await pool.connect();
       try {
        await client.query("BEGIN");
        const {rows} = await client.query(
        "SELECT * FROM urls WHERE code = $1 FOR UPDATE",
        [code]
        )
        if(!rows.length){
            await client.query("ROLLBACK");
            return res.status(404).json({ error: "Short URL not found" });
        } 
        const originalUrl = rows[0].original_url;
        await client.query(
        "UPDATE urls SET visit_count = visit_count +1 WHERE code = $1",
        [code]
        )
        await client.query("COMMIT");
        return res.redirect(302, originalUrl);
       } catch (error) {
        await client.query("ROLLBACK");
        console.log("redirect login error", error);
        
       }finally{
        client.release();
       }
    } catch (error) {
        console.log("DB connection error", error);
        res.status(500).json({ error: "Server error" }); 
    }
})
module.exports = router;