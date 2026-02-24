/**
 * util.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

export const RemoveBRs = (el: Element): void => {
	el.innerHTML = el.innerHTML.replace(/<br\s*[/]?>/gi, `&nbsp;`);
};
