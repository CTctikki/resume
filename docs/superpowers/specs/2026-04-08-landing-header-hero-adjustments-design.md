# Landing Header And Hero Adjustments Design

**Goal**

Refine the landing page so brand language is clearer, the hero preview is easier to read, and the main call-to-action feels immediate for first-time visitors.

**Approved Direction**

- Use the studio brand in the landing header instead of the product name.
- Replace the plain `ctikki.com` text link with an explicit website button.
- Change the landing badge copy from `本地优先的简历工作台` to `CT简历工作台` and make it feel more prominent.
- Change the visible `打开工作区` landing CTAs to `立即使用`.
- Move the workspace preview out of the side-by-side hero split and give it its own full-width row so the product screenshot is legible.

**UI Scope**

- Header brand treatment on the landing page only
- Hero text, badge, primary CTA, and preview composition
- CTA section button copy alignment with the new action language

**Non-Goals**

- No dashboard/workbench layout changes
- No new product flows
- No asset replacement for the screenshot itself

**Implementation Notes**

- Keep existing landing component boundaries where possible: `LandingHeader`, `HeroSection`, `CTASection`, and `landingCopy`.
- Avoid changing shared product branding globally unless required; prefer landing-specific overrides.
- Add focused tests for copy and header CTA behavior, plus a structure assertion that the preview is rendered in a dedicated block.
