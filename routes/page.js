const {PageModel} = require('../bin/sequelize');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/security/login')
});
router.get('/:slug', async function (req, res) {
    const page = await PageModel.findOne({where: {slug: req.params.slug}});
    if (!page) {
        return res.status(404).render('error.hbs', {error: {message: 'Not found', status: 404}})
    }
    res.render('page/view.hbs', {page})
});

module.exports = router;
