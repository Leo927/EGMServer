const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../secret');
const fetch = require("node-fetch");
const { URL } = require("url");
const url = require('url');

const GITHUB_URL = "https://github.com/login/oauth/access_token";
const REDIRECT_URL = 'exp://172.16.1.66:19000/--'

function getUser(access_token){
   return fetch(
    'https://api.github.com/user',
    {
        method: "GET",
        headers: {Authorization: `token ${access_token}`}
    }).then(response=>{
        return response.json();
    });
}

async function handleCallback(req, res){
    try{
        // get code from request
        const {code, state} = req.query;
        const tokenUrl = new URL(GITHUB_URL);
        tokenUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
        tokenUrl.searchParams.append('client_secret', GITHUB_CLIENT_SECRET);
        tokenUrl.searchParams.append('code', code);

        const postResponse = await fetch(tokenUrl,{
            method: 'POST',
            headers: {Accept: 'application/json'}
        })
        const responseJson = await postResponse.json();
        const token = responseJson.access_token;

        const user = await getUser(token);
        if(!user){
            res.sendStatus(400);
        }

        const redirectWithParams = new URL(REDIRECT_URL+'/');
        if(user){
            redirectWithParams.searchParams.append('uname', user.login);
            redirectWithParams.searchParams.append('uid', user.id);
            redirectWithParams.searchParams.append('token', token);
        }
        console.log(`redirecting user to ${redirectWithParams.href}`);
        res.redirect(redirectWithParams.href);
    }catch(e){
        res.sendStatus(500);
        console.error("Error Posting to access_token. " + e);
    }
}

module.exports = {
    handleCallback,
    getUser,
}