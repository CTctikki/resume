import { describe, expect, it } from "vitest";
import {
  getTemplateBrowserCopy,
  templateMetadata,
} from "@/config/templateMetadata";
import {
  resolveTemplatesBrowserSelection,
} from "@/components/templates/TemplatesBrowser";

describe("TemplatesBrowser", () => {
  it("resolves the metadata drawer content for the default template", () => {
    const browserCopy = getTemplateBrowserCopy("en");
    const selection = resolveTemplatesBrowserSelection(
      templateMetadata.en,
      "classic"
    );

    expect(selection.selectedTemplate?.id).toBe("classic");
    expect(selection.selectedTemplateKey).toBe("classic");
    expect(selection.selectedTemplateMetadata?.tags).toEqual([
      "ATS-friendly",
      "formal",
      "balanced",
    ]);
    expect(browserCopy.drawerTitle).toBe("Template fit");
    expect(browserCopy.atsFriendlyLabel).toBe("ATS-friendly");
    expect(browserCopy.designForwardLabel).toBe("More design-forward");
  });
});
