export type AiPlatform = "chatgpt" | "claude" | "gemini";

const PLATFORM_SOURCES: Record<AiPlatform, string> = {
  chatgpt: "chatgpt",
  claude: "claude",
  gemini: "gemini",
};

/**
 * Demo teklif linkine platforma özel UTM parametreleri ekler.
 * utm_source = chatgpt | claude | gemini
 */
export function withOfferUtm(
  baseUrl: string,
  platform: AiPlatform,
  offerId: string
): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", PLATFORM_SOURCES[platform]);
  url.searchParams.set("utm_medium", "mcp");
  url.searchParams.set("utm_campaign", "teklif-mcp-demo");
  url.searchParams.set("utm_content", offerId);
  return url.toString();
}
