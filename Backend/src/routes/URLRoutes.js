const express = require('express');
const pool = require('../db/db.js');
const isValidUrl = require('../utils/validateURL.js');
const { nanoid } = require('nanoid');

const router = express.Router();

router.post("/", async (req, res )=>{
    const { url } = req.body;
    console.log("Received longUrl:", url);
    
    if(!url){
        return res.status(400).json({ error: "URL is required" });
    }
    if(!isValidUrl(url)){
        return res.status(400).json({ error: "Invalid URL" });
    }

    const code = nanoid(8);

    try {
        const {rows} = await pool.query(
            `INSERT INTO urls (code, original_url)
             VALUES ($1, $2)
             RETURNING id, code, original_url, visit_count, created_at`,
      [code, url]
        );

        const row = rows[0]
        res.status(201).json({
            id : row.id,
            code : row.code,
            longUrl : row.long_url,
            visitCount : row.visit_count,
            createdAt : row.created_at,
            shortUrl : `${req.protocol}://${req.get("host")}/${row.code}`
        })
    } catch (error) {
        console.log("error when creating url",error);
        res.status(500).json({ error: "Server error" });
    }
})

router.get("/", async (req,res) =>{
    try {
        const {rows} = await pool.query(
            "SELECT * FROM urls ORDER BY created_at DESC"
        )

        const data = rows.map(row =>({
            id : row.id,
            code : row.code,
            originalUrl : row.original_url,
            visitCount : row.visit_count,
            createdAt : row.created_at,
            shortUrl : `${req.protocol}://${req.get("host")}/${row.code}`
        }))
         if (rows.length === 0) {
        res.json({ error: "No URLs found" });
      }else {
        res.json(data);
      }
        
     
    } catch (error) {
        console.log("error while fetching all the URL");
        res.status(500).json({ error: "Server error when fetching list" });
        
    }
})

router.get("/:code", async (req,res) =>{
    const {code} = req.params;
    try {
        const {rows} = await pool.query(
            "SELECT * FROM urls WHERE code = $1",
            [code]
        )
        if (!rows.length) {
            return res.status(404).json({ error: "URL not found" });
        }

        const row = rows[0];

        res.json({
            id : row.id,
            code : row.code,
            originalUrl : row.original_url,
            visitCount : row.visit_count,
            createdAt : row.created_at,
            shortUrl : `${req.protocol}:// ${req.get("host")} /${row.code}`
        })
    } catch (error) {
        console.log("error when getting the specific url");
        res.status(500).json({ error: "Server error when fetching the URL" });
        
    }
})

router.delete("/:code", async (req,res)=>{
    const {code} = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM urls WHERE code = $1 ",
            [code]
        )
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "URL not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.log("server error when trying to delete an record");
        res.status(500).json({error: "Server error when deleting the URL"});
        
    }
})

module.exports = router;