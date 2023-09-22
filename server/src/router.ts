import express from 'express';
import {
  createProjects,
  editProjects,
  listProjects,
} from './project/project.handlers';
import {
  listLogs,
  createLogs,
  deleteLogs,
  detailLogs,
  updateLogStatus,
} from './log/log.handlers';

const router = express.Router();

/**
 * @openapi
 * /api/project:
 *   post:
 *     tags: [Project]
 *     summary: Get all projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 example: {}
 *               sort:
 *                 type: object
 *                 properties:
 *                   sortKey:
 *                     type: string
 *                     example: "projectId"
 *                   sortOrder:
 *                     type: string
 *                     example: "ASC"
 *                 required:
 *                   - sortKey
 *                   - sortOrder
 *               limit:
 *                 type: number
 *                 example: 10
 *               offset:
 *                 type: number
 *                 example: 0
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: {}
 */
router.post('/project', listProjects);

/**
 * @openapi
 * /api/project/create:
 *   post:
 *     tags: [Project]
 *     summary: Create a project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectCode:
 *                 type: string
 *             required:
 *               - projectCode
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: {}
 */
router.post('/project/create', createProjects);

/**
 * @openapi
 * /api/project/edit/{projectId}:
 *   put:
 *     tags: [Project]
 *     summary: Edit a project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectCode:
 *                 type: string
 *             required:
 *               - projectCode
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: {}
 */
router.put('/project/edit/:projectId', editProjects);

/**
 * @openapi
 * /api/logs/all:
 *   post:
 *     tags: [Logs]
 *     summary: Get all logs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 properties:
 *                   logType:
 *                     type: object
 *                     properties:
 *                      IN:
 *                       type: string
 *                       example: [string]
 *               sort:
 *                 type: object
 *                 properties:
 *                   sortKey:
 *                     type: string
 *                     example: "logId"
 *                   sortOrder:
 *                     type: string
 *                     example: "ASC"
 *                 required:
 *                   - sortKey
 *                   - sortOrder
 *               limit:
 *                 type: number
 *                 example: 10
 *               offset:
 *                 type: number
 *                 example: 0
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: {}
 */
router.post('/logs/all', listLogs);

/**
 * @openapi
 * /api/logs:
 *   post:
 *     tags: [Logs]
 *     summary: Create a log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logText:
 *                 type: string
 *               logType:
 *                 type: string
 *                 enum: [ERROR, INFO, WARNING]
 *               status:
 *                 type: string
 *               meta:
 *                 type: string
 *               project:
 *                 type: object
 *                 properties:
 *                  projectId:
 *                   type: string
 *             required:
 *               - logText
 *               - logType
 *               - project
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: {}
 */
router.post('/logs', createLogs);

/**
 * @openapi
 * /api/logs/{logId}:
 *   delete:
 *     tags: [Logs]
 *     summary: Delete a log
 *     parameters:
 *       - in: path
 *         name: logId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: {}
 */
router.delete('/logs/:id', deleteLogs);

/**
 * @openapi
 * /api/logs/{logId}:
 *   get:
 *     tags: [Logs]
 *     summary: Update log status
 *     parameters:
 *       - in: path
 *         name: logId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: {}
 */
router.get('/logs/:id', detailLogs);

/**
 * @openapi
 * /api/logs/{logId}:
 *   patch:
 *     tags: [Logs]
 *     summary: Update log status
 *     parameters:
 *       - in: path
 *         name: logId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [UN_RESOLVED, RESOLVED]
 *             required:
 *               - status
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example: {}
 */
router.patch('/logs/:logId', updateLogStatus);

export default router;
