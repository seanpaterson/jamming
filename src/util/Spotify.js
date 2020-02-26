const clientID = '3238fb1f46c543eb8d4250de9530f241';
const redirectURI = 'http://seanjammming.surge.sh/';

let accessToken;

let Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expirationTime = Number(expiresInMatch[1]);
            window.setTimeout(() => (accessToken = ''), expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl;
        }
    },
    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    savePlaylist(playlistName, uris) {
        if(!playlistName || uris == [])
            return;
        const accessToken = Spotify.getAccessToken();
        let userID = '';
        let playlistID = '';
        const headers = {Authorization: `Bearer ${accessToken}`};
        fetch('https://api.spotify.com/v1/me', {
            headers: headers
        }).then(
            response => {
                if(response.ok)
                    return response.json()
        }).then(
            jsonResponse => {
                userID = jsonResponse.id;
                fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers:headers,
                    method: 'POST',
                    body: JSON.stringify({name: playlistName})
                }).then(response => {
                    if(response.ok)
                        return response.json();
                }).then(jsonResponse => {
                    playlistID = jsonResponse.id
                    fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                        headers:headers,
                        method: 'POST',
                        body: JSON.stringify({uris: uris})
                    });
                })
        })
    }
};

export default Spotify;