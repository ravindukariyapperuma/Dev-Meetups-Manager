module.exports = {
    getOAuthCode: async (req, res, next) => {
        try {
          console.log("OAuth Code")
        } catch (error) {
          res.send(error);
        }
      },
}