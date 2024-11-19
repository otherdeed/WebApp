require('dotenv').config()
const {Bot, GrammyError, HttpError} = require('grammy')
const bot = new Bot(process.env.BOT_API_KEY)
const webUrl = 'https://rotten-breads-rest.loca.lt'
bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Start the bot'
    }
])
bot.command('start', async (ctx) =>{
    await ctx.reply('Hello, I am Bot',{
        reply_markup:{
            inline_keyboard:[
                [
                    {
                        text:'Open Web App',
                        web_app:{url:webUrl}
                    }
                ]
            ]
        }
    })
    console.log(ctx.from);
})
bot.on(':voice', async (ctx) =>{
    await ctx.reply('Bot do not supported voice message')
})
bot.catch((err) =>{
    const ctx = err.ctx
    console.error(`Error in handler: ${ctx.update.update_id}:`)
    const e = err.error
    if(e instanceof GrammyError){
        console.error(`Error in request: ${e.description}`)
    } else if(e instanceof HttpError){
        console.error(`Cloud not contact Telegram ${e}`)
    } else{
        console.error('Unknown error:', e)
    }
})
bot.start()