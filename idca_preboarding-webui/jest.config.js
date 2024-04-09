module.exports = {
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	moduleNameMapper: {
		'^react-dnd$': 'react-dnd/dist/cjs',
		'^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
		'^dnd-core$': 'dnd-core/dist/cjs',
	},
};
