# Easy Game Map Server
## Table of Content
[Set Up](#set-up)

[Authentication](#authentication)

[Standard Map Format](#standard-map-data-format)

[Insert Map](#insert)

[Get All Maps of A User](#get-user-maps)

[Get Map by id](#get-map-by-map-id)

[Get All Maps](#get-all-maps)

## Set Up
1. Install NodeJs
1. Clone this respository with ```git clone https://github.com/Leo927/EGMServer.git```
1. ```cd EGMServer```
1. Install all packages ```npm install .```
1. Create file called secret.js ```touch secret.js```
1. Register on MongoDB Atlas. Create a table and get <username> and <password>
1. From Github Developer, get <client id> and <client secret>
1. In the Github Dev project, set the callback url to ```<SERVER_URL>/oauth2/callback ```. 
1. Replace the content of secret.js with 
```javascript
const GITHUB_CLIENT_ID = "<client_id>";
const GITHUB_CLIENT_SECRET = "<client_secret>";
const ATLAS_MONGODB_ACCOUNT = "<username>";
const ATLAS_MONGODB_PASSWORD = "<password>";
module.exports = {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    ATLAS_MONGODB_ACCOUNT,
    ATLAS_MONGODB_PASSWORD,
}```
1. Run with ```node .```

## Authentication

#### Limitation
Only support Github Oauth2. 

#### Usage
See Github Oauth2 Doc. [https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)


Use redirect url <SERVER_URL>/oauth2/callback 

The server will redirect back to user app. Results are loaded in redirect url as search parameters. 

The returned parameters are: uid, uname, token. 

Typical return url looks like: exp://172.16.1.66:19000/--/?uid:<uid>&uname:<uname>&token:<token>
    
Client can retrieve these parameters via nodejs URL module.

## Map
    
### Standard Map Data Format
    
```javascript
{
    _id: unique map id assigned by database,
    name: name of the map. Cannot be empty. 
    image: picture asset of the map. stored as a string
    uid: uid of the user owning the map. Cannot be empty. 
    width: Number representing the width of the map. Can be empty. Must be a number.
    height: Number representing the height of the map. Can be empty. Must be a number.
    markerGroups: set[str] representing the names of each markerGroups. each name must be unique. Can be empty. 
    customIcons: dictionary[str, picture asset] representing a custom icon. 
    markers: list of markers. format: list[marker]. May be empty or undefined. 
        format of marker: 
            id: uid of the marker,
            title: String. Title of marker. Shown in the popup modal as title.
            description: String. Detailed description of the marker.
            label: String shown underneath the icon.
            isCustomIcon: Bool. If true, the icon used will be from the customIcons. Other wise, the icon id points to a default icon. 
            iconId: String representing the id of the icon. See isCustomIcon for more detail of where it comes from. 
            left: number representing the distance of the center of icon from the left edge of the map. 
            top: number representing the distance of the center of the icon from the top of the map. 
            markerGroup: A list of strings pointing to several markerGroups from the map. 
}
```
        


### Insert
    
Use http request to insert a new map.
    
#### Request
* method: POST    
* endpoint: <SERVER_URL>/maps  
* body: {
    token: userToken received via authentication
    mapData: map data object. Must contain name. 
}
#### Response:
* success: 
    code: 200
    body: {mapId:<mapId pointing to the map>}
* fail:
    code: 400

### Patch
Use http request to update a map. Only entries provided will override existing entry. 
#### Request
    
* method: PATCH
    
* endpoint: <SERVER_URL>/maps/
    
* body: {
    token: userToken received via authentication
    mapData: map data object. Can be incomplete map data.
}

#### Response
* success:
    
code: 200
    
body: {mapId:<mapId pointing to the map>}
    
* fail:
    
code: 400

### Get User Maps
    
Find all the maps owned by a user. 

#### Request
* Method: GET
* Endpoint: <SERVER_URL>/maps/owner/<user id>
* Example: GET <SERVER_URL>/maps/owner/aa54sd55456q. Where aa54sd55456q is the user id. 

#### Response
* success:
    
code: 200
    
body: json array consisting of all the mapData belonging to the user.
    
* fail:
    
code: 400

### Get Map by map id
#### Request
* Method: GET
* Endpoint: <SERVER_ID>/maps/owner/<mapId>
* Example: curl GET localhost:3001/maps/65121asdasd45

#### Responses
* Map not found:
    
code: 404
    
* Internal Server Error:
    
Errors internal to the server.
    
code: 500
    
* Found
    
code: 200
    
body: requested map

### Get All Maps
#### Request
* Method: GET    
* EndPoint: <SERVER_ID>/maps
* Example: curl GET localhost:3001/maps

#### Response:
* Internal Server Error:
    
code: 500
    
* Success:
    
code: 200
    
body: all maps


