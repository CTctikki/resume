import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { NextIntlClientProvider } from "@/i18n/compat/client";
import { Providers } from "@/app/providers";
import enMessages from "@/i18n/locales/en.json";
import zhMessages from "@/i18n/locales/zh.json";

export function renderWithProviders(
  ui: ReactElement,
  locale: "en" | "zh" = "en"
) {
  const messages = locale === "en" ? enMessages : zhMessages;

  return render(
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Shanghai">
      <Providers>{ui}</Providers>
    </NextIntlClientProvider>
  );
}
