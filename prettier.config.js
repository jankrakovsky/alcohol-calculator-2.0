/**
 * Prettier configuration
 * @type {import('prettier').Config}
 */
module.exports = {
	singleQuote: true,
	trailingComma: 'all',
	arrowParens: 'always',
	useTabs: true,
	bracketSpacing: true,
	semi: true,
	printWidth: 150,
	tabWidth: 4,
	plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
	importOrder: [
		'^(react/(.*)$)|^(react$)',
		'^(next/(.*)$)|^(next$)',
		'<THIRD_PARTY_MODULES>',
		'',
		'^types$',
		'^$(.*)$',
		'^@lib/(.*)$',
		'^@features/(.*)$',
		'',
		'^[./]',
	],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
	importOrderBuiltinModulesToTop: true,
	importOrderMergeDuplicateImports: true,
	importOrderCombineTypeAndValueImports: true,
};
