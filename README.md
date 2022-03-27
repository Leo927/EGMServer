# Easy Game Map Server

# Authentication
## Limitation
Only support Github Oauth2. 

## Usage
See Github Oauth2 Doc. [https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)


Use redirect url <SERVER_URL>/oauth2/callback 
The server will redirect back to user app. Results are loaded in redirect url as search parameters. 
The returned parameters are: uid, uname, token. 
Typical return url looks like: exp://172.16.1.66:19000/--/?uid:<uid>&uname:<uname>&token:<token>
Client can retrieve these parameters via nodejs URL module.

# Map
## Insert
Use http request to insert a new map.
### Request
method: POST
endpoint: <SERVER_URL>/maps
body: {
    token: userToken received via authentication
    mapData: map data object. Must contain name. 
}
### Response:
* success: 
    code: 200
    body: {mapId:<mapId pointing to the map>}
* fail:
    code: 400

## Patch
Use http request to update a map. Only entries provided will override existing entry. 
### Request
method: PATCH
endpoint: <SERVER_URL>/maps/
body: {
    token: userToken received via authentication
    mapData: map data object. Can be incomplete map data.
}

### Response
* success:
code: 200
body: {mapId:<mapId pointing to the map>}
* fail:
code: 400

## Get User Maps
Find all the maps owned by a user. 

### Request
Method: GET
Endpoint: <SERVER_URL>/maps/owner/<user id>
Example: GET <SERVER_URL>/maps/owner/aa54sd55456q. Where aa54sd55456q is the user id. 

### Response
* success:
code: 200
body: json array consisting of all the mapData belonging to the user.
* fail:
code: 400

## Get Map by map id
### Request
Method: GET
Endpoint: <SERVER_ID>/maps/owner/<mapId>
Example: curl GET localhost:3001/maps/65121asdasd45

### Responses
* Map not found:
code: 404
* Internal Server Error:
Errors internal to the server.
code: 500
* Found
code: 200
body: requested map

## Get All Maps
### Request
Method: GET
EndPoint: <SERVER_ID>/maps
Example: curl GET localhost:3001/maps

### Response:
* Internal Server Error:
code: 500
* Success:
code: 200
body: all maps


