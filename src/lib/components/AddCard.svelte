<script lang="ts">
    import type { CollectedCardData, SimplifiedCard } from "../types";
    import { collectedCardDB } from "../util/db";
    import { getImage } from "../util/image";
    import CardImage from "./CardImage.svelte";
    import CountController from "./CountController.svelte";

    interface Props {
        card: SimplifiedCard;
    }

    let { card }: Props = $props();
    let collectedData: CollectedCardData | null = $state(null);
    async function loadCollected() {
        collectedData =
            (await collectedCardDB.cards
                .filter((e) => e.card.cardNum === card.cardNum)
                .first()) ?? null;
    }

    const featureImageUrl = new URL(card.featureImage);
    featureImageUrl.searchParams.set("w", "200");

    async function add() {
        const result = await collectedCardDB.cards.add({
            card: $state.snapshot(card),
            count: 1,
            cardNum: card.cardNum,
        });
        collectedData = (await collectedCardDB.cards.get(result)) ?? null;
    }

    async function remove() {
        if (collectedData) {
            await collectedCardDB.cards.delete(collectedData.id);
            collectedData = null;
        }
    }
</script>

{#await loadCollected() then}
    <div class="container">
        <CardImage src={featureImageUrl.href}/>
        {#if collectedData}
            <CountController
                id={collectedData.id}
                count={collectedData.count}
                {remove}
            />
        {:else}
            <div class="add-container">
                <button class="add" onclick={add}> 추가 </button>
            </div>
        {/if}
    </div>
{/await}

<style>
    .add-container {
        height: 63px;
    }
    .add {
        width: 100%;
        background-color: rgb(0, 184, 0);
        color: white;
    }
    .add:hover {
        background-color: rgb(0, 145, 0);
    }
</style>
