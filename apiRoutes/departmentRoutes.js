const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const getAllDepartmentsController = require('../Controllers/Department/getAllDepartments');
const getSingleDepartmentController = require('../Controllers/Department/getSingleDepartment');

// Get all departments
router.get('/', verifyToken, getAllDepartmentsController);

//Get a single department detail
router.get('/:department_Id', verifyToken, getSingleDepartmentController)

module.exports = router;