const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll({
    include: [{model: Product}]
  });
  res.json(allCategories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const data = await Category.findByPk(req.params.id,{
    include: [{model: Product}]
  })
  res.json(data);
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);
  res.json(newCategory);
  console.log("New category has been created")
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update({
    category_name: req.body.category_name
  },{
    where: { 
      id: req.params.id
    }
  });
  res.json(updateCategory);
  console.log("New category has been created")
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {id: req.params.id}
    })

    if (!deleteCategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json(deleteCategory);
} catch (err) {
    res.status(500).json(err);
}
})

module.exports = router;
