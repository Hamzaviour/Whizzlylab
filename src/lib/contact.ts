export const COMPANY_EMAIL = "whizzlylab@gmail.com";
export const COMPANY_PHONE = "+1 (424) 451-0714";
export const COMPANY_PHONE_RAW = "+14244510714";
export const PHONE_URL = `tel:${COMPANY_PHONE_RAW}`;
export const WHATSAPP_NUMBER = "14244510714";
export const WHATSAPP_URL = PHONE_URL;
export const LINKEDIN_URL = "https://www.linkedin.com/company/whizzly-lab";
export const INSTAGRAM_URL = "https://www.instagram.com/whizzlylab/";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61592686831558";
export const GITHUB_URL = "https://github.com/Hamzaviour/whizzlylab";
export const WEB3FORMS_KEY = "069cf7c6-8dd2-4689-8adb-d428909f12b7";

export async function submitWeb3Form(payload: Record<string, string>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      from_name: "Whizzly Lab Website",
      ...payload,
    }),
  });
  const data = (await res.json()) as { success?: boolean; message?: string };
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Form submission failed");
  }
  return data;
}
