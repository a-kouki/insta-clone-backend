"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const UpdatedUserController_1 = require("./controllers/user/UpdatedUserController");
const PublishController_1 = require("./controllers/publish/PublishController");
const CreateImageController_1 = require("./controllers/data_img/CreateImageController");
const PostController_1 = require("./controllers/PostController");
const GetUserProfileController_1 = require("./controllers/GetUserProfileController");
const MeController_1 = require("./controllers/MeController");
const CheckingFollowController_1 = require("./controllers/CheckingFollowController");
const FollowUserController_1 = require("./controllers/follows/FollowUserController");
const UnfollowUserController_1 = require("./controllers/follows/UnfollowUserController");
const ListFollowController_1 = require("./controllers/follows/ListFollowController");
const LikeController_1 = require("./controllers/like/LikeController");
const UnLikeController_1 = require("./controllers/like/UnLikeController");
const CheckingLikeController_1 = require("./controllers/like/CheckingLikeController");
const CheckingPostController_1 = require("./controllers/checkingPost/CheckingPostController");
const DeletePostController_1 = require("./controllers/deletepost/DeletePostController");
const ProfileImageController_1 = require("./controllers/alter_profile_img/ProfileImageController");
const DeleteProfileImageController_1 = require("./controllers/alter_profile_img/DeleteProfileImageController");
const Searchcontroller_1 = require("./controllers/search/Searchcontroller");
const CommentController_1 = require("./controllers/comments/CommentController");
const DeleteMeController_1 = require("./controllers/user/DeleteMeController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./temp"));
//-- ROTAS USER --
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailuserController().handle);
//alter some data profile
router.put('/me', isAuthenticated_1.isAuthenticated, new UpdatedUserController_1.UpdatedUserController().handle);
router.delete("/delete-me", isAuthenticated_1.isAuthenticated, new DeleteMeController_1.DeleteMeController().handle);
//for publish
//router.post('/publish', isAuthenticated, upload.single('files'), new PublishController().handle)
router.post('/publish', isAuthenticated_1.isAuthenticated, new PublishController_1.PublishController().handle);
//Checking for edit
router.get("/api/check-post-owner", isAuthenticated_1.isAuthenticated, new CheckingPostController_1.CheckPostOwnerController().handle);
//delete post
router.delete("/api/deletepost", isAuthenticated_1.isAuthenticated, new DeletePostController_1.DeletePostController().handle);
//Envio de Imagem
//* .single mas pode mudar para envio de varias imagens
//router.post('/image', isAuthenticated, upload.single('files'), new CreateImageController().handle)
router.post('/image', isAuthenticated_1.isAuthenticated, new CreateImageController_1.CreateImageController().handle);
// Feed Instagram
router.get('/instagram', new PostController_1.GetAllPostsController().handle);
//show profile users
router.get('/:username', isAuthenticated_1.isAuthenticated, new GetUserProfileController_1.GetUserProfileController().handle);
//dados do usuario acessado
router.get('/profile', isAuthenticated_1.isAuthenticated, new MeController_1.MeDataController().handle);
// Rota para checar se o usuário logado segue o usuário visitado
router.get('/checkingfollow/:profileUserId', isAuthenticated_1.isAuthenticated, new CheckingFollowController_1.CheckingFollowController().handle);
//follow and unfollow
router.post('/follow', isAuthenticated_1.isAuthenticated, new FollowUserController_1.FollowUserController().handle);
router.delete('/unfollow', isAuthenticated_1.isAuthenticated, new UnfollowUserController_1.UnfollowUserController().handle);
router.get('/listfollow/:type', isAuthenticated_1.isAuthenticated, new ListFollowController_1.ListFollowController().handle);
//Like
router.get('/checkinglike/:postId', isAuthenticated_1.isAuthenticated, new CheckingLikeController_1.CheckingLikeController().handle);
router.post('/like', isAuthenticated_1.isAuthenticated, new LikeController_1.LikeController().handle);
router.delete('/unlike', isAuthenticated_1.isAuthenticated, new UnLikeController_1.UnLikeController().handle);
//post to alter profile img
//router.post('/upload/profile', isAuthenticated,upload.single('files'), new ProfileImageController().handle)
router.post('/upload/profile', isAuthenticated_1.isAuthenticated, new ProfileImageController_1.ProfileImageController().handle);
router.delete('/deletephoto', isAuthenticated_1.isAuthenticated, new DeleteProfileImageController_1.DeleteProfileImageController().handle);
//search
router.get('/search/users', isAuthenticated_1.isAuthenticated, new Searchcontroller_1.SearchControler().handle);
//comment
router.post('/comment', isAuthenticated_1.isAuthenticated, new CommentController_1.CreateCommentController().handle);
