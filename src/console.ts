/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as js from './javascript';
import * as util from 'util';

export type ConsoleMessageLocation = {
  url?: string,
  lineNumber?: number,
  columnNumber?: number,
};

export class ConsoleMessage {
  private _type: string;
  private _text?: string;
  private _args: js.JSHandle[];
  private _location: ConsoleMessageLocation;

  constructor(type: string, text: string | undefined, args: js.JSHandle[], location?: ConsoleMessageLocation) {
    this._type = type;
    this._text = text;
    this._args = args;
    this._location = location || {};
  }

  type(): string {
    return this._type;
  }

  text(): string {
    if (this._text === undefined)
      this._text = this._args.map(arg => arg._value).join(' ');
    return this._text;
  }

  args(): js.JSHandle[] {
    return this._args;
  }

  location(): ConsoleMessageLocation {
    return this._location;
  }

  [util.inspect.custom]() {
    return this.text();
  }
}
