/**
 * The entry point for the action.
 * @param params Input object
 * 
 * @returns {Promise}
 */
function main(params) {
    return new Promise(
        (resolve, reject) => {
            //send message to slack channel

            try {
                var IncomingWebhook = require("@slack/client").IncomingWebhook;
            } catch (err) {
                console.log(err);
                reject({
                        "message": "Could not load @slack/client",
                        "error": err.toString()
                    }
                );
            }

            var url = params.slack_webhook_url;

            var webhook = new IncomingWebhook(url);

            console.log(params);

            
            var slack_message_text = params.asset.name + " created.";

            /*var slack_message = {
                attachments: [
                    {
                        fallback: slack_message_text,
                        color: "#36a64f",
                        pretext: "",
                        text: slack_message_text,
                        "image_url": images !== null && typeof(images) !== "undefined" ? images[0].original_url : params.data.drink.keg.illustration_thumbnail_url,
                        "thumb_url": images !== null && typeof(images) !== "undefined" ? images[0].thumbnail_url : params.data.drink.keg.illustration_thumbnail_url,
                        "footer": "Kegbot API",
                        "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png"
                    }
                ]
            }*/

            webhook.send(slack_message_text,
                function (err, res) {
                    if (err) {
                        console.log('Error:', err);
                        reject(params);
                    } else {
                        console.log('Message sent: ', res);
                        resolve(params);
                    }
                });
        }
    );
}

export default main;