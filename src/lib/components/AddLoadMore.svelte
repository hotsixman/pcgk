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
        keyword,
        searchedCards = $bindable(),
        page = $bindable(),
        count = $bindable(),
        length,
    }: Props = $props();

    let loading: boolean = $state(false);

    async function loadMore() {
        if (!(length > 0 && count < length)) return;
        loading = true;
        page++;
        if (!keyword) {
            searchedCards.push(
                ...(await cardDB.cards
                    .offset(50 * (page - 1))
                    .limit(50)
                    .toArray()),
            );
            count = searchedCards.length;
        } else {
            const regexp = getSearchRegexp(keyword);
            searchedCards.push(
                ...(await cardDB.cards
                    .filter((e) => regexp.test(e.card.name))
                    .offset(50 * (page - 1))
                    .limit(50)
                    .toArray()),
            );
            count = searchedCards.length;
        }
    }
</script>

<div class="container">
    {#if length > 0 && count < length}
        <button onclick={loadMore}>
            더 불러오기
        </button>
    {/if}
</div>

<style>
    .container{
        display:flex;
        width: 100%;
        justify-content: center;
    }

    button{
        padding: 5px;
        border-radius: 5px;
        
        box-sizing: border-box;
        background-color: white;

        border: 1px solid black;

        cursor: pointer;
    }

    button:hover{
        background-color: rgb(228, 228, 228);
    }
</style>