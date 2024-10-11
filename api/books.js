const express = require('express');
const router = express.Router();
module.exports = router;

const prisma = require('../prisma');

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const books = await prisma.book.findMany();
            res.json(books);
        } catch (e) {
            next(e);
        }
    })
    .post(async (req, res, next) => {
        const { title } = req.body;
        if (!title) {
            return next({ status: 400, message: 'Title must be provided for a new book.'});
        }
        try {
            const book = await prisma.book.create({
                data: { title }
            })
            res.status(201).json(book);
        }
        catch (e) {
            next(e);
        }
    });

router.param("id", async (req, res, next, id) => {
    try {
        const book = await prisma.book.findUnique({ where: { id: +id } });
        if (book) {
            req.book = book;
            next();
        }
        else {
            next({ status: 404, message: `Book with id ${id} does not exist.`});
        }
    }
    catch (e) {
        next(e);
    }
})

router
    .route("/:id")
    .get(async (req, res) => {
        res.json(req.book);
    })
    .put(async (req, res, next) => {
        const { title } = req.body;
        if (!title) {
            return next({ status: 400, message: 'A new title must be provided.'});
        }
        try {
            const book = await prisma.book.update({
                where: { id: req.book.id },
                data: { title },
            });
            res.json(book);
        }
        catch (e) {
            next(e);
        }
    })
    .delete(async (req, res, next) => {
        try {
            await prisma.book.delete({
                where: { id: req.book.id }
            })
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    })