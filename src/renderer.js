/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {renderScene} from './there-scene.js'
import { LitElement, html } from 'lit-element';
// import {loadFonts} from './loadFont.js';

export class StartLitElement extends LitElement {
  
  /**
   * Define properties. Properties defined here will be automatically 
   * observed.
   */
  static get properties() {
    return {
      spSculptureId: { type: String },
    };
  }

  /**  
   * In the element constructor, assign default property values.
   */
  constructor() {
    // Must call superconstructor first.
    super();
    this.spSculptureId = '';
    // Initialize properties

  }

  /**
   * Define a template for the new element by implementing LitElement's
   * `render` function. `render` must return a lit-html TemplateResult.
   */
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }

        canvas {
          height: 100vh;
        }
      </style>
      
      <div id="container" style="height: 100vh"></div>
    `;
  }

  /**
   * Implement firstUpdated to perform one-time work on first update:
   * - Call a method to load the lazy element if necessary
   * - Focus the checkbox
   */
  firstUpdated() {
    console.log('spSculptureId', this.spSculptureId);
    const canvasEl = this.shadowRoot.getElementById('container');
    if (this.spSculptureId) {
      console.log('getting SC')
      fetch(`https://shader-park-core.firebaseio.com/sculptures/${this.spSculptureId}.json`)
        .then(res => res.json())
        .then(data => renderScene(canvasEl, data));
    } else {
      renderScene(canvasEl);
    }
  }

  

}

// Register the element with the browser
customElements.define('las-renderer', StartLitElement);
