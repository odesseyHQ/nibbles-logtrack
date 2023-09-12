import express from 'express';
import { listProjects } from './project.handlers';

const router = express.Router();

router.post('/', listProjects);

export default router;
