import R from 'ramda';
import Story from '../models/Story';

const justValidFields = R.pick(['question']);

class StoryController {
    async create(req, res) {
        const { recordId } = req.params;
        const payload = R.merge(justValidFields(req.body), { record_id: recordId });
        const story = await Story.create(payload);
        res.json(201, story);
    }

    async reply(req, res) {
        const { recordId, storyId } = req.params;
        await Story.reply(recordId, storyId, req.body.answer);
        res.send(204);
    }
}

const controller = new StoryController();
export default controller;
