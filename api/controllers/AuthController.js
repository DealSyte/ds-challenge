class AuthController {
	async login(req, res) {
        res.json(req.user);
    }
}

const controller = new AuthController();
export default controller;
