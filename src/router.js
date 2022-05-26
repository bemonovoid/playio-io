import { createWebHashHistory, createRouter } from "vue-router";

import ArtistAlbumsComponent from "./components/library/ArtistAlbumsComponent.vue";
import AlbumsComponent from "./components/library/AlbumsComponent.vue";
import AlbumSongsComponent from "./components/library/AlbumSongsComponent.vue";
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

import FoldersView from "./components/folder/FoldersView.vue";
import FoldersSourceList from "./components/folder/FoldersSourceList.vue";
import FoldersContentList from "./components/folder/FoldersContentList.vue";

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
            },
            {
                path: "/sources/:sourceId/content",
                name: "sourceContent",
                component: SourceContent
            }
        ]
    },
    {
        path: "/channels",
        name: "channels",
        component: ChannelsView,
        children: [
            {
                path: "/channels",
                name: "channels",
                component: ChannelsView
            }
        ]
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
    {
        path: '/folders',
        name: "folders",
        component: FoldersView,
        children: [
            {
                path: "/folders/source",
                name: "foldersSource",
                component: FoldersSourceList
            },
            {
                path: "/folders/:sourceId",
                name: "folderContentList",
                component: FoldersContentList,
                props: route => ({dir: route.query.dir})
            }
        ]
    },
    {
        path: "/artists",
        name: "artists",
        component: ArtistsView,
        meta: {title: 'Artists'}
    },
    {path: "/artists/:artistId/albums", name: "ArtistAlbumsComponent", component: ArtistAlbumsComponent, meta: {title: 'Artist albums'}},
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
];

const router = createRouter({history: createWebHashHistory(), routes});

export default router;
