const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const findAllCategories = await Category.findAll({
      include: [{ model: Product, as: 'associated_products' }]
    });
    res.status(200).json(findAllCategories);
  } catch (err) {
  res.status(500).json(err);
  }
});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const findIdCategories = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'associated_products' }]
    });
    res.status(200).json(findIdCategories);
  } catch (err) {
  res.status(500).json(err);
  }
});

  // create a new category
  router.post('/', async (req, res) => {
    try {
      const createCategory = await Category.create(req.body);
      res.status(200).json(createCategory);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a category's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const updateCategory = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!updateCategory) {
        res.status(404).json({ message: 'No category with this id' });
        return;
      }
      res.status(200).json(updateCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // delete category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const deleteCategory = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deleteCategory) {
        res.status(404).json({ message: 'No category with this id' });
        return;
      }
      res.status(200).json(deleteCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
