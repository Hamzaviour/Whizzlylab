export const COMPANY_EMAIL = "whizzlylab@gmail.com";
export const WHATSAPP_NUMBER = "923097404009";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
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
