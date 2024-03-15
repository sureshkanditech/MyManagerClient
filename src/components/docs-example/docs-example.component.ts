import { Component, Input } from '@angular/core';

import packageJson from '../../../package.json';

@Component({
  selector: 'app-docs-example',
  templateUrl: './docs-example.component.html',
  styleUrls: ['./docs-example.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsExampleComponent {
  constructor() {}

  @Input() fragment?: string;

  private _href = '';

  get href(): string {
    return this._href;
  }

  @Input()
  set href(value: string) {
    const version = packageJson?.config?.coreui_library_short_version;
    const docsUrl = packageJson?.config?.coreui_library_docs_url ?? '';
    // const path: string = version ? `${version}/#/${value}` : '#';
    // const path: string = version ? `${version}/${value}` : '';
    this._href = `${docsUrl}${value}`;
  }
}
