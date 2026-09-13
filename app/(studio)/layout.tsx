/**
 * The Studio's own root layout. The site's layout carries the entrance
 * sequence, the custom cursor and the page's fonts and CSS — none of which
 * belong over an editing UI — so the Studio is a separate root. Moving between
 * the two is a full page load, which is fine for an admin route.
 */
export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
