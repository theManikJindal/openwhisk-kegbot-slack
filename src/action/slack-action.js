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
            var link_to_asset = "https://assets-stage.adobecc.com/file?location=https://cc-ap1-stage.adobesc.com/api/v1/assets/" + params.asset.urn.substr(params.asset.urn.lastIndexOf(':')+1);

            var slack_message = {
                attachments: [
                    {
                        fallback: slack_message_text,
                        color: "#36a64f",
                        pretext: "",
                        text: slack_message_text,
                        title: slack_message_text,
                        title_link: link_to_asset,
                        "footer": "BladeRunner Action",
                        "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png"
                    }
                ]
            }

            webhook.send(slack_message,
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