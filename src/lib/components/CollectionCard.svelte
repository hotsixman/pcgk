<script lang="ts">
    import type { CollectedCardData } from "../types";
    import CardImage from "./CardImage.svelte";
    import CountController from "./CountController.svelte";

    interface Props {
        collectedData: CollectedCardData;
        remove: () => Promise<void>
    }

    let { collectedData, remove }: Props = $props();

    const featureImageUrl = new URL(collectedData.card.featureImage);
    featureImageUrl.searchParams.set("w", "200");
</script>

<div class="container">
    <CardImage src={featureImageUrl.href}/>
    <CountController id={collectedData.id} count={collectedData.count} {remove}/>
</div>