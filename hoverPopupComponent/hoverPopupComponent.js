import { Helpers } from "../../Helpers/helpers.js";
import { selectors } from "./selectors.js";


export class HoverPopupComponent {
	config = {
		rootRef: null,
		text: '-',
		maxWidth: '400px',
		horizontalMirror: false,
		verticalMirror: false
	}

	constructor(config) {
		if (!config.rootRef) {
			console.error('Потрібно передат елемент')
			return
		}
		this.config = { ...this.config, ...config }
		this._initCss()
		this._renderComponent()
	}

	_initCss() {
		const collection = [
			{ href: "/Modules/Components/hoverPopupComponent/main.css" }
		]
		const cssFiles = document.querySelectorAll(`.${selectors.cssFile}`)
		if (cssFiles.length === collection.length) {
			return
		}
		if (cssFiles.length > 1) {
			cssFiles.forEach(el => { el.remove() })
		}
		collection.forEach(el => {
			const link = document.createElement('link');
			link.href = el.href;
			link.rel = "stylesheet";
			link.classList.add(selectors.cssFile)
			document.head.appendChild(link);
		})
	}

	_renderComponent() {
		const popup = Helpers.createElement("div", { class: selectors.popup, textContent: this.config.text })
		popup.style.maxWidth = this.config.maxWidth

		this.config.rootRef.addEventListener("mouseenter", () => {
			popup.style.display = "block";
		});
		this.config.rootRef.addEventListener("mouseleave", () => {
			popup.style.display = "none";
		});
		this.config.rootRef.addEventListener("mousemove", (e) => {
			const x = e.clientX;
			const y = e.clientY;

			if (this.config.horizontalMirror) {
				popup.style.left = x - popup.clientWidth + "px";
			} else {
				popup.style.left = x + "px";
			}

			if (this.config.verticalMirror) {
				popup.style.top = y - popup.clientHeight + "px";
			} else {
				popup.style.top = y + "px";
			}

		});

		this.config.rootRef.appendChild(popup)
	}

	destroy() {
		document.querySelectorAll(`.${selectors.cssFile}`).forEach(el => { el.remove() })
	}
}