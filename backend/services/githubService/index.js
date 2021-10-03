const request = require("request");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

module.exports = {
    RequestUserAuthorization: async (req, res, next) => {
        try {
            res.redirect(
                `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo`
            );
        } catch (e) {
            console.log("error")
            res.send(e);
        }
    },
    getAccessToken: async (req , res)=>{
        try{
            console.log(req.query)
           const header={
                headers:{
                'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            const url = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.query.code}`;

            request
                .post(url,
                    header,
                    (error, response, body) => {
                        console.log("Body: ",JSON.parse(body))
                        console.log()
                        localStorage.setItem("githubAccessToken", JSON.parse(body).access_token);
                            if (body) {
                                res.redirect("http://localhost:3000/GitHubApp");
                            } else {
                                res.send("Empty access token");
                            }
                })
        }catch (e) {
            res.send(e);
        }
    },
    getUserData: async (req, res)=>{
        try{
            const githubAccessToken = localStorage.getItem("githubAccessToken");
            const url = `https://api.github.com/user`;
            const header={
                headers:{
                    'Authorization': `Bearer ${githubAccessToken}`,
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'user-agent': 'node.js'
                }
            }
          await request.get(url,
              header,
              (error, response, body) => {

                  const newBody = JSON.parse(body);

                  const allRepoUrl = `https://api.github.com/user/repos`

                  if (body){
                      request.get(allRepoUrl,header,(error,response,body)=>{
                          const allRepo = JSON.parse(body)

                          if (body)
                              return  res.send({
                                  statusCode:200,
                                  allRepo,
                                  newBody,
                                  message:"Getting User Details Successful !"
                              });
                          else
                              return  res.send({
                                  statusCode:400,
                                  message:"Cannot Find User Details !"
                              })



                      })
                  }


                })

        }catch (e) {
            res.send("Error: ",e)
        }
    },

    createRepo: async (req,res)=>{
        const githubAccessToken = localStorage.getItem("githubAccessToken");
        const createRepoUrl = 'https://api.github.com/user/repos'

        const header={
            headers:{
                'Authorization': `Bearer ${githubAccessToken}`,
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'user-agent': 'node.js'
            }
        }
        console.log(githubAccessToken)
        console.log(JSON.stringify(req.body))
        await request.post({
            headers:{
                'Authorization': `Bearer ${githubAccessToken}`,
                'Content-type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
                'user-agent': 'node.js'
            },
            url :createRepoUrl,
            body:JSON.stringify(req.body),
        },(error, response, body) => {
                console.log("body: ",JSON.parse(body).errors)
            if (JSON.parse(body).errors)
                res.send({statusCode:400})
            else
                res.send({statusCode:200})

            }






                    )




    }
}

