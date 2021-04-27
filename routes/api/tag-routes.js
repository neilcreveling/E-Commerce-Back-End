const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const findAllTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'product_data' }]
    });
    res.status(200).json(findAllTags);
  } catch (err) {
  res.status(500).json(err);
  }
});

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const findIdTags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'product_data' }]
    });
    if (!findIdTags) {
      res.status(404).json({ message: 'No user with this id '});
      return;
    }
    res.status(200).json(findIdTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag) {
      res.status(404).json({ message: 'No user with this id' });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No user with this id' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
