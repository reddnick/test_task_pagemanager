const {PageModel} = require('../bin/sequelize');
const express = require('express');
const router = express.Router();
const auth = require('../services/auth.service');

router.get('/pages', auth.jwt, function (req, res) {
    PageModel.findAll()
        .then((pages) => res.render('admin/page/list.hbs', {pages}))
});


router.get('/pages/create', auth.jwt, function (req, res) {
    res.render('admin/page/create.hbs')
});

router.post('/pages/create', auth.jwt, async function (req, res) {
    const page = await PageModel.findOne({where: {slug: req.body.slug}});
    if(!page) {
       PageModel.create(req.body).then(() => res.redirect('/admin/pages'))
    } else {
        let currPage = req.body;
        res.render('admin/page/create',   {currPage, error: 'Slug already exist(must be unique)'})
    }
});

router.get('/pages/:id/edit', auth.jwt, function (req, res) {
    PageModel.findOne({
        where: {id: req.params.id}
    })
        .then((page) => res.render('admin/page/edit', {page}))
});

router.post('/pages/:id/edit', auth.jwt, async function (req, res) {
    const existSlug = await PageModel.findOne({where: {slug: req.body.slug}});
    const currentSlug = await PageModel.findOne({where: {id: req.params.id}});
    if(!existSlug || existSlug.slug === currentSlug.slug) {
        PageModel.update(req.body, {
            where: {id: req.params.id}
        })
            .then(() => res.redirect('/admin/pages'));
    }
    else {
        let page = req.body;
        res.render('admin/page/edit',   {page, error: 'Slug already exist(must be unique)'})
        }
});



router.post('/pages/:id/delete', auth.jwt, function (req, res) {
    PageModel.destroy({
        where: {id: req.params.id}
    })
        .then(() => res.redirect('/admin/pages'));
});

module.exports = router;
