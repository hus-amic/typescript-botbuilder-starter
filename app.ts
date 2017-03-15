/**
 * Created by ThanhPham on 3/7/2017.
 */
import * as restify from 'restify';
import * as builder from 'botbuilder';

export class Bot {
    server;
    connector ;


    constructor() {
        //Setting up restify server
        this.server = restify.createServer();
        this.server.listen(process.env.port || process.env.PORT || 3978, () => {
           console.log('%s listening to %s', this.server.name, this.server.url);
        });

        //Create chat bot
        this.connector = new builder.ChatConnector({
           appId : process.env.MICROSOFT_APP_ID,
            appPassword : process.env.MICROSOFT_APP_PASSWORD
        });

        var bot = new builder.UniversalBot(this.connector);
        this.server.post('/api/messages', this.connector.listen());

        // Start from here is the bot dialog

        bot.dialog('/', (session) => {
           session.send("Hello World!");
        });
    }


}
new Bot();