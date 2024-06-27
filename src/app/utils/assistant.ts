import { Assistant } from '@/app/types/assistant';
import { getStyleHash } from '@/app/utils/hash';

export function getPrimaryColor(assistant: Assistant) {
  if (assistant.theme && assistant.theme.primaryColor) {
    return assistant.theme.primaryColor;
  }

  return getStyleHash(assistant.id).primaryColor;
}

export function getSecondaryColor(assistant: Assistant) {
  if (assistant.theme && assistant.theme.secondaryColor) {
    return assistant.theme.secondaryColor;
  }

  return getStyleHash(assistant.id).secondaryColor;
}

function hexToRgbA(hex: string, opacity: number = 1) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    // @ts-ignore
    return (
      'rgba(' +
      // @ts-ignore
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      ',' +
      opacity +
      ')'
    );
  }
  throw new Error('Bad Hex');
}

export function getPrimaryBackgroundColor(assistant: Assistant) {
  if (assistant.theme && assistant.theme.primaryColor) {
    return hexToRgbA(assistant.theme.primaryColor, 0.5);
  }

  return hexToRgbA(
    getStyleHash(assistant.id)
      .primaryColor.replace('bg-[', '')
      .replace(']', ''),
    0.7
  );
}

export function getPrimaryTextColor(assistant: Assistant) {
  if (assistant.theme && assistant.theme.primaryTextColor) {
    return assistant.theme.primaryTextColor;
  }

  return getStyleHash(assistant.id)
    .primaryTextColor.replace('text-[', '')
    .replace(']', '');
}

export function getSecondaryTextColor(assistant: Assistant) {
  if (assistant.theme && assistant.theme.secondaryTextColor) {
    return assistant.theme.secondaryTextColor;
  }

  return getStyleHash(assistant.id)
    .secondaryTextColor.replace('text-[', '')
    .replace(']', '');
}

export function getInitialPrompt(assistant: Assistant) {
  if (assistant.theme && assistant.theme.initialPrompt) {
    return assistant.theme.initialPrompt;
  }

  return 'Hello, I am your assistant. How can I help you?';
}

export function getInputMessageLabel(assistant: Assistant) {
  if (assistant.theme && assistant.theme.messageLabel) {
    return assistant.theme.messageLabel;
  }

  return 'Your message...';
}

export function getInitialConversationStarter(assistant: Assistant) {
  if (assistant.theme && assistant.theme.conversationStarters) {
    return assistant.theme.conversationStarters;
  }

  return [];
}
