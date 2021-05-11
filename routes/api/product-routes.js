const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

  // find all products
  // be sure to include its associated Category and Tag data
  router.get('/', async (req, res) => {
    try {
      const findAllProducts = await Product.findAll({
        include: [
          { 
            model: Category, 
            as: 'category',
          },
          {
            model: Tag, 
            through: ProductTag,
            as: 'tags', 
          },
        ],
      });
      res.status(200).json(findAllProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  router.get('/:id', async (req, res) => {
    try {
      const findIdProducts = await Product.findByPk(req.params.id, {
        include: [
          { 
            model: Category, 
            as: 'category',
          },
          {
            model: Tag,
            through: ProductTag,
            as: 'tags',
          },
        ],
      });

    if (!findIdProducts) {
        res.status(404).json({ message: 'No product with this id '});
        return;
      }
      res.status(200).json(findIdProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tagIds
  });
  if (req.body.tagIds.length) {
    const productTagArr = req.body.tagIds.map((tag_id) => {
      return {
        product_id: productData.id,
        tag_id
      };
    });
    let productTagIds = await ProductTag.bulkCreate(productTagArr);
    res.status(200).json(productTagIds);
    } else {
      res.status(200).json(productData);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});




// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    const productTags = await ProductTag.findAll({
      where: {
        product_id: req.params.id
      },
    });
    const productTagIds = await productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    const productTagsRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
    // run actions
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: {id: productTagsRemove }}),
      ProductTag.bulkCreate(newProductTags),
    ]);
    if (!productData) {
      res.status(404).json({ message: 'No product with this id '});
      return
    };
    res.status(200).json(updatedProductTags);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

  // delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteProduct) {
      res.status(404).json({ message: 'No product with this id' });
      return;
    }
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
