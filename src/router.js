import { createWebHashHistory, createRouter } from "vue-router";

import ArtistsComponent from "./components/library/ArtistsComponent.vue";
import ArtistAlbumsComponent from "./components/library/ArtistAlbumsComponent.vue";
import AlbumSongsComponent from "./components/library/AlbumSongsComponent.vue";

const routes = [
    {path: "/artists", name: "ArtistsComponent", component: ArtistsComponent},
    {path: "/artists/:artistId", name: "ArtistAlbumsComponent", component: ArtistAlbumsComponent},
    {path: "/albums/:albumId", name: "AlbumSongsComponent", component: AlbumSongsComponent}
];

const router = createRouter({history: createWebHashHistory(), routes});

export default router;
