const express = require('express');
const projects = require('./data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
    projects.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'internal server error' })
    })
})

router.get('/:id', (req, res) => {
    projects.getProjectActions(req.params.id)
        .then(project => {
            if (project.length) {
                res.status(200).json(project)
            }
            else {
                res.status(404).json({ message: "The project has no actions" })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'internal server error' + error })
        })
})
