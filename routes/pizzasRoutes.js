const express = require("express");
const pizzaRouter = express.Router();
const pizzaModel = require("../model/PizzaModel");

pizzaRouter.get("/getAllPizzas", async (req, res) => {
  try {
    const pizzas = await pizzaModel.find({});
    res.send(pizzas);
  } catch (error) {
    res.json({ message: error });
  }
});

pizzaRouter.post("/addpizza", async (req, res) => {
  const pizza = req.body.pizza;

  try {
    const newpizza = new pizzaModel({
      name: pizza.name,
      image: pizza.image,
      variants: ["small", "medium", "large"],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });
    await newpizza.save();
    res.send("New Pizza Added Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

pizzaRouter.post("/getpizzabyid", async (req, res) => {
  const pizzaid = req.body.pizzaid;

  try {
    const pizza = await pizzaModel.findOne({ _id: pizzaid });
    res.send(pizza);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

pizzaRouter.post("/editpizza", async (req, res) => {
  const editedpizza = req.body.editedpizza;

  try {
    const pizza = await pizzaModel.findOne({ _id: editedpizza._id });

    (pizza.name = editedpizza.name),
      (pizza.description = editedpizza.description),
      (pizza.image = editedpizza.image),
      (pizza.category = editedpizza.category),
      (pizza.prices = [editedpizza.prices]);

    await pizza.save();

    res.send("Pizza Details Edited successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

pizzaRouter.post("/deletepizza", async (req, res) => {
  const pizzaid = req.body.pizzaid;

  try {
    await pizzaModel.findOneAndDelete({ _id: pizzaid });
    res.send("Pizza Deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = pizzaRouter;
