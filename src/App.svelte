<script lang="ts">
    import "./lib/global.css";

    import Add from "./lib/components/Add.svelte";
    import Collection from "./lib/components/Collection.svelte";
    import ModeSelector from "./lib/components/ModeSelector.svelte";
    import Export from "./lib/components/Export.svelte";
    import { writable } from "svelte/store";

    let mode: "collection" | "add" = $state("collection");
    const forceReload = writable<null | (() => Promise<void>)>(null);
</script>

<svelte:head>
    <title>
        포켓몬 카드 관리
    </title>
</svelte:head>

<Export {forceReload}/>
<ModeSelector bind:mode />
{#if mode === "collection"}
    <Collection {forceReload}/>
{:else}
    <Add />
{/if}
