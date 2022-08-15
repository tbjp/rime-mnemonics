<script lang="ts">
    import { fly } from "svelte/transition";
    import { openView } from "../store/stores";
</script>

<div class="overlap-cell2" transition:fly={{ x: -800, opacity: 0 }}>
    <div class="text-wrapper">
        <h2>About</h2>
        <div>
            <p>API provided by <a href='https://www.datamuse.com/api/'>Datamuse</a></p>
            <p>Website built using <a href='https://svelte.dev'>Svelte</a> by Toby</p>
            <p><a href='https://github.com/tbjp'>GitHub</a></p>
        </div>
    </div>
    <div class="button-wrapper">
        <button
            on:click={() => {
                $openView = null;
            }}>Close</button
        >
    </div>
</div>
