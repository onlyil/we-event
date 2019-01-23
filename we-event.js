class WeEvent {
    constructor() {
        this._events = {}
    }

    on(ev, cb, ctx) {
        if (typeof cb !== 'function') {
            console.error(`WeEvent Error: The callback of '${ev}' must be a function.`)
            return;
        }
        if (!ctx) {
            console.error(`WeEvent Error: Need transfer page instance as context of '${ev}' callback.`)
            return;
        }

        let events = this._events[ev] = this._events[ev] || []

        // Avoid repeatedly collect dependencies
        if (events.length) {
            const noRepeat = events.every(item => {
                if (item.ctx !== ctx) {
                    return true
                }
                if (item.cb !== cb) {
                    return true
                }
                return false
            })
            if (noRepeat) {
                events.push({
                    cb,
                    ctx,
                })
            }
        } else {
            events.push({
                cb,
                ctx,
            })
        }
    }

    emit(ev, ...args) {
        let events = this._events[ev]

        if (!events) {
            console.warn(`WeEvent Warn: No registered event ${ev}.`)
            return
        }

        if (!events.length) {
            console.warn(`WeEvent Warn: No listener of the event ${ev}.`)
            return
        }

        events.forEach(item => {
            item.cb.call(item.ctx, ...args)
        })
    }

    off(ev, cb) {
        // if no arg, remove all listeners
        if (!arguments.length) {
            this._events = {}
            return
        }

        let events = this._events[ev]
        // if only transfer ev, remove all listeners of this event
        if (arguments.length === 1) {
            events = []
            return
        }

        if (!events) {
            console.warn(`WeEvent Warn: No registered event ${ev}.`)
            return
        }

        if (!events.length) {
            console.warn(`WeEvent Warn: No listener of the event ${ev}.`)
            return
        }

        events.some((item, index) => {
            if (item.cb === cb) {
                events.splice(index, 1)
                return true
            }
        })
    }
}

module.exports = WeEvent
