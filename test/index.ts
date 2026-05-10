import { test } from '@substrate-system/tapzero'
import { waitFor } from '@substrate-system/dom'
import { ProgressBar } from '../src/index.js'

import './preact.js'

test('renders the element', async t => {
    document.body.innerHTML += `
        <${ProgressBar.TAG} class="test"></${ProgressBar.TAG}>
    `

    const el = await waitFor('progress-bar.test')
    t.ok(el, 'should find the element')
    t.ok(el!.querySelector('.progress-bar-fill'),
        'should render the fill element')
})

test('reflects the progress attribute as a CSS variable', async t => {
    document.body.innerHTML += `
        <progress-bar class="with-progress" progress="42"></progress-bar>
    `

    const el = await waitFor('progress-bar.with-progress') as HTMLElement
    t.equal(
        el.style.getPropertyValue('--progress'),
        '42%',
        '--progress should be 42%'
    )

    el.setAttribute('progress', '73')
    t.equal(
        el.style.getPropertyValue('--progress'),
        '73%',
        '--progress should update to 73% after attribute change'
    )
})

test('clamps out-of-range values', async t => {
    document.body.innerHTML += `
        <progress-bar class="clamped" progress="150"></progress-bar>
    `

    const el = await waitFor('progress-bar.clamped') as HTMLElement
    t.equal(
        el.style.getPropertyValue('--progress'),
        '100%',
        'values above 100 should clamp to 100%'
    )

    el.setAttribute('progress', '-20')
    t.equal(
        el.style.getPropertyValue('--progress'),
        '0%',
        'negative values should clamp to 0%'
    )
})

test('all done', () => {
    // @ts-expect-error testing
    window.testsFinished = true
})
