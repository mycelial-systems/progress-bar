import { define } from '@substrate-system/web-component/util'
import Debug from '@substrate-system/debug'
const debug = Debug('progress-bar')

declare global {
    interface HTMLElementTagNameMap {
        'progress-bar':ProgressBar
    }
}

export const TAG = 'progress-bar'

export class ProgressBar extends HTMLElement {
    static observedAttributes = ['progress']
    static TAG = TAG

    // constructor () {
    //     super()
    // }

    connectedCallback () {
        debug('connected')
        if (!this.querySelector('.progress-bar-fill')) {
            this.innerHTML = '<div class="progress-bar-fill"></div>'
        }
        this.applyProgress(this.getAttribute('progress'))
    }

    disconnectedCallback () {
        debug('disconnected')
    }

    attributeChangedCallback (
        name:string,
        oldValue:string|null,
        newValue:string|null
    ) {
        debug('attribute changed', name, oldValue, newValue)
        if (name === 'progress') {
            this.applyProgress(newValue)
        }
    }

    private applyProgress (raw:string|null) {
        const n = raw === null ? 0 : Number(raw)
        const clamped = Number.isFinite(n) ?
            Math.min(100, Math.max(0, n)) :
            0
        this.style.setProperty('--progress', clamped + '%')
    }
}

define(TAG, ProgressBar)
