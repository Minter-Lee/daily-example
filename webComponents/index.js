class FeedHead extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' }),
			tplEl = document.getElementById('feed-head'),
			content = tplEl.content.cloneNode(true);

		shadow.appendChild(content);
	}
	connectedCallback() {
		console.info('connectedCallback');
	}
	disconnectedCallback() {
		console.info(disconnectedCallback);
	}
	adoptedCallback() {
		console.info('adoptedCallback');
	}
	attributeChangedCallback(name, oldValue, newValue) {
		console.info('name', name);
		console.info('oldValue', oldValue);
		console.info('newValue', newValue);
	}
}

window.customElements.define('feed-head', FeedHead);
