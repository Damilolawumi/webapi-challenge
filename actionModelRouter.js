const express = require("express");
const actions = require('./data/helpers/actionModel');
const router = express.Router();
const projects = require('./data/helpers/projectModel');

router.get('/', (req, res) => {
    actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'internal server error' + error })
        })

})


router.delete('/:id', (req, res) => {
    const { id } = req.params
    actions.remove(id)
        .then(action => {
            if (action && action > 0) {
                res.status(200).json({ success: `post ${id} was successfully deleted` })
            }
            else {
                res.status(404).json({ message: 'the action with that id does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'internal server error' + error })
        })
})

router.post('/:id', validateProjectId, validateAction, (req, res) => {
    const { description, notes, completed } = req.body
    actions.insert({
        project_id: req.project.id, description, notes, completed
    })
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            res.status(500).json({ error: 'internal server error' + error })
        })
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    actions.update(req.action.id, req.body)
        .then(() => {
            res.status(200).json({ ...req.action, ...req.body })
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'internal server error' })
        })
})

function validateAction(req, res, next) {
    if (Object.keys(req.body).length) {
        if (req.body.notes && req.body.description) {
            next();
        }
        else {
            res.status(400).json({ message: "all fields are required!" });
        }
    }
    else {
        res.status(400).json({ message: "missing action data" });
    }
}

function validateActionId(req, res, next) {
    actions.get(req.params.id)
        .then(action => {
            if (action) {
                req.action = action;
                next()
            } else {
                res.status(404).json({ message: 'Action id does not correspond with an actual Action' });
            }
        })
        .catch(error => {
            res.status(404).json({ message: "invalid Action id: " + error.message })
        })
}


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