/**
 * Runs synchronously while the browser parses `<head>`, before the first paint.
 *
 * The curtain itself isn't client-only state — it's unconditional, so it server
 * renders and needs no script. What *is* client-only is whether the intro
 * should run at all, and that has to be settled before anything is painted;
 * `useEffect` would be too late (the user would see the page, then a curtain
 * slam shut) and reading storage during render would desync hydration. So the
 * decision lives in an attribute on `<html>`, set here, and CSS does the rest.
 *
 * This is the pattern from the Next.js "preventing flash before hydration"
 * guide, applied at the attribute level rather than the element level: React's
 * markup is identical either way, so there is nothing to reconcile.
 *
 * The 5s timeout is the important line in this file. It's the one escape hatch
 * that lives outside the thing it's rescuing — it still fires if the React
 * bundle 404s, throws on parse, or never arrives, so a broken deploy can't
 * leave visitors staring at a locked white screen.
 */
const BOOT = `(function(){var d=document.documentElement;
function skip(){d.dataset.preload="done"}
try{
if(sessionStorage.getItem("nm:intro")==="seen")skip();
if(location.search.indexOf("nointro")>-1)skip();
var c=navigator.connection;if(c&&(c.saveData||/2g/.test(c.effectiveType||"")))skip();
var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="back_forward")skip();
}catch(e){skip()}
setTimeout(function(){if(d.dataset.preload!=="done")skip()},5000)})()`;

export function BootScript() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      {/* Without JS the sequence can never run, so the curtain must never be
          shown and the scroll lock must never apply. */}
      <noscript>
        <style>{`[data-preloader]{display:none!important}html{overflow:auto!important}`}</style>
      </noscript>
    </>
  );
}
