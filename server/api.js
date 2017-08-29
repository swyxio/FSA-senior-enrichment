'use strict'
const api = require('express').Router()
const db = require('../db')
const {Campus, Student} = require('../db/models')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
// api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.get('/campuses', async (req, res) => {
	res.json(await Campus.findAll())
})
api.get('/campuses/:id', async (req, res) => {
	const foundcampus = await Campus.findById(req.params.id)
	if (!foundcampus) res.status(404).send()
	const foundStudents = await Student.findAll({
		where: {campusId: req.params.id},
		include: { model: Campus, as: 'campus' }
	})
	res.json({
		campus: foundcampus,
		students: foundStudents
	})
})
api.post('/campuses', async (req, res) => {
	if (!req.body.imageUrl) res.status(500).send()
	const campus = await Campus.create(req.body)
	res.json({message: 'Created successfully', campus})
})
api.put('/campuses/:id', async (req, res) => {
	try {
		var x = await Campus.update(req.body, {where: {id: req.params.id}, returning: true})
		res.json({
			message: 'Updated successfully',
			campus: x[1][0]
		})
	} catch (err) {
		res.status(500).send()
	}
})
api.delete('/campuses/:id', async (req, res) => {
	const foundcampus = await Campus.findById(req.params.id)
	if (!foundcampus) return res.status(404).send()
	try {
		await Campus.destroy({where: {id: req.params.id}})
		res.status(200).send()
	} catch (err) {
		res.status(404).send()
	}
})


api.get('/students', async (req, res) => {
	res.json(await Student.findAll({
		include: { model: Campus, as: 'campus' }
	}))
})
api.get('/students/:id', async (req, res) => {
	const r = await Student.findById(req.params.id, {
		include: { model: Campus, as: 'campus' }
	})
	r ? res.json(r) : res.status(404).send()
})
api.post('/students', async (req, res) => {
	if (!req.body.bio) return res.status(500).send()
	if (!req.body.campusId) return res.status(500).send() // check for attached campus
	
	try {
		var attachedCampus = await Campus.findById(req.body.campusId);
		if (!attachedCampus) return res.status(500).send()
		const student = await Student.create({bio: req.body.bio, name: req.body.name})
		var created = await student.setCampus(attachedCampus)
		res.json({message: 'Created successfully', student})
	} catch (err) {
		res.status(404).send(err)
	}
})
api.put('/students/:id', async (req, res) => {
	try {
		var x = await Student.update(req.body, {where: {id: req.params.id}, returning: true})
		res.json({
			message: 'Updated successfully',
			student: x[1][0]
		})
	} catch (err) {
		res.status(500).send()
	}
})
api.delete('/students/:id', async (req, res) => {
	const foundStudent = await Student.findById(req.params.id)
	if (!foundStudent) return res.status(404).send()
	try {
		await Student.destroy({where: {id: req.params.id}})
		res.status(200).send()
	} catch (err) {
		res.status(404).send()
	}
})


module.exports = api