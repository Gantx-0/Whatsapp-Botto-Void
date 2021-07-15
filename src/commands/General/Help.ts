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
            let text = `🎫 *╔══════════════
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
   〽 *${client._config.prefix}yts [query]*
   〽 *${client._config.prefix}yta [link]*
   〽 *${client._config.prefix}ytv [link]*
   〽 *${client._config.prefix}lyrics [query]*
   〽 *${client._config.prefix}xspotify [link]*
   〽 *${client._config.prefix}play [query]*
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
   ❏ *Simp Freakin" Sama*
            
🗃️ *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`
            }
        
