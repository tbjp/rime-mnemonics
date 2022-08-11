import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const openView: Writable<null | 'options' | 'help' > = writable(null)
export const optionDarkMode: Writable<'Dark' | 'Light' | 'System'> = writable('System');
export const optionAutoSubmit: Writable<true | false> = writable(true);
export const optionButtons: Writable<true | false> = writable(false);
export const optionNearRhymes: Writable<true | false> = writable(false);
export const optionTopicMode: Writable<true | false> = writable(false);