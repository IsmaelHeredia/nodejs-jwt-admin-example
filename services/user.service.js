const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');

module.exports = {
    login,
    register,
};

async function login(username,password) {
    const user = await db.User.scope('withPassword').findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password)))
        throw 'Bad Login';

    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function register(params) {
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'User "' + params.username + '" exists';
    }

    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    await db.User.create(params);
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}