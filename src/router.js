import { createWebHashHistory, createRouter } from "vue-router";

import ArtistAlbumsComponent from "./components/library/ArtistAlbumsComponent.vue";
// import AlbumsComponent from "./components/library/AlbumsComponent.vue";
// import AlbumSongsComponent from "./components/library/AlbumSongsComponent.vue";
import SourcesView from "./components/source/SourcesView.vue";
import SourcesList from "./components/source/SourcesList.vue";
import SourceContent from "./components/source/SourceContent.vue";
import SourceEditView from "./components/source/SourceEditView.vue";

import ChannelsView from "./components/channels/ChannelsView.vue";
import ChannelView from "./components/channels/ChannelView.vue";
import EditChannelView from "./components/channels/EditChannelView.vue";

import ArtistsView from "./components/library/ArtistsComponent.vue";
import AlbumView from "./components/album/AlbumView.vue";
import GenresView from "./components/genre/GenresView.vue";

import EditTrack from "./components/track/EditTrack.vue";

import Playlists from "./components/playlist/Playlists.vue";
import CreatePlaylist from "./components/playlist/CreatePlaylist.vue";

import Library from "./components/mobile/library/Library.vue";
import Artists from "./components/mobile/library/Artists.vue";
import Albums from "./components/mobile/library/Albums.vue";
import Tracks from "./components/mobile/library/Tracks.vue";
import Settings from "./components/mobile/settings/Settings.vue";
import Sources from "./components/mobile/settings/Sources.vue";
import Folders from "./components/mobile/library/Folders.vue";
import FolderContent from "./components/mobile/library/FolderContent.vue";

const routes = [

    {
      name: "library",
      path: "/library",
      component: Library
    },
    {
        name: "artists",
        path: "/artists",
        component: Artists
    },
    {
        name: "artistAlbums",
        path: "/artists/:artistId/albums",
        component: Albums
    },
    {
        name: "albumTracks",
        path: "/album/:albumId",
        component: Tracks
    },
    {
        name: "settings",
        path: "/settings",
        component: Settings
    },
    {
        name: "sources",
        path: "/sources",
        component: Sources
    },
    {
        name: "folders",
        path: "/folders",
        component: Folders
    },
    {
        name: "folderContent",
        path: "/folders/:sourceId",
        component: FolderContent
    },

    // {
    //     path: "/sources",
    //     name: "sourcesDes",
    //     component: SourcesView,
    //     children: [
    //         {
    //             path: "/sources/new",
    //             name: "sourceNew",
    //             component: SourceEditView,
    //         },
    //         {
    //             path: "/sources/:sourceId",
    //             name: "sourceEdit",
    //             component: SourceEditView,
    //             props: true
    //         },
    //         {
    //             path: "/sources/:sourceId/content",
    //             name: "sourceContent",
    //             component: SourceContent
    //         }
    //     ]
    // },
    {
        path: "/channels",
        name: "channels",
        component: ChannelsView
    },
    {
        path: "/channels/new",
        name: "newChannel",
        component: EditChannelView
    },
    {
        path: "/channels/:channelId",
        name: "channel",
        component: ChannelView,
        props: true
    },
    // {
    //     path: "/artists",
    //     name: "artists",
    //     component: ArtistsView,
    //     meta: {title: 'Artists'}
    // },
    // {path: "/artists/:artistId/albums", name: "ArtistAlbumsComponent", component: ArtistAlbumsComponent, meta: {title: 'Artist albums'}},
    {path: "/tracks/:trackId", name: "editTrack", component: EditTrack},
    {
        path: "/albums/:albumId",
        name: "album",
        component: AlbumView,
        props: true,
        meta: {title: 'Album songs'}
    },
    {
        path: "/genres",
        name: "genres",
        component: GenresView,
        meta: {title: 'Genres'}
    }
    // {
    //     path: "/playlists",
    //     name: "playlists",
    //     component: Playlists,
    //     children: [
    //         {
    //             path: "/playlists",
    //             name: "sources",
    //             component: SourcesList
    //         },
    //         {
    //             path: "/playlists/new",
    //             name: "sourceNew",
    //             component: SourceEditView,
    //         }
    //         // {
    //         //     path: "/playlists/:playlistId",
    //         //     name: "sourceNew",
    //         //     component: SourceEditView,
    //         // }
    //     ]
    //
    // }
];

const router = createRouter({history: createWebHashHistory(), routes});

export default router;
