/**
 * User type definition
 * @typedef  {Array.<Object>} resources
 * @property {string} name: The reference
 * @property {string} loader: The type of loader needed to load the asset excludeing the word 'Loader'
 * @property {string} path: The path to the asset
 */

export default [
	{
		name: "welcome",
		loader: "Texture",
		path: "welcome.png",
	},
]
