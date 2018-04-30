const axios = require('axios')

module.exports = PartyFood => ({
  async get(req, res, next) {
    // grab the item from the DB
    const food = await PartyFood.findById(req.params.food)

    // safeguard to ensure food
    if (!food) {
      res.status(404).json({
        'whoops!': ['menu item not found!'],
      })
      return
    }

    // attempt to load up from edamam
    const { data } = await axios.get(
      `https://api.edamam.com/search?q=${food.food}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${
        process.env.EDAMAM_APP_KEY
      }`
    )
    const recommendations = []

    // edamam founds some matching recipes
    // turn that into a pretty slender recommendations
    // to send back to the browser
    if (data.hits) {
      data.hits.forEach(({ recipe }) =>
        recommendations.push({
          img: recipe.image,
          label: recipe.label,
          source: recipe.source,
          url: recipe.url,
        })
      )
    }

    res.send({ food, recommendations })
  },
})
