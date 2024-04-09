import React, { useState, useEffect } from 'react';
import {
	makeStyles,
	TextField,
	ClickAwayListener,
	List,
	ListItem,
	ListItemText,
	Paper,
	Grid,
	InputAdornment,
} from '@material-ui/core';
import { Close, Search as SearchIcon } from '@material-ui/icons';
import clsx from 'clsx';
// import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
	multiDropdownMainContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	container: {
		display: 'flex',
		flex: '1 1 auto',
		maxHeight: 630,
		overflowY: 'hidden',
	},
	multiDropdownMainContainerSingleLine: {
		flexDirection: 'row',
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	selectDropDown: {
		borderBottom: 'none',
		fontSize: '14px',
		fontWeight: 'bold',
		color: '#9497ac',
		top: -3,
		'&::before': {
			borderBottom: 'none',
			'&:hover': {
				borderBottom: 'none',
				'&:before': {
					borderBottom: 'none',
				},
			},
		},
		'&::after': {
			borderBottom: 'none',
		},
	},
	dropDownIcon: {
		color: '#041f41',
	},
	tagClass: {
		borderRadius: '6px',
		backgroundColor: 'rgba(175, 176, 202, 0.15)',
		padding: '6px 18px 6px 16px',
		margin: '2px 5px',
		alignItems: 'center',
		display: 'inline-flex',
	},
	options: {
		maxHeight: 150,
		overflowY: 'scroll',
		position: 'absolute',
		top: 72,
		width: '100%',
		zIndex: '1',
		backgroundColor: 'white',
	},
	option: {
		cursor: 'pointer',
		padding: '5px 0px 5px 15px',
		'&:hover': {
			backgroundColor: 'rgba(6, 150, 248, 0.15);',
		},
	},
	optionActive: {
		backgroundColor: 'rgba(175, 176, 202, 0.15)',
	},
	outerRelative: {
		position: 'relative',
	},
	headingStyle: {
		padding: '12px 0 0 10px',
		color: '#041f41',
		fontWeight: 'bold',
		fontSize: '16px',
	},
	contentVerySmallBold: {
		...theme.custom.contentVerySmallBold,
	},
}));

const MultiDropDown = props => {
	const [matchOptions, setMatchOptions] = useState(props.options);
	const [searchTag, setSearchTag] = useState('');
	const [activeSuggestion, setActiveSuggestion] = useState(0);
	const [activeElement, setActiveElement] = useState(undefined);
	const [showOptions, setShowOptions] = useState(false);
	const [tags, setTags] = useState(Array.isArray(props.value) ? props.value : []);
	const classes = useStyles();

	const getKey = t => {
		if (props.options.key) {
			return props.options.key(t);
		}
		if (props.options.value) {
			return props.options.value(t);
		}
		return t;
	};
	const getValue = t => {
		return props.options.value ? props.options.value(t) : t;
	};
	const includes = (arr, element) => {
		if (props.options.value) {
			return arr.findIndex(a => getKey(element) === getKey(a)) !== -1;
		}
		return arr.includes(element);
	};

	useEffect(
		() => {
			if (props.initialData) {
				setTags(props.initialData);
			} else {
				setTags([]);
			}
		},
		[props.initialData],
	);

	useEffect(
		() => {
			const data = props.options.data || props.options;
			let newOptions = data.filter(term =>
				getValue(term)
					.replace(/[ -']/g, '')
					.toLocaleLowerCase()
					.includes(searchTag.replace(/[ -']/g, '').toLocaleLowerCase()),
			);
			newOptions = newOptions.filter(option => !includes(tags, option));
			setMatchOptions(newOptions);
		},
		[searchTag, props.options, tags],
	);
	useEffect(
		() => {
			if (activeElement) {
				activeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		},
		[activeElement],
	);

	const addTag = tag => {
		if (!includes(tags, tag)) {
			const newTags = Array.from(tags);
			newTags.push(tag);
			setTags(newTags);
			props.onChange(newTags);
		}
		setSearchTag('');
		setActiveSuggestion(0);
	};
	const removeTag = tag => {
		let newTags;
		if (props.options.value) {
			const k = getKey(tag);
			newTags = tags.filter(t => getKey(t) !== k);
		} else {
			newTags = tags.filter(t => t.localeCompare(tag) !== 0);
		}
		setTags(newTags);
		props.onChange(newTags);
		setSearchTag('');
		setActiveSuggestion(0);
	};

	const onKeyDown = e => {
		// User pressed the enter key
		if (e.keyCode === 13) {
			if (searchTag) {
				addTag(searchTag);
			} else if (matchOptions[activeSuggestion]) {
				addTag(matchOptions[activeSuggestion]);
			}
		} else if (e.keyCode === 38) {
			// User pressed the up arrow
			if (activeSuggestion !== 0) {
				setActiveSuggestion((activeSuggestion - 1) % matchOptions.length);
			} else if (matchOptions.length > 0) {
				setActiveSuggestion(matchOptions.length - 1);
			}
		} else if (e.keyCode === 40) {
			// User pressed the down arrow
			setActiveSuggestion((activeSuggestion + 1) % matchOptions.length);
		}
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={4} md={4} sm={12} className={clsx(props.gridItemStyle)}>
					<div
						className={clsx(
							classes.multiDropdownMainContainer,
							props.singleLineView && classes.multiDropdownMainContainerSingleLine,
						)}
					>
						<ClickAwayListener onClickAway={() => setShowOptions(false)}>
							<div className={clsx(classes.outerRelative, props.outerRelativeStyle)}>
								<TextField
									id="standard-basic"
									className={`${classes.textField} ${props.className}`}
									margin="normal"
									fullWidth
									onKeyDown={onKeyDown}
									onChange={e => setSearchTag(e.target.value)}
									value={searchTag}
									onFocus={() => setShowOptions(true)}
									placeholder={props.placeholder}
									InputProps={{
										autoComplete: 'off',
										endAdornment: (
											<InputAdornment position="end">
												<SearchIcon />
											</InputAdornment>
										),
									}}
									variant="outlined"
								/>
								{showOptions && matchOptions.length > 0 && (
									<List
										component="nav"
										aria-label="item-list"
										className={classes.options}
									>
										{matchOptions.map((option, i) => (
											<ListItem
												button
												key={getKey(option)}
												onClick={() => addTag(option)}
												className={clsx(classes.option, {
													[classes.optionActive]: i === activeSuggestion,
												})}
												ref={ref =>
													i === activeSuggestion
														? setActiveElement(ref)
														: null
												}
											>
												<ListItemText primary={getValue(option)} />
											</ListItem>
										))}
									</List>
								)}
							</div>
						</ClickAwayListener>
					</div>
				</Grid>
				<Grid item xs={8} md={8} sm={12}>
					<div>
						{props.showHeading && props.headingContent && (
							<div className={classes.headingStyle}>{props.headingContent}</div>
						)}
						<div>
							{tags.map(tag => (
								<Tag
									className={clsx(classes.tagClass, props.tagClassStyle)}
									remove={() => {
										removeTag(tag);
									}}
									key={getKey(tag)}
								>
									{getValue(tag)}
								</Tag>
							))}
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default MultiDropDown;

const Tag = props => {
	const classes = useStyles();
	return (
		<span className={clsx(classes.contentVerySmallBold, props.className)}>
			{props.children}
			<Close
				onClick={props.remove}
				style={{
					position: 'relative',
					right: -9,
					top: -1,
				}}
			/>
		</span>
	);
};
