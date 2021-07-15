import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            dm: true,
            aliases: ['h']
        })
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
        if (!parsedArgs.joined) {
            const commands = this.handler.commands.keys()
            const categories: { [key: string]: ICommand[] } = {}
            for (const command of commands) {
                const info = this.handler.commands.get(command)
                if (!command) continue
                if (!info?.config?.category || info.config.category === 'dev') continue
                if (Object.keys(categories).includes(info.config.category)) categories[info.config.category].push(info)
                else {
                    categories[info.config.category] = []
                    categories[info.config.category].push(info)
                }
            }
            let text = `let text = *╭────┈ ↷
✥▬ *❄️_Ayanoukoji_❄️* ▬✥
👋️ Konnichiwa!, *I am Ayanoukoji*
╭────┈
❏ *Owner: Gantx_Hckr*
❏ *Contact: https://wa.me/2663715606285*
❏ *Github:  https://github.com/Gantx-Hckr/4nonym0us* 
───────╯
 
🌟️ *𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧* 🌟️
  
🎴✥▬ *General-Commands* ▬✥
╰─↝
*${client._config.prefix}help*
*${client._config.prefix}admins*
*${client._config.prefix}everyone*
*${client._config.prefix}profile*
*${client._config.prefix}xp*
*${client._config.prefix}delete*
*${client._config.prefix}owner*
    ╰─────────────────┈⁂
    
🎴✥▬ *Media-Commands* ▬✥
   ╰─↝
*${client._config.prefix}yts [query]*
*${client._config.prefix}yta [link]*
*${client._config.prefix}ytv [link]*
*${client._config.prefix}lyrics [query]*
*${client._config.prefix}xspotify [link]*
*${client._config.prefix}play [query]*
╰─────────────────┈⁂
   
🎴✥▬ *Admin-Commands* ▬✥
╰─↝
*${client._config.prefix}act mod*
*${client._config.prefix}act events*
*${client._config.prefix}act safe*
*${client._config.prefix}act nsfw*
*${client._config.prefix}purge*
*${client._config.prefix}promote [@user]*
*${client._config.prefix}demote [@user]*
*${client._config.prefix}remove [@user]*
╰─────────────────┈⁂
   
🎴✥▬ *Other-Commands* ▬✥
   ╰─↝
*${client._config.prefix}chess*
*${client._config.prefix}trigger*
*${client._config.prefix}subred* 
*${client._config.prefix}sticker [tag a pic]* 
*${client._config.prefix}blur [tag a pic]*
╰─────────────────┈⁂ 
   
🔰 *Credits* 🔰
❏ *Ban Sensei
❏ *Simp Freakin" Sama* `\n\n`
            const keys = Object.keys(categories)
            for (const key of keys)
                text += `${this.emojis[keys.indexOf(key)]} *${this.client.util.capitalize(key)}*\n❐ \`\`\`${categories[
                    key
                ]
                    .map((command) => command.config?.command)
                    .join(', ')}\`\`\`\n\n`
                
            return void M.reply(
                `${text} 🗃️ *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void M.reply(`No Command of Alias Found | "${key}"`)
        const state = await this.client.DB.disabledcommands.findOne({ command: command.config.command })
        M.reply(
            `🎫 *Command:* ${this.client.util.capitalize(command.config?.command)}\n🎗️ *Status:* ${
                state ? 'Disabled' : 'Available'
            }\n🀄 *Category:* ${this.client.util.capitalize(command.config?.category || '')}${
                command.config.aliases
                    ? `\n🍥 *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                    : ''
            }\n🃏 *Group Only:* ${this.client.util.capitalize(
                JSON.stringify(!command.config.dm ?? true)
            )}\n🎀 *Usage:* ${command.config?.usage || ''}\n\n🔖 *Description:* ${command.config?.description || ''}`
        )
    }

    emojis = ['🌀', '🎴', '🔮', '👑', '🎈', '⚙️', '🍀']
}
            
