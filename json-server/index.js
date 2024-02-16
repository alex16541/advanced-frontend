// server.js
const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

function isAuthorized(req) {
    return !!req.headers.authorization;
}

server.use(async (req, res, next) => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((res) => setTimeout(res, 1000));
    next();
});

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users } = db;

    const userFromDb = users.find(
        (user) => user.username === username && user.password === password,
    );

    if (userFromDb) {
        return res.json(userFromDb);
    }

    return res.status(403).json({ massage: 'AUTH ERROR' });
});

server.use((req, res, next) => {
    if (isAuthorized(req)) {
        next();
    } else {
        res.sendStatus(401);
    }
});

server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running on 3001 port');
});
