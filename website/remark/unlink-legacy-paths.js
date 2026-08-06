// Build-time remark transform that "unlinks" internal links pointing at routes
// removed in the Deploy·Build·Use IA migration (the whole /guides tree).
//
// Why this exists: vendored component docs (Song, Maestro, ...) hard-code links
// to the old docs-site paths (e.g. /guides/administration-guides/index-mappings).
// This repo cannot edit that submodule content (it belongs to each component's
// own repo/PR flow), and @docusaurus/plugin-client-redirects routes do NOT
// satisfy `onBrokenLinks: "throw"`. Rather than relax the strict link check
// site-wide, this strips the link wrapper from dead /guides links, keeping the
// visible text. Applied only to instances that carry vendored content.
//
// Durable fix: repoint these links in the owning repos (Song, Maestro, ...) and
// bump the submodule pins, then delete this plugin and its wiring.

const DEAD_PREFIXES = ["/guides"];

function isDeadUrl(url) {
  if (typeof url !== "string") return false;
  return DEAD_PREFIXES.some(
    (p) => url === p || url.startsWith(p + "/") || url.startsWith(p + "#"),
  );
}

function unlinkDeadLinks(node) {
  if (!node || !Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === "link" && isDeadUrl(child.url)) {
      // Replace the link node with its own children (the visible text),
      // then reprocess from the same position.
      node.children.splice(i, 1, ...(child.children || []));
      i--;
      continue;
    }
    unlinkDeadLinks(child);
  }
}

module.exports = function unlinkLegacyPaths() {
  return (tree) => {
    unlinkDeadLinks(tree);
  };
};
