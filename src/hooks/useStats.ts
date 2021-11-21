import { useEffect } from 'react'
import { addEffect, addAfterEffect } from '@react-three/fiber'
import Stats from '@drecom/stats.js'

export const useStats = (): void => {
	useEffect(() => {
		const stats = new Stats({
			maxFPS: Number.POSITIVE_INFINITY,
			maxMem: Number.POSITIVE_INFINITY
		})
		document.body.append(stats.dom)

		addEffect(() => { stats.begin() })
		addAfterEffect(() => { stats.end() })
	}, [])
}
