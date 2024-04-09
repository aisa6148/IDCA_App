import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, ClickAwayListener, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import clsx from 'clsx';
// import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
	selectDropDown: {
		borderBottom: 'none',
		fontSize: '14px',
		fontWeight: 'bold',
		color: '#9497ac',
		top: -3,
		'&::before': {
			borderBottom: 'none',
		},
		'&::after': {
			borderBottom: 'none',
		},
		'&:hover': {
			'&::before': {
				borderBottom: 'none',
			},
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
		top: 33,
		left: 24,
		width: 'calc(100% - 24px)',
		zIndex: 2,
	},
	option: {
		padding: '5px 0px 5px 15px',
		'&:hover': {
			backgroundColor: 'rgba(6, 150, 248, 0.15);',
		},
	},
	optionActive: {
		backgroundColor: 'rgba(175, 176, 202, 0.15)',
	},
	searchIcon: {
		position: 'relative',
		// top: 21,
		right: -25,
		color: '#9497ac',
	},
	container: {
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		paddingLeft: 34,
	},
	outerContainer: {
		position: 'relative',
		margin: '12px 0px',
	},
	textField: {
		margin: 0,
	},
});

const SingleDropDown = props => {
	const [matchOptions, setMatchOptions] = useState(props.options);
	const [searchTag, setSearchTag] = useState('');
	const [activeSuggestion, setActiveSuggestion] = useState(0);
	const [activeElement, setActiveElement] = useState(undefined);
	const [showOptions, setShowOptions] = useState(false);
	const classes = useStyles();
	useEffect(
		() => {
			const newOptions = props.options.filter(term =>
				term
					.replace(/[ -']/g, '')
					.toLocaleLowerCase()
					.includes(searchTag.replace(/[ -']/g, '').toLocaleLowerCase()),
			);
			setMatchOptions(newOptions);
			if (props.onChange) {
				props.onChange(searchTag);
			}
		},
		[searchTag],
	);
	useEffect(
		() => {
			if (activeElement) {
				activeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		},
		[activeElement],
	);
	const onKeyDown = e => {
		// User pressed the enter key
		if (e.keyCode === 13) {
			if (matchOptions[activeSuggestion]) {
				setSearchTag(matchOptions[activeSuggestion]);
			}
		}
		// User pressed the up arrow
		if (e.keyCode === 38) {
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
		<div>
			<ClickAwayListener onClickAway={() => setShowOptions(false)}>
				<div className={clsx(classes.outerContainer, props.className)}>
					<div className={classes.container}>
						<SearchIcon className={classes.searchIcon} />
						<TextField
							id="standard-basic"
							className={classes.textField}
							margin="normal"
							fullWidth
							InputProps={{ className: classes.input, autoComplete: 'off' }}
							onKeyDown={onKeyDown}
							onChange={e => setSearchTag(e.target.value)}
							value={searchTag}
							onFocus={() => setShowOptions(true)}
							placeholder={props.placeholder}
						/>
					</div>
					{showOptions && matchOptions.length > 0 && (
						<Paper className={classes.options}>
							{matchOptions.map((option, i) => (
								<div
									key={option}
									onClick={() => setSearchTag(option)}
									className={clsx(classes.option, {
										[classes.optionActive]: i === activeSuggestion,
									})}
									ref={ref =>
										i === activeSuggestion ? setActiveElement(ref) : null
									}
								>
									{option}
								</div>
							))}
						</Paper>
					)}
				</div>
			</ClickAwayListener>
		</div>
	);
};

export default SingleDropDown;
