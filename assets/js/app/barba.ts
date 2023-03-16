/**
 * barba.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import Scroll from './scroll';
import { Params } from '../params';
import barba, { ITransitionData } from '@barba/core';
import anime from 'animejs/lib/anime.es';
import { Elements } from '../util/els';

/**
 *
 */
class Barba {

	/**
	 *
	 */
	init() {
		barba.init({
			debug: Params.appDebug,
			timeout: 5000,
			transitions: [{
				name: 'opacity-transition',
				leave(data: ITransitionData) {
					return anime({
						targets: data.current.container,
						opacity: 0,
						duration: 500,
						easing: "linear",
						complete: () => {
							Scroll.destroy();
						}
					}).finished
				},
				enter(data: ITransitionData) {
					anime({
						targets: data.next.container,
						opacity: [0, 1],
						easing: "linear",
						duration: 500,
					});
				}
			}]
		});
	}
}

export default new Barba();
