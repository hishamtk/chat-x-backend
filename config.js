module.exports = {
    bcrypt: {
        saltingRounds: 10
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiry: "1d",
        issuer: "chat-x"
    }
}