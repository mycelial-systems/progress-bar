import { type FunctionComponent, render } from 'preact'
import { waitFor } from '@substrate-system/dom'
import { html } from 'htm/preact'
import { type Signal, signal } from '@preact/signals'
import { test } from '@substrate-system/tapzero'
import { ProgressBar } from '../src/index.js'

const state:{ progress:Signal<number|string> } = {
    progress: signal(0)
}

const Test:FunctionComponent = function () {
    return html`<div class="test">
        <${ProgressBar.TAG} progress=${state.progress}><//>
    </div>`
}

document.body.innerHTML += '<div id="root"></div>'
render(html`<${Test} />`, document.getElementById('root')!)

// Wait until the component reflects the expected --progress value.
// Preact + signals re-render on a microtask, so a few ticks are enough.
async function waitForProgress (
    el:HTMLElement,
    expected:string,
    timeout = 1000
):Promise<string> {
    const start = Date.now()
    let actual = el.style.getPropertyValue('--progress')
    while (actual !== expected && Date.now() - start < timeout) {
        await new Promise(resolve => setTimeout(resolve, 0))
        actual = el.style.getPropertyValue('--progress')
    }
    return actual
}

test('renders the progress-bar with default attributes', async t => {
    const el = await waitFor('div.test progress-bar') as HTMLElement
    t.ok(el, 'progress-bar element exists in the preact tree')
    t.ok(
        el.querySelector('.progress-bar-fill'),
        'has a .progress-bar-fill child'
    )
    t.equal(
        el.style.getPropertyValue('--progress'),
        '0%',
        'starts at 0% from the initial signal value'
    )
})

test('re-renders when the signal value changes', async t => {
    const el = document.querySelector(
        'div.test progress-bar'
    ) as HTMLElement

    state.progress.value = 50
    t.equal(
        await waitForProgress(el, '50%'),
        '50%',
        '--progress updates to 50% after signal -> 50'
    )

    state.progress.value = 75
    t.equal(
        await waitForProgress(el, '75%'),
        '75%',
        '--progress updates to 75% after signal -> 75'
    )

    state.progress.value = 0
    t.equal(
        await waitForProgress(el, '0%'),
        '0%',
        '--progress returns to 0% after signal -> 0'
    )
})

test('handles all supported attribute variations', async t => {
    const el = document.querySelector(
        'div.test progress-bar'
    ) as HTMLElement

    const cases:Array<[number|string, string, string]> = [
        [0, '0%', 'numeric 0 -> 0%'],
        [42, '42%', 'numeric 42 -> 42%'],
        [99.5, '99.5%', 'fractional value is preserved'],
        [100, '100%', 'numeric 100 -> 100%'],
        [150, '100%', 'value above 100 clamps to 100%'],
        [-10, '0%', 'negative value clamps to 0%'],
        ['33', '33%', 'numeric string is parsed'],
        ['not-a-number', '0%', 'non-numeric value falls back to 0%']
    ]

    for (const [value, expected, msg] of cases) {
        state.progress.value = value
        t.equal(
            await waitForProgress(el, expected),
            expected,
            msg
        )
    }
})
