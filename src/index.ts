console.log('Hello world');

import { DataTypes, Sequelize } from "sequelize"
import bodyParser from "body-parser"
import express from "express"
import "dotenv/config"
import cors from "cors"

const app = express()
const port = parseInt(process.env.PORT as string)

app.use(cors());
app.use(bodyParser.json())

interface IMyBodyRequest {
  name: string,
  note: number,
  duration: number,
  link: string
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const RecipesBdd = sequelize.define("RecipesBdd", {
  nom: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.NUMBER,
  },
  duree: {
    type: DataTypes.NUMBER,
  },
  url: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
})

sequelize.sync()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

/*
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
      //url: recipeUrl as string
    })

    res.send('La recette a été rajoutée avec succès !')
})
*/

// Deuxième méthode avec POST (plus efficace car...)
app.post("/add_recipes", async (req, res) => {
  const recipeName = req.body.name;
  const recipeNote = req.body.note;
  const recipeDuration = req.body.duration;
  const recipeLink = req.body.link;

  const maNouvelleRecette = await RecipesBdd.create({
    nom: recipeName as string,
    note: recipeNote as number,
    duree: recipeDuration as number,
    url: recipeLink as string
  })

  console.log(maNouvelleRecette);
  res.json(maNouvelleRecette)
})

app.get("/get_all_recipes", async (req, res) => {
  const savedRecipes = await RecipesBdd.findAll();
  res.json(savedRecipes);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})