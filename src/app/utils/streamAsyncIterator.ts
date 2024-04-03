export async function* streamAsyncIterator(
  stream: ReadableStream<Uint8Array> | null
): AsyncGenerator<Uint8Array> {
  if (!stream) return;

  // Get a lock on the stream
  const reader = stream.getReader();

  try {
    while (true) {
      // Read from the stream
      const { done, value } = await reader.read();
      // Exit if we're done
      if (done) return;
      // Else yield the chunk
      yield value ? value : new Uint8Array();
    }
  } finally {
    reader.releaseLock();
  }
}
