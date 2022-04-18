import axios from "axios";

const API_CLIENT = axios.create({
    // baseURL: "http://localhost:9586/playsqd",
    baseURL: import.meta.env.VITE_VUE_APP_BASE_URL,
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
            if (withPagination[key] === null) {
                continue;
            }
            if (queryStr !== "?") {
                queryStr += "&";
            }
            queryStr += key + "=" + encodeURIComponent(withPagination[key]);
        }
        return this.executeGet('/api/library/artists' + queryStr)
    },
    getAlbums(withPagination) {
        let queryStr = "?";
        for (let key in withPagination) {
            if (withPagination[key] === null) {
                continue;
            }
            if (queryStr !== "?") {
                queryStr += "&";
            }
            queryStr += key + "=" + encodeURIComponent(withPagination[key]);
        }
        return this.executeGet('/api/library/albums' + queryStr)
    },
    getArtistAlbums(artistId) {
        return this.executeGet('/api/library/artists/' + artistId + '/albums');
    },
    getAlbumSongs(albumId) {
        return this.executeGet('/api/library/albums/' + albumId + '/songs');
    },
    getAlbumArtworkUrl(albumId) {
        return this.getBaseUrl() + '/api/library/albums/' + albumId + '/artwork';
    },
    getStreamingItemUrl(streamingItemId) {
        return this.getBaseUrl() + '/api/stream/' + streamingItemId;
    },
    updateSongFavoriteStatus(songId) {
        return this.executePut('/api/library/songs/favorite/' + songId);
    },

    // SOURCES API

    getSources() {
        return this.executeGet('/api/settings/sources');
    },
    getSource(sourceId) {
        return this.executeGet('/api/settings/sources/' + sourceId);
    },
    editSource(source) {
        if (source.id) {
            return this.executePatch('/api/settings/sources', source);
        } else {
            return this.executePost('/api/settings/sources', source);
        }
    },
    deleteSource(sourceId) {
        return this.executeDelete('/api/settings/sources/' + sourceId);
    },

    // CHANNELS API

    getChannels() {
        return this.executeGet('/api/channels');
    },
    getChannel(channelId) {
        return this.executeGet('/api/channels/' + channelId);
    },
    getChannelWithPlaybackHistoryItems(channelId) {
        return this.executeGet('/api/channels/' + channelId + '/extended');
    },
    getPlaybackHistory(channelId) {
        return this.executeGet('/api/channels/' + channelId + '/history');
    },
    deletePlaybackHistory(channelId) {
        return this.executeDelete('/api/channels/history/' + channelId);
    },
    deleteChannel(channelId) {
        return this.executeDelete('/api/channels/' + channelId);
    },

    // CHANNEL STREAM INFO API

    getChannelStreamInfo(channelId) {
        return this.executeGet('/api/channels/' + channelId + '/stream/info');
    },

    // CRUD API
    executeGet(url) {
        return API_CLIENT.get(url);
    },
    executePut(url) {
        return API_CLIENT.put(url);
    },
    executePatch(url, data) {
        return API_CLIENT.patch(url, data);
    },
    executePost(url, data) {
        return API_CLIENT.post(url, data);
    },
    executeDelete(url) {
        return API_CLIENT.delete(url);
    }
}