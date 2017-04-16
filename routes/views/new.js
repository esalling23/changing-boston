/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Index page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Index
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    Prompt = keystone.list('Prompt'),
    randomstring = require('randomstring'),
    GameSession = keystone.list('GameSession'),
    Icon = keystone.list('Icon'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals, 
        promptCode;
    // Init locals
    locals.section = 'group';
    locals.subSection = 'newgame';

    console.log(req.body);

    // Prevents generated code from being vulgar
    function checkCode(code, callback) {

        var fourLetter = ['ANUS', 'ARSE', 'CLIT', 'COCK', 'COON', 'CUNT', 'DAGO', 'DAMN', 'DICK', 'DIKE', 'DYKE', 'FUCK', 'GOOK', 'HEEB', 'HECK', 'HELL', 'HOMO', 'JIZZ', 'KIKE', 'KUNT', 'KYKE', 'LICK', 'MICK', 'MUFF', 'PAKI', 'PISS', 'POON', 'PUTO', 'SHIT', 'SHIZ', 'SLUT', 'SMEG', 'SPIC', 'TARD', 'TITS', 'TWAT', 'WANK', 'POOP', 'FUCK', 'FCUK', 'FUKK', 'KILL', 'JERK', 'CRAP', 'FOOK', 'DORK', 'DOPE', 'DUNG', 'FAGS', 'FART', 'GAYS', 'HELL', 'HOAR', 'JAPS', 'NAZI', 'ORGY', 'PORN', 'PUKE', 'RAPE', 'SEXY', 'SPIG', 'SUCK', 'STAB', 'SMUT', 'SPAZ', 'TWIT'];
        var threeLetter = ['ASS','FUC','FUK','FUQ','FUX','FCK','COC','COK','COQ','KOX','KOC','KOK','KOQ','CAC','CAK','CAQ','KAC','KAK','KAQ','DIC','DIK','DIQ','DIX','DCK','PNS','PSY','FAG','FGT','NGR','NIG','CNT','KNT','SHT','DSH','TWT','BCH','CUM','CLT','KUM','KLT','SUC','SUK','SUQ','SCK','LIC','LIK','LIQ','LCK','JIZ','JZZ','GAY','GEY','GEI','GAI','VAG','VGN','SJV','FAP','PRN','LOL','JEW','JOO','GVR','PUS','PIS','PSS','SNM','TIT','FKU','FCU','FQU','HOR','SLT','JAP','WOP','KIK','KYK','KYC','KYQ','DYK','DYQ','DYC','KKK','JYZ','PRK','PRC','PRQ','MIC','MIK','MIQ','MYC','MYK','MYQ','GUC','GUK','GUQ','GIZ','GZZ','SEX','SXX','SXI','SXE','SXY','XXX','WAC','WAK','WAQ','WCK','POT','THC','VAJ','VJN','NUT','STD','LSD','POO','AZN','PCP','DMN','ORL','ANL','ANS','MUF','MFF','PHK','PHC','PHQ','XTC','TOK','TOC','TOQ','MLF','RAC','RAK','RAQ','RCK','SAC','SAK','SAQ','PMS','NAD','NDZ','NDS','WTF','SOL','SOB','FOB','SFU'];

        if (_.contains (fourLetter, code))
            checkCode(generateCode(), callback);
        
        else if(threeLetter.some(function(s) { return code.indexOf(s) >= 0; }))
            checkCode(generateCode(), callback);

        else
            callback(code);

    }

    function generateCode() {
        
        var code = randomstring.generate({ length: 4, charset: 'alphabetic' }).toUpperCase();
        return code;

    }

    view.on('init', function(next) {

        var generatedCode = generateCode();

        console.log(generatedCode);

        // Make sure code is not vulgar and then check if not used already
        checkCode(generatedCode, function(code) {

            promptCode = code;

            res.setHeader('Game-Code', code);

            // Check if there's already a game with the generated access code
            GameSession.model.findOne({accessCode: promptCode}, function (err, session) {

                // There is! A one in 15,000 probability! Make a new one
                if(session !== null)
                    promptCode = generateCode();

                next(err);

            });

        });

    });

    view.on('init', function(next) {

        // Create a new Prompt with the given prompt question
        var newPost = new Prompt.model({
            name: 'New Prompt'
        });

        newPost.save(function(err) {
            // post has been saved 
            console.log("new prompt saved");
        });

        // Get game config and content buckets (categories)
        Icon.model.find({}, {}, function (err, icons) {

            locals.promptCode = promptCode;
            locals.icons = icons;

            next(err);
            
        });

    });

    // Render the view
    view.render('group/plan');

};
