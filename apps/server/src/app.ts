import express from 'express';
import { sequelize } from './utils/db';
import routes from "./routes";
import {env} from "./utils/env";

sequelize.sync({ alter: true }).then(() => {
    startApp()
});

function startApp() {
    const app = express();
    app.use(express.json());
    app.use(routes)
    const PORT = env?.SERVER_PORT;
    app.listen(PORT, env?.SERVER_HOST, () => console.log(`Server running on port ${env?.SERVER_HOST}:${PORT}`));
}

