<script lang="ts">
    import type { SimplifiedCardData } from "../types";
    import { cardDB } from "../util/db";
    import { getSearchRegexp } from "../util/regexp";

    interface Props {
        keyword: string;
        searchedCards: SimplifiedCardData[];
        page: number;
        count: number;
        length: number;
    }

    let {
        keyword = $bindable(),
        searchedCards = $bindable(),
        page = $bindable(),
        count = $bindable(),
        length = $bindable(),
    }: Props = $props();

    async function search() {
        page = 1;
        count = 0;
        length = 0;
        searchedCards = [];
        if (!keyword) {
            searchedCards = await cardDB.cards
                .offset(50 * (page - 1))
                .limit(50)
                .toArray();
            count = searchedCards.length;
            length = await cardDB.cards.offset(50 * (page - 1)).count();
        } else {
            const regexp = getSearchRegexp(keyword);
            searchedCards = await cardDB.cards
                .filter((e) => regexp.test(e.card.name))
                .offset(50 * (page - 1))
                .limit(50)
                .toArray();
            count = searchedCards.length;
            length = await cardDB.cards
                .filter((e) => regexp.test(e.card.name))
                .offset(50 * (page - 1))
                .count();
        }
    }
</script>

<div class="container">
    <input bind:value={keyword} enterkeyhint="search" placeholder="검색" onkeypress={(event) => {
        if(event.key === "Enter"){
            search();
        }
    }}/>
    <button onclick={search}> 검색 </button>
</div>

<style>
    .container{
        width: 100%;
        display:flex;
        flex-direction: row;
        column-gap: 5px;

        justify-content: center;

        margin-block: 10px;
    }

    input{
        width: auto;
        flex: 1 1 auto;
    }
</style>