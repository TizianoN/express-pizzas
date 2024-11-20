const express = require('express');
const router = express.Router();

const pizzas = require('../db/pizzas.js');

// index
router.get('/', (req, res) => {
  const term = req.query.term ?? '';

  const filteredPizzas = pizzas.filter((pizza) => {
    const nameIncludesTerm = pizza.name.toLowerCase().includes(term.toLowerCase());

    let ingredientsIncludesTerm = false;
    pizza.ingredients.forEach((ingredient) => {
      if (ingredient.toLowerCase().includes(term.toLowerCase())) ingredientsIncludesTerm = true;
    });

    return nameIncludesTerm || ingredientsIncludesTerm;
  });

  res.json(filteredPizzas);
});

// show
router.get('/:id', (req, res) => {
  // * salvo il parametro
  const id = parseInt(req.params.id);

  // * valido il parametro (se non è valido rispondo e interrompo)
  if (isNaN(id)) {
    res.status(418).json({
      error: 'id not valid',
    });

    return;
  }

  // * cerco la pizza
  const pizza = pizzas.find((pizza) => pizza.id === id);

  // * se non la trovo rispondo e interrompo
  if (!pizza) {
    res.status(404).json({
      error: 'Resource not found',
    });

    return;
  }

  // * invio la pizza
  res.json(pizza);

  // res.json(`Mostra il dettaglio della pizza con id ${id}`);
});

// store
router.post('/', (req, res) => {
  res.json(`Crea una nuova pizza`);
});

// update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.json(`Modifica totale della pizza con id ${id}`);
});

// modify
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  res.json(`Modifica parziale della pizza con id ${id}`);
});

// destroy
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // * valido il parametro (se non è valido rispondo e interrompo)
  if (isNaN(id)) {
    res.status(418).json({
      error: 'id not valid',
    });

    return;
  }

  let indexOfPizza;

  pizzas.forEach((pizza, index) => {
    if (pizza.id === id) indexOfPizza = index;
  });

  // * se non la trovo rispondo e interrompo
  if (!indexOfPizza) {
    res.status(404).json({
      error: 'Resource not found',
    });

    return;
  }

  // * recupero la pizza da eliminare
  const deletedPizza = pizzas[indexOfPizza];

  // * la elimino dall'array
  pizzas.splice(indexOfPizza, 1);

  // * rispondo
  res.json({
    deletedPizza,
    pizzas,
  });

  // res.json(`Eliminazione della pizza con id ${id}`);
});

module.exports = router;
