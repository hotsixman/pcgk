<script lang="ts">
    import type { SimplifiedCardData } from "../types";
    import { cardDB } from "../util/db";
    import AddCard from "./AddCard.svelte";
    import AddLoadMore from "./AddLoadMore.svelte";
    import AddSearch from "./AddSearch.svelte";

    let keyword = $state("");
    let searchedCards: SimplifiedCardData[] = $state([]);
    let page = $state(1);
    let count = $state(0);
    let length = $state(0);

    async function loadSearchedCardsFunc() {
        searchedCards = await cardDB.cards
            .offset(50 * (page - 1))
            .limit(50)
            .toArray();
        count = searchedCards.length;
        length = await cardDB.cards.offset(50 * (page - 1)).count();
    }

    const loadSearchedCards = loadSearchedCardsFunc();
</script>

<AddSearch bind:keyword bind:searchedCards bind:count bind:length bind:page />
{#await loadSearchedCards then}
    <div class="card-container">
        {#each searchedCards as searchedCard}
            <AddCard card={searchedCard.card} />
        {/each}
    </div>
{/await}
<AddLoadMore {keyword} bind:searchedCards bind:count {length} bind:page />

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
