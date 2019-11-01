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

router.get('/:id/actions', (req, res) => {
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

router.post('/', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400).json({ error: 'please provide a name or description for the project' })
    }
    else {
        projects.insert(req.body)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'internal server error' + error })
            })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    projects.remove(id)
        .then(project => {
            if (project && project > 0) {
                res.status(200).json({ success: `post ${id} was successfully deleted` })
            }
            else {
                res.status(404).json({ message: 'the project with that id does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'internal server error' + error })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    projects.update(id, body)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            }
            else {
                res.status(400).json({ error: `the id ${id} is not valid` })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'internal server error' + error })
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

function validateProjectId(req, res, next) {
    projects.get(req.params.id)
        .then(project => {
            if (project) {
                req.project = project;
                next()
            } else {
                res.status(404).json({ message: 'Project id does not correspond with an actual Project' });
            }
        })
        .catch(error => {
            res.status(404).json({ message: "invalid project id: " + error.message })
        })

}

module.exports = router