const express = require('express');
const pool = require('../db/db');
const isValidUrl = require('../utils/isValidUrl');
const { nanoid } = require('nanoid');

const router = express.Router();

router.post("/", async (req, res )=>{
    const { longUrl } = req.body;

    if(!longUrl){
        return res.status(400).json({ error: "URL is required" });
    }
    if(!isValidUrl(longUrl)){
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