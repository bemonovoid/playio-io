import axios from "axios";

const API_CLIENT = axios.create({
    baseURL: "http://localhost:9586/playio",
    headers: {
        "Content-type": "application/json"
    }
})

export default {
    getBaseUrl() {
        return API_CLIENT.defaults.baseURL
    },
    getArtists(withPagination) {
        let queryStr = "?";
        for (let key in withPagination) {
            if (queryStr !== "?") {
                queryStr += "&";
            }
            queryStr += key + "=" + encodeURIComponent(withPagination[key]);
        }
        return this.executeGet('/api/library/artists' + queryStr)
    },
    getArtistAlbums(artistId) {
        return this.executeGet('/api/library/artists/' + artistId + '/albums');
    },
    getAlbumSongs(albumId) {
        return this.executeGet('/api/library/albums/' + albumId + '/songs');
    },
    getSongAudioStreamUrl(songId) {
        return this.getBaseUrl() + '/api/library/songs/' + songId + '/stream';
    },
    updateSongFavoriteStatus(songId) {
        return this.executePut('/api/library/songs/favorite/' + songId);
    },
    executeGet(url) {
        return API_CLIENT.get(url);
    },
    executePut(url) {
        return API_CLIENT.put(url);
    }
}