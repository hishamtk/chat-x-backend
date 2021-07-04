const express = require('express');
const router = express.Router();
//controllers
const AuthController = require('../controllers/auth-controller');
const RoomController = require('../controllers/room-controller');
const UserController = require('../controllers/user-controller');

//middlewares
const registrationValidator = require('../validators/user-registration-validator')
const loginValidator = require('../validators/user-login-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const privateRoomValidator = require('../validators/room-private-validator');
const groupRoomValidator = require('../validators/room-group-validator');
const roomValidator = require('../validators/room-validator');
const roomAddMembersValidator = require('../validators/room-add-members-validator');
const roomDeleteMemberValidator = require('../validators/room-delete-members-validator');
const roomAddAdminValidator = require('../validators/room-add-admin-validator');
const roomDeleteAdminValidator = require('../validators/room-delete-admin-validator');

router.post('/registers',  registrationValidator, AuthController.register);
router.post('/sessions',  loginValidator, AuthController.login);

router.post('/rooms/private', authMiddleware, privateRoomValidator, RoomController.createPrivate);
router.post('/rooms/group', authMiddleware, groupRoomValidator, RoomController.createGroup);
router.put('/rooms/:id', authMiddleware, roomValidator, RoomController.update);
router.put('/rooms/:id/members', authMiddleware, roomAddMembersValidator, RoomController.addMembers);
router.delete('/rooms/:id/members', authMiddleware, roomDeleteMemberValidator, RoomController.deleteMember);
router.put('/rooms/:id/admins', authMiddleware, roomAddAdminValidator, RoomController.addAdmin);
router.delete('/rooms/:id/admins', authMiddleware, roomDeleteAdminValidator, RoomController.deleteAdmin);

router.get('/user/rooms', authMiddleware, UserController.listRooms);
router.get('/users', authMiddleware, UserController.search);

module.exports = router;