<script lang="ts">
    import type { Writable } from "svelte/store";
    import type { CollectedCardData } from "../types";
    import { cardDB, collectedCardDB } from "../util/db";

    interface Props{
        forceReload: Writable<null | (() => Promise<void>)>
    }

    let {forceReload}: Props = $props();

    type ExportedData = { cardNum: string; count: number }[];

    async function exportCollectedData() {
        alert("곧 다운로드됩니다.");
        const allCollectedData = await collectedCardDB.cards.toArray();
        const minified: ExportedData = allCollectedData.map((e) => {
            return {
                cardNum: e.cardNum,
                count: e.count,
            };
        });
        const stringified = JSON.stringify(minified);
        const blob = new Blob([stringified], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "pokemon.json";
        a.click();
        a.remove();
    }

    async function importCollectedData() {
        if (!confirm("데이터가 덮어씌워집니다. 진행하시겠습니까?")) return;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.addEventListener("change", () => {loadExported(input)});
        input.click();
    }

    async function loadExported(input: HTMLInputElement) {
        const file = input.files?.[0];
        if (!file) return;
        try {
            const parsed: ExportedData = JSON.parse(await file.text());
            const collectedDatas: Omit<CollectedCardData, 'id'>[] = [];
            for(const item of parsed){
                const sim = await cardDB.cards.get({cardNum: item.cardNum});
                if(!sim) continue;
                collectedDatas.push({
                    cardNum: item.cardNum,
                    count: item.count,
                    card: sim.card
                })
            }
            await collectedCardDB.cards.clear();
            await collectedCardDB.cards.bulkAdd(collectedDatas);
            await $forceReload?.();
            alert("불러오기 성공");
        } catch {
            alert("불러오기 실패");
        }
    }
</script>

<div class="container">
    <button onclick={exportCollectedData}>
        <span> 내보내기 </span>
    </button>
    <button onclick={importCollectedData}>
        <span> 불러오기 </span>
    </button>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 5px;

        width: 100%;
        justify-content: center;

        margin-block: 5px;
    }

    button {
        width: 150px;
        max-width: calc((100% - 5px) / 2);
    }
</style>
