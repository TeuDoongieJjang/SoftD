import express from 'express'
import {home, login, ioOp, logout, userEdit, userView, io, signup, view} from '../controllers/directController.js'
import cors from 'cors'

const router = express.Router()

router.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

router.get('/:id', home)
router.post('/login', login)
router.get('/logout', logout)
router.get('/io/:id', io)
router.put('/io/:id/:action', ioOp)
router.post('/signup', signup)
router.get('/view/:id', view)
router.put('/user/edit/:id', userEdit)
router.get('/user/edit/:id', userView)

export default router