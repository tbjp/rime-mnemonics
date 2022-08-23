<script lang="ts">
import { fly } from 'svelte/transition';
import { openView, autoRunOnce, optionDarkMode, optionAutoSubmit, optionButtons, optionNearRhymes, optionTopicMode, optionSpanish } from '../store/stores';
</script>

<div class="overlap-cell2"  transition:fly="{{ x:-800, opacity:0}}">
    <div class="options-wrapper">
        <h2>Options</h2>
        <div class="options-flexbox">
            <ul class="options-labels">
                <li><label for="slct1-label">Colour Scheme</label></li>
                <li><label for="chk1-label">Auto-submit input</label></li>
                <li><label for="chk2-label">Enable submit buttons</label></li>
                <li><label for="chk3-label">Include near rhymes</label></li>
                <li><label for="chk4-label">Sort by topic mode</label></li>
                <li><label for="chk5-label">Enable Spanish mode</label></li>
            </ul>
            <ul class="options-options">
                <li><select bind:value={$optionDarkMode} id="slct1-label">
                    <option>Dark</option>
                    <option>Light</option>
                    <option>System</option>
                </select></li>
                <li><input type="checkbox" bind:checked={$optionAutoSubmit} id="chk1-label"></li>
                <li><input type="checkbox" bind:checked={$optionButtons} id="chk2-label"></li>
                <li><input type="checkbox" bind:checked={$optionNearRhymes} id="chk3-label"></li>
                <li><input type="checkbox" bind:checked={$optionTopicMode} id="chk4-label"></li>
                <li><input type="checkbox" bind:checked={$optionSpanish} id="chk5-label"></li>
            </ul>
        </div>
    </div>
    <div class="button-wrapper">
        <button on:click={() => {$openView = null}}>Close</button>
    </div>
</div>