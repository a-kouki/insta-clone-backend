import { Router, Request, Response } from 'express';
import multer from 'multer';


import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailuserController } from './controllers/user/DetailUserController'
import { UpdatedUserController } from './controllers/user/UpdatedUserController';

import { PublishController } from './controllers/publish/PublishController';

import { CreateImageController } from './controllers/data_img/CreateImageController';

import { GetAllPostsController } from './controllers/PostController';

import { GetUserProfileController } from './controllers/GetUserProfileController';

import {MeDataController} from './controllers/MeController';
import { CheckingFollowController } from './controllers/CheckingFollowController';

import { FollowUserController } from './controllers/follows/FollowUserController';
import { UnfollowUserController } from './controllers/follows/UnfollowUserController';
import { ListFollowController } from './controllers/follows/ListFollowController';

import { LikeController} from './controllers/like/LikeController';
import { UnLikeController } from './controllers/like/UnLikeController';
import { CheckingLikeController } from './controllers/like/CheckingLikeController';

import { CheckPostOwnerController } from './controllers/checkingPost/CheckingPostController';

import { DeletePostController } from './controllers/deletepost/DeletePostController';

import { ProfileImageController } from './controllers/alter_profile_img/ProfileImageController';
import { DeleteProfileImageController } from './controllers/alter_profile_img/DeleteProfileImageController';

import { SearchControler } from './controllers/search/Searchcontroller';

import { CreateCommentController } from './controllers/comments/CommentController';

import { DeleteMeController } from './controllers/user/DeleteMeController';

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadconfig from './config/multer'

const router = Router();
const upload = multer(uploadconfig.upload("./temp"));
//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated,  new DetailuserController().handle )
//alter some data profile
router.put('/me', isAuthenticated,  new UpdatedUserController().handle )
router.delete("/delete-me", isAuthenticated, new DeleteMeController().handle);


//for publish
//router.post('/publish', isAuthenticated, upload.single('files'), new PublishController().handle)
router.post('/publish', isAuthenticated, new PublishController().handle)
//Checking for edit
router.get("/api/check-post-owner", isAuthenticated, new CheckPostOwnerController().handle);
//delete post
router.delete("/api/deletepost", isAuthenticated, new DeletePostController().handle )


//Envio de Imagem
//* .single mas pode mudar para envio de varias imagens
//router.post('/image', isAuthenticated, upload.single('files'), new CreateImageController().handle)
router.post('/image', isAuthenticated, new CreateImageController().handle)

// Feed Instagram
router.get('/instagram', new GetAllPostsController().handle);

//show profile users
router.get('/:username', isAuthenticated, new GetUserProfileController().handle);

//dados do usuario acessado
router.get('/profile', isAuthenticated, new MeDataController().handle);

// Rota para checar se o usuário logado segue o usuário visitado
router.get('/checkingfollow/:profileUserId', isAuthenticated, new CheckingFollowController().handle);
//follow and unfollow
router.post('/follow', isAuthenticated, new FollowUserController().handle);
router.delete('/unfollow', isAuthenticated, new UnfollowUserController().handle);
router.get('/listfollow/:type', isAuthenticated, new ListFollowController().handle);

//Like
router.get('/checkinglike/:postId', isAuthenticated, new CheckingLikeController().handle);
router.post('/like', isAuthenticated, new LikeController().handle)
router.delete('/unlike',isAuthenticated, new UnLikeController().handle);

//post to alter profile img
//router.post('/upload/profile', isAuthenticated,upload.single('files'), new ProfileImageController().handle)
router.post('/upload/profile', isAuthenticated, new ProfileImageController().handle)
router.delete('/deletephoto', isAuthenticated, new DeleteProfileImageController().handle);

//search
router.get('/search/users', isAuthenticated, new SearchControler().handle);

//comment
router.post('/comment', isAuthenticated, new CreateCommentController().handle);
export { router }; 