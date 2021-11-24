import { createWebHashHistory, createRouter } from "vue-router";

import ArtistsComponent from "./components/library/ArtistsComponent.vue";
import ArtistAlbumsComponent from "./components/library/ArtistAlbumsComponent.vue";
import AlbumsComponent from "./components/library/AlbumsComponent.vue";
import AlbumSongsComponent from "./components/library/AlbumSongsComponent.vue";

const routes = [
    {path: "/artists", name: "ArtistsComponent", component: ArtistsComponent},
    {path: "/artists/:artistId/albums", name: "ArtistAlbumsComponent", component: ArtistAlbumsComponent},
    {path: "/albums", name: "AlbumsComponent", component: AlbumsComponent},
    {path: "/albums/:albumId", name: "AlbumSongsComponent", component: AlbumSongsComponent}
];

const router = createRouter({history: createWebHashHistory(), routes});

export default router;
