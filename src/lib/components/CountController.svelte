<script lang="ts">
    import { collectedCardDB } from "../util/db";

    interface Props {
        count: number;
        id: number;
        remove: () => Promise<void>;
    }

    let { count, id, remove}: Props = $props();

    async function increase() {
        await collectedCardDB.cards.update(id, (obj) => {
            obj.count++;
        });
        count++;
    }

    async function decrease() {
        if (count <= 0) {
            return;
        }
        await collectedCardDB.cards.update(id, (obj) => {
            obj.count--;
        });
        count--;
    }
</script>

<div class="container">
    <div class="count-container">
        <button onclick={decrease} class="decrease">-</button>
        <div class="count">
            {count}
        </div>
        <button onclick={increase} class="increase">+</button>
    </div>
    <button onclick={remove} class="remove"> 삭제 </button>
</div>

<style>
    .container {
        width: 100%;
        height: 63px;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 3px;
    }
    .count-container {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
    }

    .increase,
    .decrease {
        width: 30px;
        height: 30px;
        border-radius: 50vh;
        font-size: 16px;
        font-weight: bold;
    }

    .increase {
        background-color: rgb(188, 255, 188);
    }
    .increase:hover {
        background-color: rgb(163, 220, 163);
    }

    .decrease {
        background-color: #ffc7c7;
    }
    .decrease:hover {
        background-color: #d9abab;
    }

    .remove {
        width: 100%;
        background-color: rgb(184, 0, 0);
        color: white;
    }

    .remove:hover {
        background-color: rgb(145, 0, 0);
    }
</style>
