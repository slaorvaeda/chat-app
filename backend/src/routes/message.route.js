import expreess from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller';



const router = expreess.Router();




router.get('/user',protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;