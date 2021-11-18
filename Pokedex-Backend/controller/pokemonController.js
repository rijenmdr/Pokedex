const model = require('../models/index');

exports.addPokemonToFavourite = async (req, res, next) => {
    const pokemon = req.body;
    try {
        const userExists = await model.User.findAll({
            where: {
                id: pokemon.user_id
            }
        }).then((result) => {
            return result
        }).catch((err) => {
            const error = new Error(err);
            next(error);
        });

        if (userExists && userExists.length === 0) {
            return res.status(401).send({
                status: "fail",
                message: "User doesn't exists"
            })
        }
        const favPokemon = await model.Favourite.findAll({
            where: {
                pokemon_id: pokemon.pokemon_id,
                user_id: pokemon.user_id
            }
        }).then((result) => {
            console.log("res", result)
            return result
        }).catch((err) => {
            const error = new Error(err);
            next(error);
        });
        console.log(favPokemon)
        if (favPokemon && favPokemon.length !== 0) {
            return res.status(401).send({
                status: "fail",
                message: "Pokemon already added to favourite"
            })
        }
        const favourite = await model.Favourite.create({
            pokemon_id: pokemon.pokemon_id,
            user_id: pokemon.user_id
        })

        if (favourite) {
            return res.status(201).json({
                status: "success",
                message: "Pokemon Added to Favourite",
            })
        }
        else {
            return res.status(403).json({
                status:"fail",
                message:"Failure in adding pokemon to favourite"
            })
        }
    }
    catch (err) {
        const error = new Error(err);
        next(error);
    };
}

exports.removePokemonFromFavourite = async (req, res, next) => {
    const pokemon = req.body;
    try {
        const favourite = await model.Favourite.destroy({
            where:{
            pokemon_id: pokemon.pokemon_id,
            user_id: pokemon.user_id
        }})

        console.log(favourite)

        if (favourite) {
            return res.status(201).json({
                status: "success",
                message: "Pokemon Removed from Favourite",
            })
        }
        else {
            return res.status(403).json({
                status:"fail",
                message:"Failure in removing pokemon from favourite"
            })
        }
    }
    catch (err) {
        const error = new Error(err);
        next(error);
    };
}

exports.isFavouritePokemon = async (req,res,next) => {
    const user_id = req.query.user_id;
    const pokemon_id = req.query.pokemon_id;

    console.log(user_id,pokemon_id)

    await model.Favourite.findAll({
        where:{
            user_id,
            pokemon_id
        }
    }).then(result=>{
        console.log(result.length)
        return res.status(200).json({
            status:'success',
            data:{
                is_fav_pokemon:result.length === 0 ? false :true
            }
        })
    }).catch(err=>{
        const error = new Error(err);
        next(error);
    })
}

exports.getAllFavouritePokemon = async (req, res, next) => {
    const user_id = req.query.user_id
    console.log(user_id)

    const favPokemons = await model.Favourite.findAll({
        where:{
            user_id
        }
    }).then(result=>{
        console.log(result)
        return res.status(200).json({
            status:'success',
            data:{
                fav_pokemons:result
            }
        })
    }).catch(err=>{
        const error = new Error(err);
        next(error);
    })
    // return res.status(200).json({
    //     status: 'success',
    //     data: {
    //         hello: "hello"
    //     }
    // })
}