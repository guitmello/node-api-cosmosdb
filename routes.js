const express = require("express");
const router = express.Router();

const heroesService = require("./service/hero.service");

router.get("/heroes", (req, res) => {
	heroesService.getHeroes(req, res);
});

router.post("/hero", (req, res) => {
	heroesService.postHero(req, res);
});

router.put("/hero/:id", (req, res) => {
	heroesService.putHero(req, res);
});

router.delete("/hero/:id", (req, res) => {
	heroesService.deleteHero(req, res);
});

module.exports = router;
