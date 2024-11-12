<script lang="ts">
    import type { CollectedCardData } from "../types";
    import { collectedCardDB } from "../util/db";
    import CollectionCard from "./CollectionCard.svelte";
    import CollectionSearch from "./CollectionSearch.svelte";

    let keyword = $state("");
    let collectedDatas: CollectedCardData[] = $state([]);
    let filteredCollectedDatas: CollectedCardData[] = $derived(
        collectedDatas.filter(filterCollectedCardDatas),
    );

    async function loadCollectedDatas() {
        collectedDatas = await collectedCardDB.cards.toArray();
    }

    function filterCollectedCardDatas(e: CollectedCardData, i: number) {
        if (!keyword) {
            return true;
        } else {
            const regex = new RegExp(
                "(.*?)" +
                    keyword.split(" ").map(escapeRegExp).join("(.*?)") +
                    "(.*?)",
            );
            return regex.test(e.card.name);
        }
    }

    function escapeRegExp(string: string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }
</script>

{#snippet collectionCard(collectedData: CollectedCardData)}
{@const remove = async () => {
    await collectedCardDB.cards.delete(collectedData.id);
    loadCollectedDatas();
}}
<CollectionCard {collectedData} {remove} />
{/snippet}

<CollectionSearch bind:keyword />
{#await loadCollectedDatas() then}
    <div class="card-container">
        {#each filteredCollectedDatas as collectedData}
            {#key collectedData}
                {@render collectionCard(collectedData)}
            {/key}
        {/each}
    </div>
{/await}

<style>
    .card-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 160px);
        justify-content: center;
        row-gap: 15px;
        column-gap: 20px;
    }
</style>