import { createWebHashHistory, createRouter } from "vue-router";

import ArtistAlbumsComponent from "./components/library/ArtistAlbumsComponent.vue";
import AlbumsComponent from "./components/library/AlbumsComponent.vue";
import AlbumSongsComponent from "./components/library/AlbumSongsComponent.vue";
import SourcesView from "./components/source/SourcesView.vue";

import SourcesList from "./components/source/SourcesList.vue";
import SourceEditView from "./components/source/SourceEditView.vue";

import ChannelsView from "./components/channels/ChannelsView.vue";
import ChannelView from "./components/channels/ChannelView.vue";
import ChannelsList from "./components/channels/ChannelsList.vue";
import NewChannelView from "./components/channels/NewChannelView.vue";

import ArtistsView from "./components/library/ArtistsComponent.vue";

import DesktopAppComponent from "./components/desktop/PlayqdApplicationComponent.vue";

const routes = [

    {
        path: "/sources",
        name: "sources",
        component: SourcesView,
        children: [
            {
                path: "/sources",
                name: "sourcesList",
                component: SourcesList
            },
            {
                path: "/sources/new",
                name: "sourceNew",
                component: SourceEditView,
            },
            {
                path: "/sources/:sourceId",
                name: "sourceEdit",
                component: SourceEditView,
                props: true
            }
        ]
    },
    {
        path: "/channels",
        name: "channels",
        component: ChannelsView,
        children: [
            {
                path: "/channels/:filter",
                name: "channelsList",
                component: ChannelsList
            },
            {
                path: "/channels/:channelId",
                name: "channel",
                component: ChannelView,
                props: true
            },
            {
                path: "/channels/new",
                name: "newChannel",
                component: NewChannelView
            }
        ]
    },
    {
        path: "/artists",
        name: "artists",
        component: ArtistsView,
        meta: {title: 'Artists'}
    }
    // {path: "/artists/:artistId/albums", name: "ArtistAlbumsComponent", component: ArtistAlbumsComponent, meta: {title: 'Artist albums'}},
    // {path: "/albums", name: "AlbumsComponent", component: AlbumsComponent, meta: {title: 'Albums'}},
    // {path: "/albums/:albumId", name: "AlbumSongsComponent", component: AlbumSongsComponent, meta: {title: 'Album songs'}},


];

const router = createRouter({history: createWebHashHistory(), routes});

export default router;
