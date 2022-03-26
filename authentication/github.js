const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../secret');
const fetch = require("node-fetch");
const { URL } = require("url");
const url = require('url');

const GITHUB_URL = "https://github.com/login/oauth/access_token";
const REDIRECT_URL = 'exp://172.16.1.66:19000/--'

async function handleCallback(req, res){
    // get code from request
    const {code, state} = req.query;
    const tokenUrl = new URL(GITHUB_URL);
    tokenUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
    tokenUrl.searchParams.append('client_secret', GITHUB_CLIENT_SECRET);
    tokenUrl.searchParams.append('code', code);

    fetch(tokenUrl ,{
      method: 'POST',
      headers: {Accept: 'application/json'}
    }).then(response=>{
        return response.json();
        // const {access_token, state, client_id, } = url.searchParams
    }).then(resToken=>{
        return fetch(
            'https://api.github.com/user',
            {
                method: "GET",
                headers: {Authorization: `token ${resToken.access_token}`}
            }
        )
    }).then(userPromise=> userPromise.json())
    .then(user=>{
        const redirectWithParams = new URL(REDIRECT_URL+'/');
        redirectWithParams.searchParams.append('uname', user.login);
        redirectWithParams.searchParams.append('uid', user.id);
        redirectWithParams.searchParams.append('token', resToken.access_token);
        console.log(redirectWithParams.href);
        res.redirect(redirectWithParams.href);
    }).catch(res=>console.log("Error Posting to access_token"))
  }

module.exports = {
    handleCallback,
}