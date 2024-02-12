import { selectors } from "./selectors.js";


export class HoverPopup {
	config = {
		rootRef: null,
		text: '-',
		maxWidth: '400px',
		horizontalMirror: false,
		verticalMirror: false,
		autoPosition: false
	}

	constructor(config) {
		if (!config.rootRef) {
			console.error('Потрібно передат елемент');
			return;
		}
		this.config = { ...this.config, ...config };
		this._initCss();
		this._renderComponent();
	}

	_initCss() {
		const collection = [
			{ href: "/Modules/Components/hoverPopup/main.css" }
		];

		const cssFiles = document.querySelectorAll(`.${selectors.cssFile}`);

		if (cssFiles.length === collection.length) {
			return;
		}

		if (cssFiles.length > 1) {
			cssFiles.forEach(el => { el.remove() });
		}

		collection.forEach(el => {
			const link = document.createElement('link');
			link.href = el.href;
			link.rel = "stylesheet";
			link.classList.add(selectors.cssFile);
			document.head.appendChild(link);
		});
	}

	_renderComponent() {
		const { horizontalMirror, verticalMirror, autoPosition } = this.config;

		const popup = this._createElement("div", { className: selectors.popup, textContent: this.config.text });
		popup.style.maxWidth = this.config.maxWidth;

		this.config.rootRef.addEventListener("mouseenter", () => {
			popup.style.display = "block";
		});
		this.config.rootRef.addEventListener("mouseleave", () => {
			popup.style.display = "none";
		});
		this.config.rootRef.addEventListener("mousemove", (e) => {
			const x = e.clientX;
			const y = e.clientY;
			const halfViewportWidth = autoPosition ? window.innerWidth / 2 : 0;
			const halfViewportHeight = autoPosition ? window.innerHeight / 2 : 0;

			let leftPosition, topPosition;

			if (autoPosition) {
				leftPosition = x > halfViewportWidth || horizontalMirror ? x - popup.clientWidth : x;
				topPosition = y > halfViewportHeight || verticalMirror ? y - popup.clientHeight : y;
			} else {
				leftPosition = horizontalMirror ? x - popup.clientWidth : x;
				topPosition = verticalMirror ? y - popup.clientHeight : y;
			}

			popup.style.left = leftPosition + "px";
			popup.style.top = topPosition + "px";

		});

		this.config.rootRef.appendChild(popup);
	}

	_createElement(tag, props, ...children) {
		const element = document.createElement(tag);

		Object.keys(props).forEach(key => element[key] = props[key]);

		if (children.length > 0) {
			children.forEach(child => {
				element.appendChild(child);
			});
		}

		return element;
	}

	destroy() {
		document.querySelectorAll(`.${selectors.cssFile}`).forEach(el => { el.remove() });
	}
}