const listenerProxy = (aMapObject, vm) => {
	const listeners = vm.$listeners

	for (const event in listeners) {
		if (Object.hasOwnProperty.call(listeners, event)) {
			const handler = listeners[event]

			aMapObject.on(event, (...args) => {
				handler(...args)
			})
		}
	}
}

export default listenerProxy
