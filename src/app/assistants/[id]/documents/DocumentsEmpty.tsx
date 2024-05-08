import { HiCloudUpload } from 'react-icons/hi';
import React, { useState } from 'react';

export default function DocumentsEmpty() {
  return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
        <label htmlFor="dropzone-file" className="flex flex-col gap-6">
          <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <div
              className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-200 rounded-lg p-12 dark:border-gray-800">
              <HiCloudUpload className="text-9xl text-gray-400 dark:text-gray-700" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click to upload or drag and drop
              </p>
              <input id="dropzone-file" type="file" className="hidden" />
            </div>
          </div>
        </label>
      </div>
  );
}


