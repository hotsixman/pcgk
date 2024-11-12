<script lang="ts">
    import { getImage } from "../util/image";
    import { onMount } from "svelte";

    let { src }: { src: string } = $props();
    let container: HTMLDivElement | undefined = $state();
    let dialog: HTMLDialogElement | undefined = $state();
    let closeBtn: HTMLButtonElement | undefined = $state();

    const img = getImage(src);
    onMount(() => {
        container?.appendChild(img);
        dialog?.addEventListener("click", (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });
        closeBtn?.addEventListener("click", () => {
            dialog?.close();
        });
    });

    const highDefURL = new URL(src);
    highDefURL.searchParams.set("w", "520");

    function clickHandler() {
        if (dialog) {
            dialog.showModal();
        }
    }
</script>

<div bind:this={container} onclick={clickHandler} role="presentation"></div>

<dialog bind:this={dialog}>
    <div class="dialog-container">
        <img src={highDefURL.href} alt="" />
        <button class="close" bind:this={closeBtn}> 닫기 </button>
    </div>
</dialog>

<style>
    div {
        width: 100%;
        cursor: pointer;
    }

    div :global(img) {
        width: 100%;
    }

    dialog {
        max-width: 100%;
        border: 2px solid rgb(80, 140, 230);
        border-radius: 5px;

        padding: 10px;
    }

    .dialog-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
    }

    img {
        width: 100%;
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(1px);
    }
</style>
