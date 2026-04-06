# CT Resume Redesign Design Spec

Date: 2026-04-07
Project: Magic Resume redesign for CT程序定制工作室
Status: Approved direction, ready for implementation planning after review

## 1. Goal

Redesign the current open-source resume editor into an original product experience for CT程序定制工作室 that:

- keeps the existing strengths of polish, professionalism, and product completeness
- removes identifiable author-brand cues, personal project tone, and visual signatures from the original project
- feels like a reliable resume tool for real users rather than a personal showcase site
- is suitable for lightweight Vercel deployment and friend-facing use

This redesign is intentionally product-first, not marketing-first.

## 2. Product Positioning

### Chosen positioning

Internal/lightweight product for real use.

The homepage should act as a calm entry point into the editor, not as a creator portfolio or heavily persuasive landing page.

### New product framing

- Product name: CT 简历工作台
- Brand endorsement: by CT程序定制工作室
- Official link: https://ctikki.com
- Brand personality: professional, reliable, restrained, technically refined

### Tone rules

- No founder-story tone
- No self-referential open-source pride as the primary message
- No expressive personal signatures or auteur-style copy
- Copy should sound like a dependable tool used for work

## 3. Current UI/UX Audit

The current project is high quality, but it contains several strong identity markers that create brand confusion risk if left intact.

### 3.1 Explicit identity markers that must be removed

- Product name `Magic Resume` across navigation, landing, settings, FAQ, metadata, and manifest
- Existing logo asset and logo usage
- GitHub star callout in top navigation and mobile menu
- GitHub entry inside the editor dock
- GitHub contribution module in resume/profile flows
- Existing repository URL and service URL references
- Existing default sample resume data and sample project stories

### 3.2 Implicit visual signatures that create recognizability

- Warm ivory paper-like background paired with dark charcoal ink-like text
- Large serif landing headlines applied globally across product shells
- Soft blurred glow backgrounds and floating decorative blobs
- Showcase-style centered hero with dramatic screenshot stage
- Rounded, boutique-feeling controls with editorial/premium-art-direction energy
- Landing rhythm that feels closer to a beautifully crafted personal project than a utility product

### 3.3 Product-level cues that are worth preserving

- Real-time editing plus real-time preview
- Template previews rendered as actual resume pages rather than fake thumbnails
- Strong workbench structure with editing, layout, and preview zones
- Thoughtful export, backup, and local-first product concepts
- Good motion polish and high implementation completeness

## 4. Keep vs Redo

### 4.1 Keepable design principles

- Precision in spacing and state handling
- Clear product hierarchy
- Real preview as a trust-building mechanism
- Local-first and privacy-first product value
- High-quality animation as interaction feedback
- Product flows that reduce friction for resume creation

### 4.2 Visual outputs that must be redesigned

- All brand assets and naming
- Homepage structure and hero composition
- Global typography personality for product chrome
- Color system
- Button proportions and card treatment
- Floating dock language and decorative motifs
- CTA hierarchy and landing copy style
- Template card shell design
- Settings layout language

## 5. Recommended Direction

### Direction name

Precision Workspace

### Rationale

This direction produces a distinct product identity that keeps the original project's quality bar but shifts the visual language from "editorial showcase" to "professional workspace." It is the strongest fit for CT程序定制工作室 and best supports the chosen positioning of a friend-facing practical tool.

### Core feeling

- calm
- exact
- trustworthy
- contemporary
- quietly premium

### What it should resemble

- a polished productivity tool
- a well-designed document workspace
- a modern design-engineering product

### What it should not resemble

- a portfolio site
- a founder-led personal project homepage
- a generic B2B SaaS template
- the current project's serif-plus-glow landing aesthetic

## 6. New Brand System

### 6.1 Brand expression

CT程序定制工作室 should appear as the maintainer and quality signal, not as a loud sponsor.

Recommended product/brand relationship:

- Main product label: CT 简历工作台
- Secondary label: CT程序定制工作室
- Utility link treatment: a subtle `ctikki.com` link in header/footer/about areas

Brand presence should feel infrastructural and credible, not promotional.

### 6.2 Color system

The new palette should move away from warm paper/editorial tones and into a cooler precision-tool palette.

### Light theme

- `bg.canvas`: `#F4F7FA`
- `bg.surface`: `#FFFFFF`
- `bg.subtle`: `#EEF3F8`
- `border.default`: `#D9E1EA`
- `border.strong`: `#BEC9D6`
- `text.primary`: `#0F1720`
- `text.secondary`: `#5F6B7A`
- `text.tertiary`: `#7A8795`
- `brand.primary`: `#2457F5`
- `brand.primary-hover`: `#1D47CC`
- `brand.secondary`: `#0F766E`
- `success`: `#17845D`
- `warning`: `#B7791F`
- `danger`: `#C23B32`

### Dark theme

- `bg.canvas`: `#0B1220`
- `bg.surface`: `#121A27`
- `bg.subtle`: `#182232`
- `border.default`: `#263346`
- `border.strong`: `#34445A`
- `text.primary`: `#E6ECF3`
- `text.secondary`: `#AAB6C5`
- `text.tertiary`: `#7F8EA1`
- `brand.primary`: `#5B82FF`
- `brand.primary-hover`: `#7A9AFF`
- `brand.secondary`: `#33A99F`

### Color philosophy

- use blue as the anchor for trust and product identity
- use teal sparingly for "assistive intelligence" and secondary accents
- avoid purple-led identity, warm paper ivory, or gold-editorial luxury tones
- avoid long-lived animated gradients as a primary identity device

### 6.3 Typography strategy

Product UI and resume content must be separated.

### Product UI fonts

- Primary Latin: Geist or IBM Plex Sans
- Primary Chinese: MiSans
- Data/shortcuts/code-like metadata: IBM Plex Mono

### Resume content fonts

Continue supporting multiple resume template fonts, but these should belong to resume output only, not the application shell.

### Typography rules

- no global serif for product headings
- strong hierarchy through weight, size, and spacing rather than ornamental type
- dense interfaces should use neutral grotesk/sans behavior
- reserve serif usage only for optional resume templates if needed

### 6.4 Spacing, radius, border, and elevation

### Spacing scale

- base rhythm: 8px
- supported steps: 4, 8, 12, 16, 24, 32, 40, 48, 64

### Radius scale

- small controls: 10px
- cards and panels: 14px
- dialogs and sheets: 18px
- pill badges only when semantically needed

### Border strategy

- rely on crisp borders first
- use background tiering second
- use shadow only as supporting elevation

### Shadow strategy

- panel shadow: very soft, short range
- modal shadow: stronger but compact
- avoid dramatic glow-shadow combinations

This system should feel engineered, not frosted or boutique.

### 6.5 Iconography and illustration

### Icons

- one icon family only
- neutral geometric outlines
- consistent stroke width across the product
- no emoji-based structural UI

### Illustration

- if illustrations are used, they should be abstract workflow or document-system diagrams
- no mascot
- no whimsical "creator project" graphics
- no heavy gradient illustration plates

### 6.6 Motion system

Motion should communicate confidence and structure.

### Motion timings

- hover: 160ms
- press: 90ms to 120ms
- panel transitions: 220ms
- modal/sheet transitions: 260ms to 280ms
- route/major content transition: 280ms to 320ms

### Motion style

- mostly fade, translate, and scale
- strong spatial continuity in workbench panels
- small state transitions for edit/save/export feedback
- no ambient floating blobs or decorative gradient drift

### Motion intent

- reveal hierarchy
- confirm action
- reduce cognitive load
- never dominate the experience

### 6.7 Copy system

### Desired tone

- clear
- direct
- calm
- professional

### Undesired tone

- self-congratulatory
- creator-centric
- overly emotional
- "personal project showcase" language

### Example voice direction

Use phrasing like:

- Create a resume
- Choose a layout
- Export a polished PDF
- Store your data locally

Avoid phrasing like:

- Start your career chapter
- Make resume creation magical
- expressive story-first copy

## 7. Layout System

### 7.1 General layout rules

- max width for marketing/light homepage: 1200 to 1280px
- workbench uses full-width application shell
- information hierarchy should prioritize utility over decoration
- horizontal density is acceptable as long as labels remain legible

### 7.2 Shell model

Recommended application shell:

- Top bar for current document, save status, template, export/share, settings access
- Left navigation rail for sections and workspace navigation
- Center editing column
- Right preview column

This creates a stronger "tool" identity than the current floating-dock language.

## 8. Page-by-Page Redesign

### 8.1 Homepage / Product Introduction

### Objective

Act as a practical entry page, not a visual showpiece.

### New structure

1. Top bar
2. Focused hero
3. Three product proof blocks
4. Template quality preview strip
5. Lightweight FAQ or trust notes
6. Utility footer

### Hero

Replace the centered dramatic hero with a split layout:

- left: headline, product explanation, CTA
- right: cropped editor workflow preview with 2-3 annotations

### Headline direction

Examples of the intended shape:

- Build a resume in a focused workspace
- Edit, preview, and export with confidence

### Proof blocks

Only keep the essentials:

- Real-time preview
- Local-first privacy
- Clean template output

### Brand integration

- top-right or footer utility link to `ctikki.com`
- light text label: `Maintained by CT程序定制工作室`

### Must differ from original

- no serif-led hero
- no glowing background blobs
- no centered "showcase screenshot on pedestal" composition
- no GitHub star pill in the main header

### 8.2 Resume Editor Workbench

### Objective

Make the workbench feel like a serious document tool.

### New structure

- fixed top application bar
- left rail with sections and style controls
- central editor panel
- right preview panel

### Top bar contents

- product label
- resume name
- save status
- template switcher
- export/share
- settings/profile access

### Left rail

Two switchable modes:

- Content
- Style

This is clearer than mixing every control in a single side stack.

### Center edit zone

- section-level forms
- block editing
- inline AI assist where relevant
- stronger field grouping

### Right preview

- realistic A4 preview
- zoom controls
- page-fit mode
- print/export compatibility hints

### Interaction updates

- replace the current decorative floating dock with an anchored, explicit toolbar model
- preserve quick actions, but integrate them into the workspace shell

### Visual language

- more structured panels
- less ornament
- stronger use of borders and grid alignment

### 8.3 Template Selection Page

### Objective

Help users choose by suitability, not just appearance.

### New structure

- page heading and explanation
- filter row
- template matrix
- detail drawer or side panel

### Template card content

Each card should show:

- template name
- one-line positioning
- live mini preview
- tags such as `ATS-friendly`, `balanced`, `compact`, `formal`

### Template detail panel

- larger preview
- ideal use cases
- density notes
- recommended industries
- use this template CTA

### Must differ from original

- less poster-like card styling
- less glossy hover treatment
- less "gallery of beautiful objects," more "choosing a professional output format"

### 8.4 Export / Share Page

### Objective

Turn export into a trustworthy completion step.

### New structure

- export summary card
- output options
- paper settings
- compatibility notes
- backup/share options

### Export options

- Export PDF
- Browser print
- Export JSON backup
- Optional future share link capability if product scope expands

### UX emphasis

- explain differences between export methods clearly
- show failure recovery options
- present last export state or status

### Brand role

Minimal brand mention only in the about/help area

### 8.5 User Profile / Settings

### Objective

Reframe settings as workspace preferences rather than a miscellaneous bucket.

### New information architecture

- General
- Resume defaults
- AI providers
- Backup and sync
- Export preferences
- About this version

### About panel

This is where CT branding belongs most naturally:

- `CT 简历工作台`
- `由 CT程序定制工作室维护`
- official link: `https://ctikki.com`

### Visual treatment

- quieter than the homepage
- settings read like system controls
- remove decorative cards that imply a marketing surface

## 9. Component Design Language

### 9.1 Buttons

- primary button: solid CT blue
- secondary button: white surface with border
- tertiary button: text or subtle ghost
- danger button: clear semantic red treatment
- avoid plush/editorial oversized CTA look outside homepage

### 9.2 Cards

- square-leaning, structured, border-led
- minimal hover lift
- content first, texture second

### 9.3 Inputs

- 44px minimum height
- clear labels always visible
- helper text below field
- strong focus outline in blue

### 9.4 Badges and chips

- semantic use only
- no decorative "cute badge" usage for atmosphere

### 9.5 Navigation

- top nav is utility-driven
- side nav is structural
- avoid mixing marketing nav with application nav

## 10. Differentiation and Brand Safety Rules

The redesign must clearly separate itself from the source project's identity.

### Hard rules

- do not reuse the original product name
- do not keep the original logo or close derivatives
- do not preserve the original homepage composition
- do not retain the original warm/editorial color story
- do not keep the GitHub star CTA as a key header element
- do not preserve the same combination of serif hero typography, glow décor, rounded boutique cards, and floating action presentation
- do not reuse the original personal-expression style copy

### Safe borrowing

The following are acceptable because they are product patterns, not identity:

- split-pane editor plus preview
- local-first storage concept
- template browsing flow
- export and backup utility structure
- polished animation quality

### Why this matters

The risk is not only direct copying of assets. The bigger problem is recognizability through the combined effect of layout, tone, typography, CTA structure, and visual atmosphere. The new design must break that combined signature.

## 11. Migration Guidance

Implementation should separate product-shell redesign from resume-template redesign.

Recommended sequence:

1. Replace brand assets, metadata, and global application tokens
2. Redesign homepage shell and navigation
3. Redesign application shell and workbench chrome
4. Redesign template selection and export flows
5. Rework settings IA and about surfaces
6. Revisit resume templates only after the shell language is stable

This avoids superficial re-skinning and keeps the product language coherent.

## 12. Acceptance Criteria

The redesign is successful when:

- a user would not mistake the new product for a lightly re-skinned Magic Resume
- CT程序定制工作室 feels naturally integrated without over-branding
- the product still feels refined and complete
- the homepage reads as a tool entry point, not a creator showcase
- the editor feels more reliable and structured than expressive
- the visual system is original enough to avoid obvious brand confusion

## 13. Summary

The new product should become a restrained, high-confidence workspace for resume creation. Its competitive edge is not flamboyance. It is trust, clarity, polish, and output quality. The redesign should preserve the source project's product intelligence while fully replacing its identity layer with a CT程序定制工作室-owned design language.
