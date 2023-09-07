import express from 'express';
import { listProjects } from './project.handlers';

const router = express.Router();

router.get('/', listProjects);

export default router;
