const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../secret');
const fetch = require("node-fetch");
const { URL } = require("url");
const url = require('url');

const GITHUB_URL = "https://github.com/login/oauth/access_token";
const REDIRECT_URL = 'exp://172.16.1.66:19000/--'

async function getUser(access_token){
   const response = await fetch(
    'https://api.github.com/user',
    {
        method: "GET",
        headers: {Authorization: `token ${access_token}`}
    });
    
    if(!response.ok){
      throw `Failed to get user with ${access_token}`
    }
    
    const resJson = response.json();
    return resJson;
}

/**
 * Exchange a one time code with an access token
 * @param {String} code one time code provided by service provider
 * @returns 
 */
async function exchangeAccessToken(req, res){
  try{
    const {code} = req.params;
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
    res.send({token});
  }catch(e){
    console.error(`Failed to exchange token. `, e);
  }
}

/**
 * Handles get user call from client.
 * Expect a token in the body
 */
async function handleGetUser(req, res){
  try{
    const {token} = req.body;
    const user = await getUser(token);
    if(!user.login || !user.id)
      res.sendStatus(303);
    const userData = {uid:user.id, uname: user.login, token:token};
    res.send(userData);
  }catch(e){
    console.error("failed to get user for client", e);
    res.sendStatus(500);
  }
}

module.exports = {
  getUser,
  exchangeAccessToken,
  handleGetUser,
}