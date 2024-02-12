const selectors = {
	cssFile: "bb-styles",
	button: "back-button",
	buttonBlack: "back-button--black",
	buttonBlue: "back-button--blue",
	buttonOrange: "back-button--orange"
}

export class BackButton {
	config = {
		rootRef: null,
		context: null,
		title: 'Назад',
		style: 'blue',
		dashboardCode: '',
		queryParams: {}
	}

	// styles = {
	// 	black: { imgName: 'left-arrow-black', class: selectors.buttonBlack },
	// 	blue: { imgName: 'left-arrow-blue', class: selectors.buttonBlue },
	// 	orange: { imgName: 'left-arrow-orange', class: selectors.buttonOrange }
	// }

	constructor(config) {
		if (!config.rootRef || !config.context) {
			console.error('Потрібно передат елемент і контекст');
			return;
		}
		this.config = { ...this.config, ...config };
		this._initCss();
		this._renderComponent();
		this._handleClick();
	}

	_initCss() {
		const collection = [
			{ href: "./main.css" }
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
		this.button = this._createElement('button', { class: selectors.button, type: 'button', textContent: this.config.title });
		this.button.classList.add(this.styles[this.config.style].class, selectors.button);

		// const img = this._createElement('img', { src: `/Modules/Res/Components/backButton/${this.styles[this.config.style].imgName ?? 'left-arrow-orange'}.svg`, alt: "left arrow" });

		// this.button.prepend(img);

		this.config.rootRef.appendChild(this.button);
	}

	_handleClick() {
		this.button.addEventListener('click', () => {
			this.config.context.goToDashboard(this.config.dashboardCode, {
				queryParams: this.config.queryParams
			});
		});
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