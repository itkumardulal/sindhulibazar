const liqureitems = require("../data/item.json");
const fooditems = require("../data/fooditems.json");
const groceryitems = require("../data/groceryitems.json");
const vehicalitems = require("../data/vechicalitems.json");
const herbalitems = require("../data/uturnitems.json");
const featureditems = require("../data/featuredItems.json");
const bakeryItems = require("../data/bakeryitems.json");

// Change Datacarrier to an object with named properties
const Datacarrier = {
  LiqureStore: liqureitems,
  FoodStore: fooditems,
  GroceryStore: groceryitems,
  VehicalStore: vehicalitems,
  HerbalStore: herbalitems,
  FeaturedStore: featureditems,
  bakeryItems: bakeryItems,
};

export default Datacarrier;
