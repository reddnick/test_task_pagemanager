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
        res.status(409).render('error.hbs', {error: {message: 'Error: slug should be uniq'}})
    }
});

router.get('/pages/:slug/edit', auth.jwt, function (req, res) {
    PageModel.findOne({
        where: {slug: req.params.slug}
    })
        .then((page) => res.render('admin/page/edit', {page}))
});

router.post('/pages/:slug/edit', auth.jwt, async function (req, res) {

    const page = await PageModel.findOne({where: {slug: req.body.slug}});
    if (page) {
        PageModel.update({
                name: req.body.name,
                meta: req.body.meta,
                content: req.body.content
            },
            {
                where: {slug: req.body.slug}
            })
            .then(() => res.redirect('/admin/pages'));
    } else {
        PageModel.create(req.body)
            .then(() => res.redirect('/admin/pages'));
    }
});

router.post('/pages/:id/delete', auth.jwt, function (req, res) {
    PageModel.destroy({
        where: {id: req.params.id}
    })
        .then(() => res.redirect('/admin/pages'));
});

module.exports = router;
