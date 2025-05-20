import express from 'express';
import { sequelize } from './utils/db';
import routes from "./routes";
import {env} from "./utils/env";
import cors from "cors";

sequelize.sync({ alter: true }).then(() => {
    startApp()
});

function startApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/api/v1', routes)
    const PORT = env?.SERVER_PORT;
    app.listen(PORT, env?.SERVER_HOST, () => console.log(`Server running on port ${env?.SERVER_HOST}:${PORT}`));
}

