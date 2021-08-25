const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authService = require('../services/authService');

module.exports = {
    async register(req, res) {
        const { email } = req.body;

        try {
            if(await User.findOne({ where: { email }})) {
                return res.status(400).json({ error: 'User already existis' });
            }

            req.body.password = await bcrypt.hash(req.body.password, 10);

            const user = await User.create(req.body);

            user.password = undefined;

            const token = authService.generateToken(user);

            return res.json({ user, token });

        } catch(error) {
            return res.status(500).json({ error: 'Registration failed ' });

        }
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});

        if(!user) {
            return res.status(400).json({ error: 'User not found' });

        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ error: 'Password incorect' });

        }

        user.password = undefined;

        const token = authService.generateToken(user);

        return res.json({ user, token });

    },

    async me(req, res) {
        res.json({ user: await User.findByPk(req.userId) });
    }
}
