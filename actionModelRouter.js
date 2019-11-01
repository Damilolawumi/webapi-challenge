const express = require("express");
const actions = require('./data/helpers/actionModel');
const router = express.Router();

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

router.post('/:id', (req, res) => {
    const { id } = req.params
    const action = { ...req.body, project_id: id }

    if (action.description && action.notes && action.project_id) {
        actions.insert(action)
            .then(action => {
                res.status(201).json({ action });
            })
            .catch(error => {
                res.status(500).json({
                    error
                });
            });
    } else {
        res.status(400).json({ error: "Please provide project_id, description and notes for the action." });
    }

})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const action = { ...req.body, project_id: id }

    if (action.description && action.notes && action.project_id) {
        actions.update(action)
            .then(action => {
                res.status(201).json({ action });
            })
            .catch(error => {
                res.status(500).json({
                    error
                });
            });
    } else {
        res.status(400).json({ error: "Please provide project_id, description and notes for the action." });
    }

})

module.exports = router