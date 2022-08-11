<script lang="ts">
import { fly } from 'svelte/transition';
import { openView, optionDarkMode, optionAutoSubmit, optionButtons, optionNearRhymes, optionTopicMode } from '../store/stores';
</script>

<div class="overlap-cell2"  transition:fly="{{ x:-800, opacity:0}}">
    <div class="options-wrapper">
        <h2>Options</h2>
        <div class="options-flexbox">
            <ul class="options-labels">
                <li>Colour Scheme</li>
                <li>Auto-submit input</li>
                <li>Enable submit buttons</li>
                <li>Include near rhymes</li>
                <li>Sort by topic mode</li>
            </ul>
            <ul class="options-options">
                <li><select bind:value={$optionDarkMode}>
                    <option>Dark</option>
                    <option>Light</option>
                    <option>System</option>
                </select></li>
                <li><input type="checkbox" bind:checked={$optionAutoSubmit}></li>
                <li><input type="checkbox" bind:checked={$optionButtons}></li>
                <li><input type="checkbox" bind:checked={$optionNearRhymes}></li>
                <li><input type="checkbox" bind:checked={$optionTopicMode}></li>
            </ul>
        </div>
    </div>
    <div class="button-wrapper">
        <button on:click={() => {$openView = null}}>Close</button>
    </div>
</div>