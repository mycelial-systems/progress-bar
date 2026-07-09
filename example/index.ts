import { render, type FunctionComponent } from 'preact'
import { html } from 'htm/preact'
import { signal, batch } from '@preact/signals'
import { ProgressBar } from '../src/index.js'
import '../src/index.css'

if (import.meta.env.DEV || import.meta.env.MODE !== 'production') {
    localStorage.setItem('DEBUG', 'progress-bar,progress-bar:*')
} else {
    localStorage.removeItem('DEBUG')
}

const state = {
    progress: signal(0),
    fetchStatus: signal('')
}

const IMG_URL = (
    'https://upload.wikimedia.org/wikipedia/commons/4/47/' +
    'PNG_transparency_demonstration_1.png'
)

function reset () {
    batch(() => {
        state.progress.value = 0
        state.fetchStatus.value = ''
    })
}

// Demo 1 -- setTimeout based progress
function runTimer () {
    state.progress.value = 0
    let n = 0
    const tick = () => {
        n += 5
        state.progress.value = n
        if (n < 100) {
            setTimeout(tick, 100)
        }
    }
    setTimeout(tick, 100)
}

// Demo 2 -- fetch with body stream + Content-Length
async function runFetch () {
    batch(() => {
        state.progress.value = 0
        state.fetchStatus.value = 'fetching...'
    })

    try {
        const res = await fetch(IMG_URL)
        if (!res.ok || !res.body) {
            throw new Error('bad response: ' + res.status)
        }

        const total = Number(res.headers.get('Content-Length')) || 0
        const reader = res.body.getReader()
        let received = 0

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            received += value.byteLength
            // update progress state
            state.progress.value = (received / total) * 100
        }

        batch(() => {
            // when we are down here, we are 100% done
            state.progress.value = 100
            state.fetchStatus.value = `done (${received} bytes)`
        })
    } catch (err) {
        state.fetchStatus.value = 'error: ' + (err as Error).message
    }
}

const Example:FunctionComponent = function () {
    return html`<div class="example">
        <${ProgressBar.TAG} progress="${state.progress.value}"><//>

        <main>
            <h1>progress-bar</h1>

            <div>
                <h2>setTimeout demo</h2>
                <p>Click to step the bar from 0 to 100% over ~2 seconds.</p>
                <button onClick=${runTimer}>Run timer</button>
            </div>

            <div>
                <h2>fetch demo</h2>
                <p>
                    Download a Wikimedia Commons image and update the bar
                    from the byte stream.
                </p>
                <button onClick=${runFetch}>Run fetch</button>
                <p aria-live="polite">${state.fetchStatus.value}</p>
            </div>

            <div>
                <button onClick=${reset}>Reset</button>
            </div>
        </main>
    </div>`
}

render(html`<${Example} />`, document.getElementById('root')!)
