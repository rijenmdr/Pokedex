const express = require('express');

const authValidation = require('../auth/auth'); 
const pokemonController = require('../controller/pokemonController');
 
const router = express.Router();

router.route('/add-favourite').post(authValidation,pokemonController.addPokemonToFavourite)

router.route('/remove-favourite').post(authValidation,pokemonController.removePokemonFromFavourite)

router.route('/is-fav-pokemon').get(authValidation,pokemonController.isFavouritePokemon)

router.route('/fav-pokemons').get(authValidation,pokemonController.getAllFavouritePokemon)


module.exports = router;