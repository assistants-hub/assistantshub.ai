import { createTransport } from 'nodemailer';
import { Theme } from 'next-auth';

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, '&#8203;.');
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  const brandColor = theme.brandColor || '#346df1';
  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  };

  return `
<body style="background: ${color.background}; font-family: Arial, sans-serif; margin: 20px;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 20px;">
        <img src="https://www.assistantshub.ai/logo.png" alt="${escapedHost} Logo" style="width: 100px; margin-bottom: 20px;">
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 10px 0px; font-size: 22px; color: ${color.text};">
        Welcome to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${url}" target="_blank" style="font-size: 18px; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border:${color.buttonBorder} 1px solid; display: inline-block; font-weight: bold;">Sign in Now</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px; font-size: 16px; line-height: 22px; color: ${color.text};">
        If you did not request this sign-in link, please ignore this email or contact support if you have concerns.
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size: 12px; color: #777;">
        Visit our website for more information: <a href="https://assistantsHub.ai" style="text-decoration: none; color: ${brandColor};">assistantshub.ai</a>. Thank you!
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size: 12px; color: #777;">
        <small>&copy; ${currentYear} AssistantsHub.ai</small>
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export async function sendVerificationRequest({
                                                identifier,
                                                url,
                                                provider,
                                                theme,
                                              }: any) {
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
}
