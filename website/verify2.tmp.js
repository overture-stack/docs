const { chromium } = require("playwright");
const SHOT = (name) =>
  `/private/tmp/claude-502/-Users-mshiell-Desktop-docs/57b00406-1912-440a-a1cb-5a1619fd3f1a/scratchpad/${name}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  // --- Products page: repeated headers ---
  await page.goto("http://localhost:3000/products/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const headerRows = await page.locator(".ProductsTable__columnHeader").count();
  console.log("repeated header rows:", headerRows);

  // --- Multi-deployment collapse + tooltip + click -> highlight ---
  const arrangerRow = page.locator("tr#arranger");
  await arrangerRow.scrollIntoViewIfNeeded();
  const usedByLink = arrangerRow.locator(".ProductsTable__usedByLink");
  console.log("Arranger link text:", await usedByLink.textContent());
  const href = await usedByLink.getAttribute("href");
  console.log("href:", href);

  await usedByLink.click();
  await page.waitForURL(/impact/, { timeout: 10000 });
  await page.waitForTimeout(700);
  console.log("Landed URL:", page.url());

  const highlightIds = await page.locator("tr.ImpactTable__highlight").evaluateAll((els) => els.map((e) => e.id));
  console.log("highlighted row ids:", highlightIds);

  await page.screenshot({ path: SHOT("impact-highlight.png") });

  // check the highlight bleeds past the row's cell bounds (box-shadow) --
  // compare table row width vs the effective painted box via box-shadow (hard to
  // measure directly, so just confirm the CSS applied box-shadow != 'none')
  const shadowInfo = await page.evaluate(() => {
    const row = document.querySelector("tr.ImpactTable__highlight");
    if (!row) return null;
    const firstCell = row.querySelector("th, td");
    const lastCell = row.querySelectorAll("th, td");
    const last = lastCell[lastCell.length - 1];
    return {
      firstShadow: getComputedStyle(firstCell).boxShadow,
      lastShadow: getComputedStyle(last).boxShadow,
      firstBg: getComputedStyle(firstCell).backgroundColor,
    };
  });
  console.log("shadow info:", shadowInfo);

  // Wait 3s (longer than the old 2400ms fade) and confirm it's STILL highlighted
  await page.waitForTimeout(3000);
  const stillHighlighted = await page.locator("tr.ImpactTable__highlight").count();
  console.log("still highlighted after 3s (should be 7):", stillHighlighted);

  // Click outside (e.g. the page heading) and confirm it clears
  await page.locator("h1, .Hero").first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);
  const afterOutsideClick = await page.locator("tr.ImpactTable__highlight").count();
  console.log("highlighted after outside click (should be 0):", afterOutsideClick);

  // --- Row-level anchor scroll offset (single-deployment case) ---
  // Drug Discovery Portal is used by only "arranger, stage" per componentUsage
  // -- but arranger has 7 deployments; find a component used by exactly 1.
  await page.goto("http://localhost:3000/products/", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const singleLinks = await page.locator(".ProductsTable__usedByLink").evaluateAll((els) =>
    els
      .filter((el) => !/deployments$/.test(el.textContent || ""))
      .map((el) => ({ text: el.textContent, href: el.getAttribute("href") })),
  );
  console.log("single-deployment links found:", singleLinks.length, singleLinks[0]);

  if (singleLinks[0]) {
    await page.goto(`http://localhost:3000${singleLinks[0].href}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const anchorId = singleLinks[0].href.split("#")[1];
    const rectAndNav = await page.evaluate((id) => {
      const el = document.getElementById(id);
      const nav = document.querySelector("nav.navbar") || document.querySelector("[class*=navbar]");
      return {
        top: el ? el.getBoundingClientRect().top : null,
        navHeight: nav ? nav.getBoundingClientRect().height : null,
      };
    }, anchorId);
    console.log(`row #${anchorId} top vs navbar:`, rectAndNav, "(top should be >= navHeight)");
    await page.screenshot({ path: SHOT("impact-single-anchor.png") });
  }

  // --- Mobile: repeated header hidden ---
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("http://localhost:3000/products/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const mobileHeaderVisible = await page
    .locator(".ProductsTable__columnHeader")
    .first()
    .isVisible()
    .catch(() => false);
  console.log("mobile: repeated header visible (should be false):", mobileHeaderVisible);
  await page.screenshot({ path: SHOT("products-mobile2.png"), fullPage: true });

  console.log("page errors:", errors);
  await browser.close();
})();
