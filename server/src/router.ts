import express from 'express';
import projectRoutes from './project/project.routes';

const router = express.Router();

router.use('/project', projectRoutes);

export default router;
