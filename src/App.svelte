<script lang="ts">
    import "./lib/global.css";

    import Add from "./lib/components/Add.svelte";
    import Collection from "./lib/components/Collection.svelte";
    import ModeSelector from "./lib/components/ModeSelector.svelte";

    let mode: "collection" | "add" = $state("collection");
</script>

<ModeSelector bind:mode />
{#if mode === "collection"}
    <Collection />
{:else}
    <Add />
{/if}
