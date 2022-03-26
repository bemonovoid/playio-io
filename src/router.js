import { createWebHashHistory, createRouter } from "vue-router";

import ArtistsComponent from "./components/library/ArtistsComponent.vue";
import ArtistAlbumsComponent from "./components/library/ArtistAlbumsComponent.vue";
import AlbumsComponent from "./components/library/AlbumsComponent.vue";
import AlbumSongsComponent from "./components/library/AlbumSongsComponent.vue";

import SourceView from "./components/source/SourceView.vue";
import SourceListView from "./components/source/SourceListView.vue";
import SourceEditView from "./components/source/SourceEditView.vue";
import ChannelsView from "./components/channels/ChannelsView.vue";
import NewChannelView from "./components/channels/NewChannelView.vue";
import ChannelList from "./components/channels/ChannelList.vue";

import DesktopAppComponent from "./components/desktop/DesktopAppComponent.vue";

const routes = [

    // {path: "/", name: "home", component: TextView},
    {path: "/sources", name: "sources", component: SourceView,
        children: [
            {
                path: "/sources",
                name: "sourceList",
                component: SourceListView
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
    {path: "/channels", name: "channels", component: ChannelsView,
        children: [
            {
                path: "/channels/new",
                name: "newChannel",
                component: NewChannelView
            }
        ]
    }
    // {path: "/artists", name: "ArtistsComponent", component: ArtistsComponent,  meta: {title: 'Artists'}},
    // {path: "/artists/:artistId/albums", name: "ArtistAlbumsComponent", component: ArtistAlbumsComponent, meta: {title: 'Artist albums'}},
    // {path: "/albums", name: "AlbumsComponent", component: AlbumsComponent, meta: {title: 'Albums'}},
    // {path: "/albums/:albumId", name: "AlbumSongsComponent", component: AlbumSongsComponent, meta: {title: 'Album songs'}},


];

const router = createRouter({history: createWebHashHistory(), routes});

export default router;
