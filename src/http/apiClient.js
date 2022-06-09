import axios from "axios";

const API_CLIENT = axios.create({
    // baseURL: "http://localhost:9586/playqd",
    baseURL: import.meta.env.VITE_VUE_APP_BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
})

export default {
    // URLS

    getBaseUrl() {
        return API_CLIENT.defaults.baseURL
    },

    buildAlbumArtworkUrl(albumId) {
        return this.getBaseUrl() + '/api/albums/' + albumId + '/artwork';
    },

    buildStreamingItemUrl(streamingItemId) {
        return this.getBaseUrl() + '/api/stream/' + streamingItemId;
    },

    // ARTIST API

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
        return this.executeGet('/api/artists' + queryStr)
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
    getAlbumTracks(albumId) {
        return this.executeGet('/api/albums/' + albumId + '/tracks');
    },
    getAlbumSongs(albumId) {
        return this.executeGet('/api/library/albums/' + albumId + '/songs');
    },
    updateSongFavoriteStatus(songId) {
        return this.executePut('/api/library/songs/favorite/' + songId);
    },

    // TRACK API

    getTrack(trackId) {
        return this.executeGet('/api/library/tracks/' + trackId);
    },

    // GENRES API

    getGenres() {
      return this.executeGet('/api/genres');
    },

    // SOURCES API

    getSources() {
        return this.executeGet('/api/sources');
    },
    getSource(sourceId) {
        return this.executeGet('/api/sources/' + sourceId);
    },
    getSourceWithContent(sourceId, pathInSource) {
        let url = '/api/sources/' + sourceId + '/content';
        if (pathInSource) {
            url += '?path=' + encodeURIComponent(pathInSource);
        }
        return this.executeGet(url);
    },
    getAudioTracksFromPathInSource(sourceId, pathInSource) {
        let url = '/api/sources/' + sourceId + '/content/tracks/?path=' + encodeURIComponent(pathInSource);
        return this.executeGet(url);
    },
    editSource(source) {
        if (source.id) {
            return this.executePatch('/api/sources', source);
        } else {
            return this.executePost('/api/sources', source);
        }
    },
    deleteSource(sourceId) {
        return this.executeDelete('/api/settings/sources/' + sourceId);
    },

    // CHANNEL API

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
    createChannel(channel) {
        return this.executePost('/api/channels', channel);
    },
    deletePlaybackHistory(channelId) {
        return this.executeDelete('/api/channels/history/' + channelId);
    },
    deleteChannel(channelId) {
        return this.executeDelete('/api/channels/' + channelId);
    },

    // CHANNEL STREAM INFO API

    getChannelNowPlayingTrack(channelId) {
        return this.executeGet('/api/channels/' + channelId + '/playing');
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