import express from "express";
import Mark from "../models/marks.js";
import User from "../models/user.js";
import middleware from "../utils/middleware.js";
const markRouter = express.Router();
const { userExtractor } = middleware;
markRouter.get("/", async (request, response) => {
    const marks = await Mark.find({}).populate("user", { username: 1, name: 1 });
    response.json(marks);
});
markRouter.get("/:id", async (request, response) => {
    const mark = await Mark.findById(request.params.id);
    response.json(mark);
});
markRouter.post("/", userExtractor, async (request, response, next) => {
    if (request.body === undefined) {
        return response.status(400).json({ error: "content is missing" });
    }
    if (!request.body.likes) {
        Object.assign(request.body, { likes: 0 });
    }
    if (!request.body.tag) {
        return response.status(400).json({ error: "tag is missing" });
    }
    if (!request.body.title) {
        return response.status(400).json({ error: "title is missing" });
    }
    if (!request.body.url) {
        return response.status(400).json({ error: "url is missing" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body } = request;
    const { user } = response.locals;
    const mark = new Mark({
        title: body.title,
        tag: body.tag,
        url: body.url,
        likes: body.likes,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        user: user._id,
    });
    const savedMark = await mark.save();
    if (!user) {
        return response.status(401).json({ error: "token is invalid" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    user.marks = user.marks.concat(savedMark._id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await user.save();
    response.status(201).json(savedMark);
});
markRouter.delete("/:id", userExtractor, async (request, response, next) => {
    const user = await User.findById(response.locals.user.id);
    const mark = await Mark.findById(request.params.id);
    if (!mark) {
        return response.status(401).json({ error: "Blog problem" });
    }
    if (!user) {
        return response.status(401).json({ error: "user problem" });
    }
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (mark.user.toString() === user._id.toString()) {
        await Mark.findByIdAndRemove(request.params.id);
    }
    else {
        return response
            .status(401)
            .json({ error: "You do not have the permission to delete this blog!" });
    }
    response.status(204).end();
});
markRouter.put("/:id", userExtractor, async (request, response, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body } = request;
    const { user } = response.locals;
    if (!user) {
        return response.status(401).json({ error: "token is invalid" });
    }
    const mark = {
        title: body.title,
        tag: body.tag,
        url: body.url,
        likes: body.likes,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        user: user._id,
    };
    const updatedMark = await Mark.findByIdAndUpdate(request.params.id, mark, {
        new: true,
    });
    response.json(updatedMark);
});
export default markRouter;
//# sourceMappingURL=mark.js.map