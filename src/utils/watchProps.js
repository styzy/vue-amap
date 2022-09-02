import typeOf from './typeOf'

const watchProps = (aMapObject, vm, props) => {
	props
		.map(prop => {
			if (typeOf(prop) === 'String')
				return { prop, watchProp: `$attrs.${prop}` }
			if (typeOf(prop) === 'Array')
				return {
					prop: prop[0],
					watchProp: `$attrs.${prop[0]}`,
					handler: prop[1]
				}
		})
		.forEach(({ watchProp, prop, handler }) => {
			vm.$watch(watchProp, (newValue, oldValue) => {
				try {
					if (handler) {
						handler.call(vm, aMapObject, newValue, oldValue)
					} else {
						aMapObject[
							`set${prop.replace(prop[0], prop[0].toUpperCase())}`
						](newValue)
					}
				} catch (error) {
					// eslint-disable-next-line
					console.error('Props watch error:', error)
				}
			})
		})
}

export default watchProps
