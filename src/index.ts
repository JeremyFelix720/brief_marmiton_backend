console.log('Hello world');

import express from "express"
import "dotenv/config"
import cors from "cors"

const app = express()
app.use(cors());
const port = parseInt(process.env.PORT as string)


import { DataTypes, Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const RecipesBdd = sequelize.define("RecipesBdd", {
  nom: {
    type: DataTypes.STRING,
  },
  duree: {
    type: DataTypes.NUMBER,
  },
  note: {
    type: DataTypes.NUMBER,
  },
  url: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
})

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('La synchronisation a réussi.');
    RecipesBdd.create({
    })
    .then((recipe) => {
      console.log("recipe", recipe)
      RecipesBdd.findAll().then((recipes) => {
        console.log("recipes", recipes)
      })
    })
  })
  .catch(error => {
    console.error('Erreur de synchronisation:', error);
  });



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add_recipe/:name/:duree/:note/', (req, res) => {
    let recipeName = req.params.name;
    let recipeDuration = req.params.duree;
    let recipeNote = req.params.note;
    //let recipeUrl = req.params.url;

    console.log("recipeNote = " + recipeNote);

    RecipesBdd.create({
      nom: recipeName as string,
      duree: parseInt(recipeDuration) as number,
      note: parseInt(recipeNote) as number,
      /*url: recipeUrl as string*/
    })

    res.send('La recette a été rajoutée avec succès !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})