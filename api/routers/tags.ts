import {
    getTagRelatedItemsHandler,
    createTagHandler,
    deleteTagHandler
} from '../controllers/tags';

const router = require("express").Router();

router.get("/get", getTagRelatedItemsHandler);
router.post('/create', createTagHandler);
router.delete('/delete/:tagId', deleteTagHandler);

export default router;