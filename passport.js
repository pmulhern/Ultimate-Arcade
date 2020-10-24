const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User.js');
const JwtStrategy = require('passport-jwt').Strategy;

// cookieExtractor is a custom function to extract the JWT from application->cookies on browser
const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

// Used for Authorization (Protecting resources)
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    // connected to routes -> User.js lines 12 and 15 **Must Match**
    secretOrKey : "NoobCoder"
},(payload,done)=>{
    User.findById({_id : payload.sub},(err,user)=>{
        if(err)
            return done(err, false);
        if(user)
            return done(null,user);
        else    
            return done(null,false);
    });
}));

// authentication local strategy using username and password (Only used when logging in)
passport.use(new LocalStrategy((username,password,done)=>{
    User.findOne({username}, (err,user)=>{
        // 1) Something wrong with database
        if(err)
            return done(err);
        // 2) no user exists
        if(!user)
            return done(null,false);
        // 3) will check if password is correct using function from User.js line 35
        user.comparePassword(password,done);
    });
}));