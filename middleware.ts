// config with custom matcher
export const config = {
	matcher: '/brand',
};

export default function middleware(request: Request) {
	console.log(request.url);
	// return Responsex
	// return Response.redirect(new URL('/about-2', request.url));
}
