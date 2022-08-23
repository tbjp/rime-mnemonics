import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const openView: Writable<null | 'options' | 'help' | 'about'> = writable(null)

export const autoRunOnce: Writable<boolean> = writable(false)

const optionDarkModeStored = localStorage.optionDarkMode
export const optionDarkMode: Writable<'Dark' | 'Light' | 'System'> = writable(optionDarkModeStored || 'System')
optionDarkMode.subscribe((value) => localStorage.optionDarkMode = value)

export const optionAutoSubmit: Writable<boolean> = writable<boolean>(localStorage.optionAutoSubmit === 'true' || true)
optionAutoSubmit.subscribe((value) => localStorage.optionAutoSubmit = String(value))

export const optionButtons: Writable<boolean> = writable<boolean>(localStorage.optionButtons === 'true' || false)
optionButtons.subscribe((value) => localStorage.optionButtons = String(value))

export const optionNearRhymes: Writable<boolean> = writable<boolean>(localStorage.optionNearRhymes === 'true' || false)
optionNearRhymes.subscribe((value) => localStorage.optionNearRhymes = String(value))

export const optionTopicMode: Writable<boolean> = writable<boolean>(localStorage.optionTopicMode === 'true' || false)
optionTopicMode.subscribe((value) => localStorage.optionTopicMode = String(value))

export const optionSpanish: Writable<boolean> = writable<boolean>(localStorage.optionSpanish === 'true' || false)
optionSpanish.subscribe((value) => localStorage.optionSpanish = String(value))