import { GatewayIntentBits } from 'discord.js';
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
export default () => ({
    general_settings: {
        dev_mode: process.env.DEV_MODE || false,
    },
    database_config: {
        host: process.env.RDNB_DB_HOST || 'localhost',
        port: parseInt(process.env.RDNB_DB_PORT) || 5432,
        username: process.env.RDNB_DB_USER || 'postgres',
        password: process.env.RDNB_DB_PASSWORD || 'postgres',
        database: process.env.RDNB_DB_NAME || 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        type: 'postgres',
        debug: true,
        logger: true,
        migrationsTableName: 'migrations',
        migrations: ['migrations/*.ts'],
        cli: {
            migrationsDir: 'migrations',
        }
    },
    discord_config: {
        token: process.env.DISCORD_TOKEN,
        autoLogin: process.env.DISCORD_AUTOLOGIN || true,
        discordClientOptions: {
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
        },
    }
});