/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as React from "react";

interface NoteEditorProps extends React.AllHTMLAttributes<HTMLTextAreaElement> {
  onEnter: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = (props) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      props.onEnter();
    }
  };

  return (
    <div className="note editor">
      <textarea
        className="note-text"
        onKeyDown={onKeyDown}
        onChange={props.onChange}
        value={props.value}
        onFocus={props.onFocus}
      />
    </div>
  );
};
