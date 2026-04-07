export const getThemeConfig = () => ({
  bg: "bg-[#F4F7FA] dark:bg-[#0B1220]",
  sidebar: "bg-white dark:bg-[#121A27]",
  text: "text-[#0F1720] dark:text-[#E6ECF3]",
  textSecondary: "text-[#5F6B7A] dark:text-[#AAB6C5]",
  border: "border-[#D9E1EA] dark:border-[#263346]",
  card: "bg-white dark:bg-[#121A27]",
  hover: "hover:bg-[#EEF3F8] dark:hover:bg-[#182232]",
  input: "bg-white border-[#D9E1EA] dark:bg-[#121A27] dark:border-[#263346]",
  button: "bg-white dark:bg-[#121A27]",
  buttonPrimary: "bg-[#2457F5] text-white dark:bg-[#5B82FF] dark:text-[#0B1220]",
  preview: "bg-white dark:bg-[#0F1520]"
});

export type ThemeConfig = ReturnType<typeof getThemeConfig>;
