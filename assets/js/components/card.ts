// /**
//  * card.ts
//  *
//  * @author Ainsley Clark
//  * @author URL:   https://ainsley.dev
//  * @author Email: hello@ainsley.dev
//  */
//
//
// import {Log} from "../util/log";
// import {Cursor, CursorClasses} from "./cursor";
//
// /**
//  * Card is responsible for adding micro interactions
//  * to card elements.
//  */
// class Card {
//
// 	/**
// 	 * The DOM selector for the button.
// 	 *
// 	 * @private
// 	 */
// 	public selector = ".card"
//
// 	/**
// 	 * Instantiates a new button type.
// 	 */
// 	constructor() {
// 		this.attachHandlers();
// 	}
//
// 	/**
// 	 * Attaches the event handlers for all button elements
// 	 * on the DOM.
// 	 *
// 	 * @private
// 	 */
// 	private attachHandlers(): void {
// 		document.querySelectorAll<HTMLButtonElement>(this.selector).forEach(btn=> {
// 			const wrapper = btn.querySelector(".btn-wrapper") as HTMLDivElement;
// 			if (!wrapper) {
// 				Log.warn("No button wrapper element found for: " + btn.innerHTML);
// 				return;
// 			}
// 			this.attachActive(btn);
// 			this.mouseMove(btn, wrapper);
// 			this.mouseOut(btn, wrapper);
// 		});
// 	}
//
// 	/**
// 	 * Attaches the mouse move event which transforms and skews
// 	 * the button and adds the cursor styles.
// 	 *
// 	 * @param btn
// 	 * @param text
// 	 * @private
// 	 */
// 	private mouseMove(btn: HTMLButtonElement, text: HTMLDivElement): void {
// 		btn.addEventListener("mousemove", e => {
// 			Cursor.addClass(CursorClasses.Invert, CursorClasses.InvertBlack);
//
// 			const pos = btn.getBoundingClientRect();
// 			const mx = e.clientX - pos.left - pos.width/2;
// 			const my = e.clientY - pos.top - pos.height/2;
//
// 			btn.style.transform = 'translate('+ mx * 0.15 +'px, '+ my * 0.3 +'px)';
// 			btn.style.transform += 'rotate3d('+ mx * -0.1 +', '+ my * -0.3 +', 0, 12deg)';
// 			text.style.transform = 'translate('+ mx * 0.025 +'px, '+ my * 0.075 +'px)';
// 		});
// 	}
//
// 	/**
// 	 * Removes the mouse move event and clears selectors.
// 	 *
// 	 * @param btn
// 	 * @param text
// 	 * @private
// 	 */
// 	private mouseOut(btn: HTMLButtonElement, text: HTMLDivElement): void {
// 		btn.addEventListener("mouseleave", e => {
// 			Cursor.removeClass(CursorClasses.Invert, CursorClasses.InvertBlack);
//
// 			btn.style.transform = 'translate3d(0, 0, 0)';
// 			btn.style.transform += 'rotate3d(0, 0, 0, 0deg)';
// 			text.style.transform = 'translate3d(0, 0, 0)';
// 		});
// 	}
// }
//
// export default new Button();
