<script lang="ts">
    import { fly } from 'svelte/transition';
    import { openView } from '../store/stores';

    let helpView = 'intro';

</script>
    
<div class="overlap-cell2"  transition:fly="{{ x:-800, opacity:0}}">
    <div class="text-wrapper">
        {#if helpView == 'intro'}
        <h2>Introduction</h2>
        <p>
            You can use Rime to help you create mnemonics for 
            language learning or studying.
        </p>
        <p>
            The general idea is to find words that link like this:
        </p>
        <div class="explain-flexbox">
            <div class="explain-box"><b>share</b> <br>(meaning in English)</div>
            <div class ="arrow">></div>
            <div class="explain-box"><b>pair</b><br>(rhyme)</div>
            <div class ="arrow">></div>
            <div class="explain-box"><b>walker</b><br>(sounds like)</div>
            <div class ="arrow">></div>
            <div class="explain-box"><b>わける wakeru</b><br>(target word)</div>
        </div>
        <p>
            Then, I can create a story in my mind about sharing a pair of socks with a walker. Walker loosely sounds like 'wakeru' in Japanese, so it's enough to make me remember the word. Wakeru means 'share'.
        </p>
        <p>
            Enter an English word on the left and Rime will find words that rhyme.
        </p>
        <p>
            Enter a word on the right and Rime will try to find similar sounding words. 
        </p>
        <p>
            Words entered on the right don't need to be real and may contain spaces. Try to write the word phonetically in vaguely 'standard' English.
        </p>
        {:else if helpView == 'adv'}
        <h2>Advanced</h2>
        <p>
            Both input boxes support wildcard searches using the * symbol. This overrides the original functionality of each list.
        </p>
        <div class="explain-flexbox">
            <div class="explain-box"><b>s*p</b><br>↓<br>stop<br>shop<br>step<br>sleep<br>ship</div>
            <div class="explain-box"><b>*sp</b><br>↓<br>grasp<br>gasp<br>crisp<br>cusp<br>lasp</div>
            <div class="explain-box"><b>sp*</b><br>↓<br>space<br>spot<br>spirit<br>spirit<br>spring</div>
        </div>
        <p>This kind of search is very powerful. It helps where the algorithm can't find rhymes or similar sounding words.</p>
        {:else}
        <h2>Shortcuts</h2>
        <b>Enter</b> - Submit<br>
        <b>ALT + C</b> - Clear all
        {/if}
    </div>
    <div class="button-wrapper button-wrapper-wrap">
        <button on:click={() => {helpView = 'intro'}}>Introduction</button>
        <button on:click={() => {helpView = 'adv'}}>Advanced</button>
        <button on:click={() => {helpView = 'shortcuts'}}>Shortcuts</button>
        <button on:click={() => {$openView = null}}>Close</button>
    </div>
</div>