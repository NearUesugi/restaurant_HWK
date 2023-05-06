// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  // past the restaurant data into 'index' partial template
  res.render('index', { restaurant: restaurants.results });
})

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurantDetail = restaurants.results.find(item => {
    return item.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurantDetail: restaurantDetail })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filterRestaurant = restaurants.results.filter(item => {
    return item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: filterRestaurant, keyword: keyword })
})

// favorite setting
app.get('/favorite', (res, req) => {
  res.render('favorite', { favorite: favoriteRestaurant });
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
