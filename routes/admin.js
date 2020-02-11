const {PageModel} = require('../bin/sequelize');
const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service');
const {check, validationResult} = require('express-validator');


router.get('/pages', auth.jwt, function (req, res) {
    PageModel.findAll()
        .then((pages) => res.render('admin/page/list.hbs', {pages}))
});


router.get('/pages/create', auth.jwt, function (req, res) {
    res.render('admin/page/create.hbs')
});
router.post('/pages/create', auth.jwt, [
    check('name').isString().notEmpty(),
    check('slug').isString().notEmpty(),
    check('content').isString().notEmpty(),
], function (req, res) {
    PageModel.create(req.body)
        .then(() => res.redirect('/admin/pages'))
});


router.get('/pages/:id/edit', auth.jwt, function (req, res) {
    PageModel.findOne({
        where: {id: req.params.id}
    })
        .then((page) => res.render('admin/page/edit', {page}))
});

router.post('/pages/:id/edit', auth.jwt, [
    check('name').isString().notEmpty(),
    check('slug').isString().notEmpty(),
    check('content').isString().notEmpty(),
], async function (req, res) {
    const page = await PageModel.findByPk(req.params.id);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        await PageModel.update(req.body, {
            returning: true,
            where: {id: req.params.id}
        });
        res.redirect('/admin/pages')
    }
    res.render('admin/page/edit', {page, errors: errors.array()})
});

router.post('/pages/:id/delete', auth.jwt, function (req, res) {
    PageModel.destroy({
        where: {id: req.params.id}
    })
        .then(() => res.redirect('/admin/pages'));
});

module.exports = router;
