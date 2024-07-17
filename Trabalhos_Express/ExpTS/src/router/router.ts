import { Router } from 'express'

import mainController from '../controllers/main'

const router = Router();

router.get("/hb1", mainController.hb1)
router.get("/hb2", mainController.hb2)
router.get("/hb3", mainController.hb3)
router.get('/hb4', mainController.hb4)
router.get('/hb5', mainController.hb5)
router.get('/', mainController.bemvindo)
router.get('/sobre', mainController.sobrenos)
router.get('/lorem/:amount', mainController.lorem)

export default router