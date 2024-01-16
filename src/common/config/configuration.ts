import { GatewayIntentBits } from 'discord.js';
export default () => ({
    general_settings: {
        dev_mode: process.env.DEV_MODE || false,
    },
    discord_config: {
        token: process.env.DISCORD_TOKEN,
        autoLogin: process.env.DISCORD_AUTOLOGIN || true,
        discordClientOptions: {
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
        },
    }
});