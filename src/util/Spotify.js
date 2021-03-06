const clientID= "CLIENT_ID";
const redirectURI= "REDIRECT_URI";

let accessToken;


const Spotify= {

    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
            
        const accessTokenMatch= window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch= window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch&&expiresInMatch){
            accessToken= accessTokenMatch[1];
            const expiresIn= Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;

        }else{
            const accessUrl= `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location= accessUrl;
        }
        
    },

    search(term){
        const accessToken= Spotify.getAccessToken();
        console.log('accessToken: ' + accessToken)
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
        .then(response=>{
            return response.json() 
        })
        .then(jsonData=>{
            const tracks= jsonData;
            console.log(tracks)
            if(!jsonData.tracks){
                return [];
            }
            return jsonData.tracks.items.map(track=> ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlaylist(name, trackUris){
        if(!name || !trackUris.length){
            return;
        }

        const accessToken= Spotify.getAccessToken();
        const headers= { Authorization: `Bearer ${accessToken}` };
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
        .then(response=> response.json())
        .then((jsonResponse)=> {
            userID= jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ name: name })
            })
            .then(response=> response.json())
            .then((jsonResponse)=>{
                const playlistID= jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ uris: trackUris })
                })
            })
        })
    }
}

    

export default Spotify;