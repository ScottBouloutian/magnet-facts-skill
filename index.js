
const Alexa = require('alexa-sdk');

const APP_ID = process.env.MAGNET_FACTS_APP_ID;

const SKILL_NAME = 'Magnet Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a magnet fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    'Magnets are dipoles, meaning they have two poles. This is true even if you cut them in half.',
    'The most powerful magnets in the universe are a type of neutron star called a magnetar.',
    'The Earth is a magnet, with its own magnetic field.',
    'Rare Earth magnets are the strongest types of permanent magnets made.',
    'An electromagnet can be made by passing a current through a coiled wire.',
    'Nested magnets can amplify eachothers magnetic fields.',
    'Super conducting magnets can exhibit some strange quantum effects.',
    'Ferrofluids are a kind of magnetic liquid.',
    'Heating a magnet will cause it to lose its magnetic properties.',
    'Diamagnetic materials like Bismuth become magnetized in a direction opposite to any applied magnetic field.',
    'Hospitals use magnetic resonance imaging to form pictures of the anatomy of the body.',
    'A changing magnetic field will induce volatage in a conductor.',
    'Magnemite is a magnetic Pokemon which clings to steel towers and consumes electricity.',
];

const handlers = {
    LaunchRequest() {
        this.emit('GetNewFactIntent');
    },
    GetNewFactIntent() {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
    },
    'AMAZON.HelpIntent': function helpIntent() {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function cancelIntent() {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function stopIntent() {
        this.emit(':tell', STOP_MESSAGE);
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
