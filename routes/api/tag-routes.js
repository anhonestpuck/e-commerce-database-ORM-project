const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
 try {
  const tagData = await Tag.findAll({include: [{ model: Product}]
  });
  res.status(200).json(tagData);
  } catch (err) {
   res.status(500).json(err)
   }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id,
      {include: [{model: Product}]
    
      });
      
      if (!tagData) {
        res.status(404).json ({message: 'no data found'});
        return;
      }
      res.status(200).json(tagData);

      } catch (err) {
        res.status(500).json(err);
      } 
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err)
  }
 
});

// router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        }
      });
      res.status(200).json(tagData)
    } catch (err) {
      res.status(500).json(err);
    }
    // update a category by its `id` value
  });

  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(tagData)
      if (!tagData){
        res.status(404).json({message: 'no product with this id'})
        return;
      }
    } catch (err){
      res.status(500).json(err);
    }
    // delete one product by its `id` value
  });

module.exports = router;
