export default function parseEventsFromChunk(
  chunk: string,
  buffer: string
): [any[], string] {
  let events: any[] = [];
  buffer += chunk; // Add the new chunk to the existing buffer

  let depth = 0; // Depth of nested JSON objects/arrays
  let start = 0; // Start index of the current JSON object in the buffer

  for (let i = 0; i < buffer.length; i++) {
    const char = buffer[i];

    if (char === '{') depth++;
    if (char === '}') depth--;

    if (depth === 0 && char === '}') {
      // Found a complete JSON object
      const jsonStr = buffer.substring(start, i + 1);
      try {
        //console.log(jsonStr);
        const jsonObj = JSON.parse(jsonStr); // Attempt to parse the JSON
        events.push(jsonObj); // Add the parsed JSON object to the events array
        start = i + 1; // Move the start index to the character after the current JSON object
      } catch (e) {
        console.error('Error parsing JSON:', e);
        // If parsing fails, the JSON might be incomplete or malformed
      }
    }
  }

  buffer = buffer.substring(start); // Keep any incomplete JSON in the buffer for the next call

  return [events, buffer];
}
