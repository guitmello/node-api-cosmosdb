const Hero = require("./../model/hero.model");
const uuid = require("uuid/v1");

require("./../mongo").connect();

function getHeroes(req, res) {
	const docquery = Hero.find();

	docquery
		.exec()
		.then((heroes) => {
			res.status(200).json(heroes);
		})
		.catch((err) => {
			res.status(550).send(err);
			return;
		});
}

function postHero(req, res) {
	const originalHero = {
		id: uuid(),
		name: req.body.name,
		saying: req.body.saying,
	};

	const hero = new Hero(originalHero);

	hero.save((err) => {
		if (checkServerError(res, err)) {
			return;
		}
		res.status(201).json(hero);
	});
}

function putHero(req, res) {
	const originalHero = {
		id: parseInt(req.params.id, 10),
		name: req.body.name,
		saying: req.body.saying,
	};

	Hero.findOne(
		{
			id: originalHero.id,
		},
		(err, hero) => {
			if (checkServerError(res, err)) {
				return;
			}
			if (!checkFound(res, hero)) {
				return;
			}

			hero.name = originalHero.name;
			hero.saying = originalHero.saying;
			hero.save((err) => {
				if (checkServerError(res, err)) {
					return;
				}
				res.status(200).json(hero);
			});
		},
	);
}

function deleteHero(req, res) {
	const id = parseInt(req.params.id, 10);

	Hero.findOneAndRemove({
		id: id,
	})
		.then((hero) => {
			if (!checkFound(res, hero)) {
				return;
			}
			res.status(200).json(hero);
		})
		.catch((err) => {
			if (checkServerError(res, err)) {
				return;
			}
		});
}

function checkServerError(res, err) {
	if (err) {
		res.status(500).send(err);
		return err;
	}
}

function checkFound(res, hero) {
	if (!hero) {
		res.status(404).send("Hero not found.");
		return;
	}
	return hero;
}

module.exports = {
	getHeroes,
	postHero,
	putHero,
	deleteHero,
};
