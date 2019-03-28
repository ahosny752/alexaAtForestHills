// SMS variables
var sid = 'AC440f5f1c547d3048f67aafd3b6fb2f92';
var token = 'e4d8efb75f9eac6bd1f9cea86a186072';
var sender = '+14845467109';

var https = require('https');
var queryString = require('querystring');



//food recommendation

var sushiInfo = " Sushi I see, My favorite sushi place around here is Benny Hanna. It is located just 2 blocks North on chester and 15th st, Bring me back some dumplings please! ";
var steakInfo = "So you want steak? Hmm, Texas Road House is .7 miles away. They have 5 star on yelp.  ";
var pizzaInfo = "Pizza Party! There are 3 Pizza restaurants within 1.5 miles of your destination. The closest one is Dominos Pizza located on 3rd and jackson st. ";
var burgerInfo = "Burgers, Great Choice! Forest Hills is flourishing with the best burger joints in town. Hungry for a snack, check out Five Guys burgers and Fries. Located just 2 miles away in the north hills shopping center. ";
var sushiPicUrl = "https://s3.amazonaws.com/ahosny/sushi.jpg";
var steakPicUrl = "https://s3.amazonaws.com/ahosny/steak.jpg";
var pizzaPicUrl = "https://s3.amazonaws.com/ahosny/dominos.jpg";
var burgerPicUrl = "https://s3.amazonaws.com/ahosny/five+guys.jpg";

var foodInfo = { //Array of food info
    "sushiRecc": sushiInfo,
    "steakRecc": steakInfo,
    "pizzaRecc": pizzaInfo,
    "burgersRecc":burgerInfo,
    "sushiPic": sushiPicUrl,
    "steakPic": steakPicUrl,
    "pizzaPic": pizzaPicUrl,
    "burgersPic": burgerPicUrl,
    

    
};

// Wifi Information
var wifiInfo = "Scan the code below to recieve the wifi password";
var wifiPicUrl = "https://s3.amazonaws.com/ahosny/My_PDF.png";

var internetInfo = {
    "wifiDesc": wifiInfo,
    "wifiPic": wifiPicUrl,
};

// Breakfast info

var breakfastInfo = "Breakfast is served every day at 10:00 a.m. Scan the QR code below to view the menu.";
var breakfastPicUrl = "https://s3.amazonaws.com/ahosny/Breakfast_Menu.png";

var breakfastarrayInfo = {
    "breakfastDesc": breakfastInfo,
    "breakfastPic": breakfastPicUrl,
};





// SDK setup and standard constants
'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;
const SKILL_NAME = 'AirBnb at Forest Hills';



// LaunchRequest
const handlers = {
    'LaunchRequest': function () {
        var speechOutput = 'Welcome to 2014 forest hills drive, my name is Alexa and I’ll be your virtual concierge. You can ask me things like, What time is breakfast? What’s the wifi password or Where’s the closest grocery store? I can even tell you some of my favorite places to eat. And when you are ready to relax after a night out in the city, just say Alexa do not disturb, and I’ll inform room service. Let me know how I can help!';
        var reprompt = "How can I help?";
        this.response.speak(speechOutput);
        this.response.listen(reprompt);
        this.emit(":responseReady");
    },


// Intents
    'foodIntent': function (){
         if (this.event.request.intent.slots.foodType.value &&
            (this.event.request.intent.slots.foodType.value == "sushi" ||
                this.event.request.intent.slots.foodType.value == "steak" ||
                this.event.request.intent.slots.foodType.value == "pizza" ||
                this.event.request.intent.slots.foodType.value == "burgers")) 
        {
            var food = this.event.request.intent.slots.foodType.value;
           
          if (supportsDisplay.call(this) || isSimulator.call(this)) { //If on echo show or any device with a screen
                exampleBodyTemplate.call(this, null, "testToken", "BodyTemplate7", "Restaurants that serve " + food, "PlainText",
                    foodInfo[food + "Recc"], "Google Map View", foodInfo[food + "Pic"],
                    "VISIBLE", "<speak>" + foodInfo[food + "Recc"] + " If you need help with anything else, let me know!." + "</speak>", null, false);
            }
        
        
        }
        if (this.event.request.intent.slots.foodType.value == "hot wings")
        {
            this.emit(':tell'," If you want Wings, we got things!. Located only 4 blocks away on 6th ave, Buffalo Wild Wings awaits for all of your saucey needs! ");
        }
    
    
    },
    
   
    'wifiIntent': function (){
    
     var wifi = "wifi";
     {
            
            if (supportsDisplay.call(this) || isSimulator.call(this)) { //If on echo show or any device with a screen
                exampleBodyTemplate.call(this, null, "testToken", "BodyTemplate7", "Scan the QR code below to recieve the password for the  " + wifi, "PlainText",
                    internetInfo[wifi + "Desc"], "Picture for major", internetInfo[wifi + "Pic"],
                    "VISIBLE", "<speak>" + internetInfo[wifi + "Desc"] + " If you need help with anything else, let me know!." + "</speak>", null, false);
            }
     
     }
    },
    
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "Sure, if you need anthing else, just let me know, goodbye!");
    },
    
  'breakfastIntent': function (){
    
     var breakfast = "breakfast";
     {
            
            if (supportsDisplay.call(this) || isSimulator.call(this)) { //If on echo show or any device with a screen
                exampleBodyTemplate.call(this, null, "testToken", "BodyTemplate7", "Scan the QR code below to recieve the password for the  " + breakfast, "PlainText",
                    breakfastarrayInfo[breakfast + "Desc"], "Breaksfast Information", breakfastarrayInfo[breakfast + "Pic"],
                    "VISIBLE", "<speak>" + breakfastarrayInfo[breakfast + "Desc"] + " If you need help with anything else, let me know!." + "</speak>", null, false);
            }
     
     }
    },
    
    'SendMessage': function() {
this.emit(':ask', 'No problem!, Your host has recieved your request!, Can I help you with anything else?');

},

'doNotDisturb': function() {
   
this.emit(':ask', 'Okay!, You will not be disturbed!, Can I help you with anything else?');

},

}; 

/*send message function*/
function SendMessage(to, body, callback) {

    var message = {
        To: to,
        From: sender,
        Body: body
    };

    var messageString = queryString.stringify(message);

    var options = {
        host: 'api.twilio.com',
        port: 443,
        path: '/2010-04-01/Accounts/' + sid + '/Messages.json',
        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(messageString),
                    'Authorization': 'Basic ' + new Buffer(sid + ':' + token).toString('base64')
                 }
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');
        var responseString = '';
        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
			var speechOutput = "Message sent.";
			var shouldEndSession = true;
			callback(buildSpeechletResponse(speechOutput, shouldEndSession));
        });

    });

    req.write(messageString);
    req.end();
}


//   when the intent is called function

function request(intentRequest, callback) {
    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;
    if("doNotDisturb" === intentName){
        var text = intent.slots.Text.value;
        var disturb = "Guest Request: Do not disturb ";
        var msg = disturb + text;
        var recipient = '+16109054171';
        SendMessage(recipient, msg,callback);
    
        
    } else if("SendMessage" === intentName){
        var text1 = intent.slots.Text.value;
        var disturb1 = "Guest Request:  ";
        var msg1 = disturb1 + text1;
        var recipient1 = '+16109054171';
        SendMessage(recipient1, msg1,callback);
    }
        
    

    
}





// Handler
exports.handler = function (event, context, callback) {
     const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
    

    try {

     if (event.request.type === "IntentRequest") { //handles the IntentRequest function
            request(event.request,
                     function callback(speechletResponse) {
                         context.succeed(buildResponse(speechletResponse));
                     });
        } 
    } catch (e) {
        context.fail("Exception: " + e);
    }

};




//-------Helper Methods---------//

function buildSpeechletResponse(output, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(speechletResponse) {
    return {
        version: "1.0",
        response: speechletResponse
    };
}

function supportsDisplay() {
    var hasDisplay =
        this.event.context &&
        this.event.context.System &&
        this.event.context.System.device &&
        this.event.context.System.device.supportedInterfaces &&
        this.event.context.System.device.supportedInterfaces.Display;

    return hasDisplay;
}

function isSimulator() {
    var isSimulator = !this.event.context; //simulator doesn't send context
    return isSimulator;
}

// BodyTemplate
function exampleBodyTemplate(pSessionAttributes, pToken, pBodyTemplate, pTitle, pPrimaryTextType,
    pPrimaryTextContent, pImageDesc, pImageURL, pBackButton, pOutputSpeech, pOutputReprompt, pShouldEndSession) {
    var response = {
        "version": "1.0",
        "response": {
            "directives": [{
                    "type": "Hint",
                    "hint": {
                        "type": "PlainText",
                        "text": "tell me about finance"
                    }
                },
                {
                    "type": "Display.RenderTemplate",
                    "token": pToken,
                    "template": {
                        "type": pBodyTemplate,
                        "title": pTitle,
                        "textContent": {
                            "primaryText": {
                                "type": pPrimaryTextType,
                                "text": pPrimaryTextContent
                            },
                        },
                        "image": {
                            "contentDescription": pImageDesc,
                            "sources": [{
                                "url": pImageURL
                            }]
                        },
                        "backButton": pBackButton
                    }

                }
            ],
            "outputSpeech": {
                "type": "SSML",
                "ssml": pOutputSpeech
            },
            "reprompt": {
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": pOutputReprompt
                }
            },
            "shouldEndSession": pShouldEndSession,
        },
        "sessionAttributes": pSessionAttributes
    };
    this.context.succeed(response);
}


