/**
 * contact.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import LoadMap from '../components/map';
import { ContactForm } from '../forms/contact';

window.addEventListener('DOMContentLoaded', () => {
	LoadMap();
	new ContactForm();
});
