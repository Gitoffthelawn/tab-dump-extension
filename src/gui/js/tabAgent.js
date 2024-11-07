const tabAgent = {
	lastTabs: [],

	async getTabs() {

		let tabs = await browser.runtime.sendMessage({action: "getTabs"});

		//save current tabs for later use (i.e printTabs())
		this.lastTabs = tabs;
		
		return this.lastTabs;
		
	},

	async getCurrentTab() {
		
		let tab = await browser.runtime.sendMessage({action: "getCurrentTab"});

		//update lastTabs with current fetch
		this.lastTabs = tab;

		return this.lastTabs;
	},

	getLastTabs() {
		return this.lastTabs;
	},

	async setTabs(source) {
		//check if current list/text does match with previous get, if so do not execute
		//otherwise it will be possible to repeatedly open the same set of tabs, get print list of tabs that is possible to open	
		if (!source.hasChanged()) {
			return;
		}

		const text = source.value;
		const urls = textUtils.textToUrls(text);

		let action = await browser.runtime.sendMessage({action: "setTabs", param: urls});
		return action;
	},

	async overwriteTabs(source) {
		//check if current list/text does match with previous get, if so do not execute
		//otherwise it will be possible to repeatedly open the same set of tabs, get print list of tabs that is possible to open	
		if (!source.hasChanged()) {
			return;
		}

		const text = source.value;
		const urls = textUtils.textToUrls(text);

		let action = await browser.runtime.sendMessage({action: "overwriteTabs", param: urls});
		return action;
	}

}