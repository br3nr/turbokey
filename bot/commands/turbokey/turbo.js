const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('turbo')
		.setDescription('Replies with the TurboKey URL.'),
	async execute(interaction) {
		await interaction.reply('http://localhost:3000/login');
	},
};