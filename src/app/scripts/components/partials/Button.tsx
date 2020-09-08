/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as React from "react";

interface ButtonProps extends React.AllHTMLAttributes<HTMLButtonElement> { }

export const Button: React.FC<ButtonProps> = (props) => (
  <button className="button" disabled={props.disabled} onClick={props.onClick}>
    {props.children}
  </button>
);
