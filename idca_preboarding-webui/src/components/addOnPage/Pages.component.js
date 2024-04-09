import React from 'react';
import { withStyles } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon } from '@material-ui/icons';
import clsx from 'clsx';
import Layout from '../common/Layout.component';
import ListTile from './PageListTile.component';
import DropDownMini from '../common/DropDownMini';
import SingleDropDown from '../common/SingleDropDown.component';
import { PAGE_STATUS } from '../../config/addOnPageConstants';
import Tile from '../common/Tile.component';
import EditPage from '../../containers/addOnPage/EditPage.container';

const styles = theme => ({
	headerStyling: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'space-between',
		padding: '0px',
	},
	filterStyling: {
		display: 'flex',
	},
	miniDropDown: {
		marginRight: 50,
		margin: 0,
	},
	multiDropDown: {
		margin: 0,
	},
	searchIcon: {
		color: '#adb0cb',
		marginRight: 10,
	},
	containerStyling: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
		marginBottom: 30,
	},
	createContainerStyling: {
		position: 'relative',
		marginRight: 10,
		top: 7,
		left: 7,
		'&:hover': {
			transform: 'scale(1.04)',
		},
	},
	subHeaderStyling: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	subHeaderIndentation: {
		marginRight: 40,
	},
	horizonatlLine: {
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.12)',
		height: '1px',
		margin: '0px',
		border: 'none',
	},
	addIcon: {
		fontSize: '3rem',
		color: '#041f41',
	},
	layoutStyling: {
		margin: '0px',
		padding: '25px',
	},
	heading1: {
		...theme.custom.heading1,
	},
	heading2: {
		...theme.custom.heading2,
	},
	noWrap: {
		...theme.custom.noWrap,
	},
	centerText: {
		...theme.custom.centerText,
	},
});

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			selectValue: 'All Pages',
			filterValue: '',
			pageID: undefined,
			pages: [],
			preview: '',
		};
		this.closeEdit = this.closeEdit.bind(this);
		this.onPublish = this.onPublish.bind(this);
		this.populatePages = this.populatePages.bind(this);
		this.displayName = 'All Pages';
	}

	async componentWillMount() {
		this.populatePages();
	}

	async populatePages() {
		const path = 'PREONBOARDING';
		const uri = `/api/page/fetch-page/${path}`;
		const pages = await this.props.handleMultipleApiCall([{ url: uri, options: {} }]);
		if (pages) {
			this.setState({
				pages: pages[0].pages,
			});
		}
	}

	loadTiles = (pages, tileType) => {
		const tileArray = pages.filter(page => {
			return page.status === tileType;
		});
		return (
			<>
				{tileArray
					.filter(tile =>
						tile.pageName.toLowerCase().includes(this.state.filterValue.toLowerCase()),
					)
					.map(tile => (
						<ListTile
							page={tile}
							onEdit={this.onEdit}
							onDuplicate={this.onDuplicate}
							onDelete={this.onDelete}
							onArchive={this.onArchive}
							pageType={tile.pageType}
							openPage={this.openPage}
							key={tile.pageID}
							previewPage={this.previewPage}
						/>
					))}
			</>
		);
	};

	previewPage = id => {
		this.setState({ preview: id });
	};

	closePreview = () => {
		this.setState({
			preview: '',
		});
	};

	openPage = id => {
		this.setState(prevState => {
			return {
				edit: !prevState.edit,
				pageID: id,
			};
		});
	};

	onEdit = async id => {
		const { pages } = this.state;
		const page = pages.find(t => t.parentPageID === id);
		const tid = (page && page.pageID) || id;

		this.setState(prevState => {
			return {
				edit: !prevState.edit,
				pageID: tid,
			};
		});
	};

	onDelete = async id => {
		const deletionSuccess = await this.props.handleMultipleApiCall([
			{ url: `/api/page/delete/${id}`, options: { method: 'DELETE' } },
		]);
		if (deletionSuccess) {
			const newPageData = this.state.pages.filter(page => {
				return page.pageID !== id;
			});
			this.setState({
				pages: newPageData,
			});
		}
	};

	onPublish = async id => {
		this.populatePages();
		this.setState({
			edit: false,
		});
	};

	filterPages = value => {
		this.setState({
			selectValue: value,
		});
	};

	updatePages = value => {
		this.setState({
			filterValue: value,
		});
	};

	closeEdit = () => {
		this.setState({
			edit: false,
		});
	};

	tileLoadCheck = value => {
		const { pages, selectValue } = this.state;
		if (pages.length > 0 && selectValue === value) {
			return true;
		}
		if (selectValue === 'All Pages') {
			return true;
		}
		return false;
	};

	render() {
		const { classes } = this.props;
		const { pages, pageID, selectValue, filterValue } = this.state;
		const PAGE = 'All Pages';
		return (
			<>
				{!this.state.edit ? (
					<Layout className={classes.layoutStyling}>
						<div className={classes.headerStyling}>
							<div className={classes.heading1}>{PAGE}</div>
							<div className={classes.filterStyling}>
								<DropDownMini
									id="type-dropdown"
									className={classes.miniDropDown}
									key="training-selector"
									value={selectValue || ''}
									onChange={id => this.filterPages(id)}
									options={['All Pages', 'Active', 'Draft', 'Edit Active']}
									fontDetails={'contentSmallDropdown'}
								/>
								<SingleDropDown
									className={classes.multiDropDown}
									options={pages
										.filter(page =>
											page.pageName
												.toLowerCase()
												.includes(filterValue.toLowerCase()),
										)
										.map(page => page.pageName)}
									value={[]}
									onChange={pageNames => this.updatePages(pageNames)}
									placeholder={'Search page names'}
								/>
							</div>
						</div>
						<div>
							<div className={classes.containerStyling}>
								<Tile
									className={clsx(
										classes.centerText,
										classes.margin20,
										classes.pointer,
									)}
									onClick={() => this.openPage(undefined)}
								>
									<AddCircleOutlineIcon className={classes.addIcon} />
									<div className={clsx(classes.heading2, classes.noWrap)}>
										Create New Page
									</div>
								</Tile>
							</div>

							<div className={classes.subHeaderStyling}>
								<div
									className={`${classes.heading2} ${
										classes.subHeaderIndentation
									}`}
								>
									Live
								</div>
								<hr className={classes.horizonatlLine} />
							</div>
							<div className={classes.containerStyling}>
								{this.tileLoadCheck('Active') &&
									this.loadTiles(pages, PAGE_STATUS.ACTIVE)}
							</div>

							<div className={classes.subHeaderStyling}>
								<div
									className={`${classes.heading2} ${
										classes.subHeaderIndentation
									}`}
								>
									Draft
								</div>
								<hr className={classes.horizonatlLine} />
							</div>
							<div className={classes.containerStyling}>
								{this.tileLoadCheck('Draft') &&
									this.loadTiles(pages, PAGE_STATUS.DRAFT)}
								{/* {this.tileLoadCheck('Edit Published') &&
									this.loadTiles(pages, PAGE_STATUS.EDIT_ACTIVE)} */}
							</div>
						</div>
					</Layout>
				) : (
					<>
						<EditPage
							pageID={pageID}
							close={this.closeEdit}
							populatePages={this.populatePages}
							onPublish={id => this.onPublish(id)}
						/>
					</>
				)}
				{/* {preview && <PagePreview pageID={preview} close={this.closePreview} />} */}
			</>
		);
	}
}

export default withStyles(styles)(Page);
