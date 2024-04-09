import React, { useState, useEffect } from 'react';
import {
	makeStyles,
	IconButton,
	Grid,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	OutlinedInput,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { PlayCircleOutline } from '@material-ui/icons';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Layout from '../common/Layout.component';
import NewPageComponents from './NewPageComponents';
import EditComponentContainer from '../../containers/addOnPage/EditComponent.container';
import { PAGE_STATUS } from '../../config/addOnPageConstants';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		paddingLeft: '30%',
	},
	root3: {
		width: '100%',
		[theme.breakpoints.down('md')]: {
			width: '110px',
		},
	},
	root1: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: '50px',
		width: '200px',
	},
	root2: {
		bottom: '5px',
		marginLeft: '5px',
	},
	subtitle: {
		...theme.typography.subtitle1,
		marginTop: '10px',
	},
	gridClass: {
		marginTop: '20px',
	},
	preview: {
		height: '40px',
		width: '100%',
		textTransform: 'none',
	},
	button: {
		...theme.overrides.MuiButton.containedPrimary,
		textTransform: 'none',
		width: 'auto',
	},
	pages: {
		width: '100%',
		margin: '0 140px',
		[theme.breakpoints.down('md')]: {
			margin: '0 0px',
		},
	},
	dialogPaper: {
		height: '250px',
	},
	content: {
		marginTop: theme.spacing(2),
		paddingTop: '10px',
		paddingLeft: '10px',
		minWidth: 120,
	},
	DialogAction: {
		paddingRight: '40%',
	},
	charCounter: {
		marginLeft: '90%',
	},
	amountField: {
		boxSizing: 'border-box',
	},
}));

export default function EditPage(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [pagetitle, setPagetitle] = useState('');
	const [charLimit, setCharLimit] = useState(20);
	const [unPublished, SetUnPublished] = useState(false);
	const { pageName } = props.mappedAddOnPageState;
	const dispatch = useDispatch();
	const [render, setRender] = useState(false);
	const [contentsMenu, setContentsMenu] = useState(false);
	const [request, setRequest] = useState(undefined);

	function handleContentsMenuClose() {
		setContentsMenu(false);
	}

	useEffect(() => {
		if (props.pageID) {
			props.handleApiCall(
				`/api/page/fetch/${encodeURIComponent(props.pageID)}`,
				{ method: 'GET' },
				response => {
					props.initPage({ plan: response.page });
					setRender(true);
				},
				error => {
					console.error(error);
					setRender(false);
				},
			);
		} else {
			props.initPreboardingPage();
			setRender(true);
		}
	}, []);

	const savePage = () => {
		const page = props.mappedAddOnPageState;
		let url = '';
		if (page.status === PAGE_STATUS.EDIT_ACTIVE) {
			url = `/api/page/save-edit/${page.parentPageID}`;
		} else if (page.status === PAGE_STATUS.ACTIVE) {
			url = `/api/page/save-edit/${page.pageID}`;
		} else {
			url = '/api/page/create-page/PREONBOARDING';
		}
		props.handleApiCall(
			url,
			{
				method: 'PUT',
				body: JSON.stringify(page),
				headers: {
					'Content-Type': 'application/json',
				},
			},
			resp => {
				props.updatePageID({
					pageID: resp.pageID,
					parentPageID: resp.parentPageID,
				});
				props.handleApiCall(
					`/api/page/fetch/${encodeURIComponent(resp.pageID)}`,
					{ method: 'GET' },
					response => {
						props.initPage({ plan: response.page });
						setRender(true);
					},
					error => {
						console.error(error);
						setRender(false);
					},
				);
				props.savedPage({ status: resp.pageStatus });
				props.populatePages();
			},
		);
	};

	const publishPage = () => {
		const page = props.mappedAddOnPageState;
		if (window.confirm('Publish Page?')) {
			const url =
				page.status === PAGE_STATUS.EDIT_ACTIVE
					? `/api/pages/publish-edit/${encodeURIComponent(page.parentPageID)}`
					: `/api/pages/publish/${encodeURIComponent(page.pageID)}`;
			setRequest(0);
			props.handleApiCall(
				url,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				},
				response => {
					setRequest(1);
					props.onPublish(page.pageID);
				},
				error => {
					setRequest(-1);
					console.error(error);
				},
			);
		}
	};

	const handleSwitch = () => {
		SetUnPublished(!unPublished);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
		setPagetitle('');
	};

	const handleSaveClick = e => {
		e.preventDefault();
		props.updateHeading(pagetitle);
		setPagetitle('');
		setOpen(false);
	};

	const handleClearText = () => {
		setPagetitle('');
	};

	return (
		<Layout>
			<div position="fixed">
				<Grid container>
					<Grid item xs={12} sm={9} className={classes.gridClass}>
						<span className={classes.root1}>
							<p className={classes.subtitle}>{pageName}</p>
							<IconButton className={classes.root2} onClick={handleClickOpen}>
								<EditOutlinedIcon />
							</IconButton>
							<Dialog
								open={open}
								onClose={handleClose}
								fullWidth={true}
								maxWidth={'xs'}
								classes={{ paper: classes.dialogPaper }}
							>
								<div>
									<DialogTitle>
										<span>Page title</span>
										<IconButton
											onClick={handleClose}
											style={{ marginLeft: '67%' }}
										>
											<CloseIcon />
										</IconButton>
									</DialogTitle>

									<DialogContent>
										<OutlinedInput
											autoFocus
											type="text"
											value={pagetitle}
											fullWidth
											onChange={e => setPagetitle(e.target.value)}
											inputProps={{
												maxLength: 20,
											}}
											endAdornment={
												<InputAdornment position="end">
													<IconButton onClick={handleClearText}>
														<CancelIcon />
													</IconButton>
												</InputAdornment>
											}
										/>
										<div className={classes.charCounter}>
											{pagetitle.length}/{charLimit}
										</div>
									</DialogContent>
									<DialogActions className={classes.DialogAction}>
										<Button
											onClick={handleSaveClick}
											variant="contained"
											color="primary"
											autoFocus
											style={{ textTransform: 'none' }}
										>
											Save
										</Button>
									</DialogActions>
								</div>
							</Dialog>
						</span>
					</Grid>

					<Grid item xs={12} sm={1} className={classes.gridClass}>
						<Button className={classes.preview} disabled={true}>
							<IconButton color="inherit">
								<PlayCircleOutline />
							</IconButton>
							<span>Preview</span>
						</Button>
					</Grid>

					<Grid item xs={12} sm={1} className={classes.gridClass}>
						<div className={classes.root3}>
							<Button
								variant="contained"
								color="primary"
								size="small"
								className={classes.button}
								onClick={savePage}
							>
								Save as Draft
							</Button>
						</div>
					</Grid>

					<Grid item xs={12} sm={1} className={classes.gridClass}>
						<Button
							variant="contained"
							color="primary"
							size="small"
							className={classes.button}
							disbale={request === 0}
							disabled={
								!props.mappedAddOnPageState.pageID ||
								props.mappedAddOnPageState.unsavedChanges
							}
							onClick={publishPage}
						>
							Publish
						</Button>
					</Grid>
				</Grid>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<span>
						<NewPageComponents createField={props.createField} />
					</span>
					<span className={classes.pages}>
						<DndProvider backend={HTML5Backend}>
							<EditComponentContainer createField={props.createField} />
						</DndProvider>
					</span>
				</div>
			</div>
		</Layout>
	);
}
