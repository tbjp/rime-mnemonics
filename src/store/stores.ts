import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const openView: Writable<null | 'options' | 'help' > = writable(null)