const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id);
    if (!tags) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
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
