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
