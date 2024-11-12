<script lang="ts">
    interface Props {
        keyword: string;
    }

    let { keyword = $bindable() }: Props = $props();
</script>

<div class="container">
    <input type="text" placeholder="검색" bind:value={keyword} />
</div>

<style>
    .container {
        margin-block: 10px;

        display: flex;
        width: 100%;
        justify-content: center;
    }
</style>
