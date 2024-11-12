<script lang="ts">
    interface Props {
        mode: "collection" | "add";
    }

    let { mode = $bindable() }: Props = $props();

    function changeMode() {
        if (mode === "add") {
            mode = "collection";
        } else {
            mode = "add";
        }
    }
</script>

<div class="container">
    <button
        onclick={() => {
            mode = "collection";
        }}
        class="collection"
        class:selected={mode === "collection"}
    >
        <span> 컬렉션 </span>
    </button>
    <button
        onclick={() => {
            mode = "add";
        }}
        class="add"
        class:selected={mode === "add"}
    >
        <span> 추가 </span>
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

    button:hover {
        background-color: white;
    }

    button:not(.selected) {
        opacity: 0.3;
    }

    button:not(.selected):hover {
        opacity: 1;
    }
</style>
