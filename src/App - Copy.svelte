<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';



  let meaning = null;
  let prevMeaning = null;
  let vocab = null;
  let prevVocab = null;
  let rhymesLoading = false;
  let fonesLoading = false;
  let rhymesError = false;
  let fonesError = false;
  let fetchErrorMsg = "No response from server, please try again.";
  let rhymesPromise = prepQuery(meaning, null, null);
  let rhymesList = null;
  let fonesPromise = prepQuery(vocab, null, null);
  let fonesList = null;
  const noResponse = [{"word":"No Results"}];
  let glowUp1 = false;
  let glowUp2 = false;

function getNewList(query, type, options, load_flag, prevQuery) {
  if (isNewValidQuery(prevQuery, query)) {
    if (load_flag == "r") {
      resetList1Timer();
      prevMeaning = meaning;
    } else {
      resetList2Timer();
      prevVocab = vocab;
    };
    const preppedQuery = prepQuery(query, type, options);
    const promise = fetchRhymes(preppedQuery, load_flag);
    promise.then(
      function(value) {
        if (!value.length) {
          if (load_flag == "r") {
            {rhymesList = noResponse};
            {rhymesLoading = false};
            {rhymesError = false};
          } else {
            {fonesList = noResponse};
            {fonesLoading = false};
            {fonesError = false};
          };
        } else {
        sortResults(value, load_flag);
        if (load_flag == "r") {rhymesError = false} else {fonesError = false}
        }
      }).catch(error => {
        if (load_flag == "r") {rhymesLoading = false} else {fonesLoading = false};
        if (load_flag == "r") {rhymesError = true} else {fonesError = true};
        console.error(`Could not get data: ${error}`)
        rhymesError = rhymesError});
  } else {
    return null
  };
}

function prepQuery(query, type, options) {
    if (query !== null) {
    const trimmed = query.trim();
    const preppedQuery = type + trimmed + options;
    return preppedQuery;
    } else {
    return null
    };
};

async function fetchRhymes(preppedQuery, load_flag) {
  try {
    if (load_flag == "r") {
      rhymesLoading = true} else { fonesLoading = true};
    const response = await fetch("https://api.datamuse.com/words?" + preppedQuery);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch(error) {
    console.error(`Could not get data: ${error}`);
    if (load_flag == "r") {rhymesError = true} else {fonesError = true}
  }
};

function sortResults(wordList, load_flag) {
    const listA = wordList;
    listA.forEach((wl) => {
        const frequency = parseFloat(wl.tags[0].slice(2,11));
        wl.comboScore = wl.score + (frequency * 10);
    });
    listA.sort((a, b) => {
        return b.comboScore - a.comboScore;
    });
    console.log(listA);
    if (load_flag == "r") {
      rhymesList = listA;
      rhymesLoading = false;
    } else {
      fonesList = listA;
      fonesLoading = false;
    };
  };

// Timers for auto-submitting user input to API
let meaningTimer;
let vocabTimer;

function submitTimerM() {
  resetList1Timer();
  glowUp1 = true;
  console.log("Rime Input Event Called");
  console.log(meaning)
  if (!isNewValidQuery(prevMeaning, meaning)) {
    console.log("Did not submit meaning to API.");
    glowUp1 = false;
    return
  } else {
  meaningTimer = setTimeout(() => {
    document.getElementById("rimesButton").click();
    prevMeaning = meaning;
    glowUp1 = false;
    console.log("Called API for meaning.")
  }, 2000)};
};  

function submitTimerV() {
  resetList2Timer();
  glowUp2 = true;
  console.log("Fones Input Event Called")
  if (!isNewValidQuery(prevVocab, vocab)) {
    console.log("Did not submit vocab to API.")
    glowUp2 = false;
    return
  } else {
  vocabTimer = setTimeout(() => {
    document.getElementById("fonesButton").click();
    prevVocab = vocab;
    glowUp2 = false;
    console.log("Called API for vocab.")
  }, 2000)};
};

function resetList1Timer() {
  const element = document.getElementById("rimeInput");
  clearTimeout(meaningTimer);
  element.classList.remove("glowUp");
  void element.offsetWidth; // This restarts the animation.
  element.classList.add("glowUp");
  glowUp1 = false;
};

function resetList2Timer() {
  const element = document.getElementById("foneInput");
  clearTimeout(vocabTimer);
  element.classList.remove("glowUp");
  void element.offsetWidth; // This restarts the animation.
  element.classList.add("glowUp");
  glowUp2 = false;
};

function isNewValidQuery(prevQuery, newQuery) {
  if (newQuery == prevQuery || !newQuery.trim()) {
    return false;
  } else {
    return true;
  }
};

onMount( function() {
  const rimeInputId = document.getElementById("rimeInput");
  const foneInputId = document.getElementById("foneInput");

  rimeInputId.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      if (document.getElementById('rimeInput') === document.activeElement) {
        event.preventDefault();
        document.getElementById("rimesButton").click();
        } 
      };
    });

  foneInputId.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      if (document.getElementById('foneInput') === document.activeElement) {
        event.preventDefault();
        document.getElementById("fonesButton").click();
        } 
      };
    });
});
</script>

<main>
  <div id="page-container">
    <div class="header"><h1>Rime</h1></div>
    <div class="flex-container">
      <input type="text" placeholder="Meaning" id="rimeInput" 
      bind:value={meaning}
      on:input={submitTimerM}
      class:glowUp="{glowUp1 === true}">
      <input type="text" placeholder="Phonetic Vocab" id="foneInput" 
      bind:value={vocab} 
      on:input={submitTimerV}
      class:glowUp="{glowUp2 === true}">
    </div>
    <div class="flex-container lists">
      <ul>
        {#if rhymesLoading == true}
          <li in:fly="{{ y:-200}}" class="placeholder">Loading...</li>
        {:else if rhymesError == true}
          <li in:fly="{{ y:-200}}" class="placeholder">{fetchErrorMsg}</li>
        {:else if rhymesList == null}
          <li in:fly="{{ y:-200}}" class="placeholder">Rhymes go here</li>
        {:else} 
          {#each rhymesList as rhyme}
            <li in:fly="{{ y:-200}}" out:fly="{{ y:200}}">
              {rhyme.word}</li>
          {/each}
        {/if}
      </ul>
      <ul>
        {#if fonesLoading == true}
          <li in:fly="{{ y:-200}}" class="placeholder">Loading...</li>
        {:else if fonesError == true}
          <li in:fly="{{ y:-200}}" class="placeholder">{fetchErrorMsg}</li>
        {:else if fonesList == null}
          <li in:fly="{{ y:-200}}" class="placeholder">Fones go here</li>  
        {:else} 
          {#each fonesList as fone}
            <li in:fly="{{ y:-200}}" out:fly="{{ y:200}}">
              {fone.word}</li>
          {/each}
        {/if}
      </ul>
    </div>

    <div hidden class="button-wrapper">
      <button hidden id="rimesButton" on:click={ () => {rhymesPromise = getNewList(meaning, "rel_rhy=", "&md=f&max=80", "r", prevMeaning);}}>
        Find Rimes</button>
      <button hidden id="fonesButton" on:click={ () => {fonesPromise = getNewList(vocab, "sl=", "&md=f&max=80", "f", prevVocab);}}>
        Find Fones</button>
    </div>
  </div>
</main>