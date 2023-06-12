import { App, Notice, Plugin, PluginSettingTab, Setting, requestUrl } from "obsidian";

const FILE_LOCATION = `.obsidian/snippets/style-importer.css`
let lastUpdated = new Date();

function formatDate(date: Date) {
	return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).replace(',', '');
}

interface Settings {
	styleUrl: string;
	updateOnLoad: boolean;
}

const DEFAULT_SETTINGS: Settings = {
	styleUrl: '',
	updateOnLoad: true
}

export default class StyleImport extends Plugin {
	settings: Settings;

	// Primary functionality
	async runStyleImport() {
		if (this.settings.styleUrl) {
			let content;

			// Get the latest version of the style file
			try {
				content = await requestUrl(this.settings.styleUrl)
			} catch (err) {
				new Notice(`Style Import: Failed to fetch style file "${this.settings.styleUrl}"`);
				return;
			}

			const text = await content.text;

			// Make sure the snippets folder exists
			try {
				await this.app.vault.createFolder('.obsidian/snippets')
			} catch { /* Snippets folder already exists */ }

			// Write the style-import.css file
			await this.app.vault.adapter.write(FILE_LOCATION, text);
			lastUpdated = new Date();
		}
	}

	async onload() {
		await this.loadSettings();

		if (this.settings.updateOnLoad) {
			await this.runStyleImport();
		}

		this.addSettingTab(new StyleImportSettingTab(this.app, this));
	}

	async onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class StyleImportSettingTab extends PluginSettingTab {
	plugin: StyleImport;

	constructor(app: App, plugin: StyleImport) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Style URL')
			.setDesc('Enter the URL of the CSS file you want to import. Be sure to include http:// or https://. Example: https://example.com/style.css')
			.addText(text => text
				.setPlaceholder('URL')
				.setValue(this.plugin.settings.styleUrl)
				.onChange(async (value) => {
					this.plugin.settings.styleUrl = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Update on load')
			.setDesc('Update the style when the plugin first loads')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.updateOnLoad)
				.onChange(async (value) => {
					this.plugin.settings.updateOnLoad = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Update style')
			.setDesc(`Last updated: ${formatDate(lastUpdated)}`)
			.addButton(button => button
				.setButtonText('Reload')
				.onClick(async () => {
					await this.plugin.runStyleImport();
				}));
	}
}
