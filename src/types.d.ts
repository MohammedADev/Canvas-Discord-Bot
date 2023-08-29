import {
    SlashCommandBuilder,
    CommandInteraction,
    Collection,
    PermissionResolvable,
    Message,
    AutocompleteInteraction,
    ChatInputCommandInteraction,
} from "discord.js";

export interface SlashCommand {
    command: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    cooldown?: number; // in seconds
}

export interface Command {
    name: string;
    execute: (message: Message, args: Array<string>) => void;
    permissions: Array<PermissionResolvable>;
    aliases: Array<string>;
    cooldown?: number;
}

interface GuildOptions {
    prefix: string;
}

export type GuildOption = keyof GuildOptions;
export interface BotEvent {
    name: string;
    once?: boolean | false;
    execute: (...args) => void;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            CLIENT_ID: string;
            ACCESS: string;
            SUPABASE_URL: string;
            SUPABASE_ANON: string;
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        commands: Collection<string, Command>;
        cooldowns: Collection<string, number>;
    }
}
