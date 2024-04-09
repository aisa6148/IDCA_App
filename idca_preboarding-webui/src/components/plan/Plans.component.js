import React from 'react';
import { withStyles } from '@material-ui/core';

import { AddCircleOutline as AddCircleOutlineIcon } from '@material-ui/icons';
import clsx from 'clsx';
import Layout from '../common/Layout.component';
import ListTile from './PlanListTile.component';
import EditPlanContainer from '../../containers/plan/EditPlan.container';
import DropDownMini from '../common/DropDownMini';
import SingleDropDown from '../common/SingleDropDown.component';
import { PLAN_STATUS } from '../../config/planConstants';
import { PLAN_API } from '../../config/apiConstants';
import PlanPreview from '../../containers/plan/PlanPreview.container';
import Tile from '../common/Tile.component';

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
		// marginRight: 50,
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
		// margin: '20px 35px',
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

class Plan extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			selectValue: 'All Plans',
			filterValue: '',
			planID: undefined,
			plans: [],
			preview: '',
		};
		this.closeEdit = this.closeEdit.bind(this);
		this.onPublish = this.onPublish.bind(this);
		this.populatePlans = this.populatePlans.bind(this);
		this.displayName = 'preboardPlans';
	}

	/* eslint camelcase: ["error", {allow: ["^UNSAFE_"]}] */
	async UNSAFE_componentWillMount() {
		this.populatePlans();
	}

	async populatePlans() {
		const path = 'PREONBOARDING';
		const uri = `${PLAN_API.FETCH_PLANS}/${path}`;
		const plans = await this.props.handleMultipleApiCall([{ url: uri, options: {} }]);
		if (plans) {
			this.setState({
				plans: plans[0].plans,
			});
		}
	}

	loadTiles = (plans, tileType) => {
		const tileArray = plans.filter(plan => {
			return plan.status === tileType;
		});
		return (
			<>
				{tileArray
					.filter(tile =>
						tile.planName.toLowerCase().includes(this.state.filterValue.toLowerCase()),
					)
					.map(tile => (
						<ListTile
							plan={tile}
							onEdit={this.onEdit}
							onDuplicate={this.onDuplicate}
							onDelete={this.onDelete}
							onArchive={this.onArchive}
							planType={tile.planType}
							openPlan={this.openPlan}
							key={tile.planID}
							previewPlan={this.previewPlan}
						/>
					))}
			</>
		);
	};

	previewPlan = id => {
		this.setState({ preview: id });
	};

	closePreview = () => {
		this.setState({
			preview: '',
		});
	};

	openPlan = id => {
		this.setState(prevState => {
			return {
				edit: !prevState.edit,
				planID: id,
			};
		});
	};

	onEdit = async id => {
		const { plans } = this.state;
		const plan = plans.find(t => t.parentPlanID === id);
		const tid = (plan && plan.planID) || id;

		this.setState(prevState => {
			return {
				edit: !prevState.edit,
				planID: tid,
			};
		});
	};

	// onDuplicate = async id => {
	// 	const duplicateSuccess = await this.props.handleMultipleApiCall([
	// 		{ url: `/api/plans/duplicate/${id}`, options: { method: 'POST' } },
	// 	]);
	// 	if (duplicateSuccess) {
	// 		this.populatePlans();
	// 	}
	// };

	onDelete = async id => {
		const deletionSuccess = await this.props.handleMultipleApiCall([
			{ url: `${PLAN_API.DELETE_PLAN}/${id}`, options: { method: 'DELETE' } },
		]);
		if (deletionSuccess) {
			const newPlanData = this.state.plans.filter(plan => {
				return plan.planID !== id;
			});
			this.setState({
				plans: newPlanData,
			});
		}
	};

	onPublish = async () => {
		this.populatePlans();
		this.setState({
			edit: false,
		});
	};

	filterPlans = value => {
		this.setState({
			selectValue: value,
		});
	};

	updatePlans = value => {
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
		const { plans, selectValue } = this.state;
		if (plans.length > 0 && selectValue === value) {
			return true;
		}
		if (selectValue === 'All Plans') {
			return true;
		}
		return false;
	};

	render() {
		const { classes } = this.props;
		const { plans, planID, selectValue, filterValue, preview } = this.state;
		const PAGE = 'Pre-boarding plan';
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
									onChange={id => this.filterPlans(id)}
									options={['All Plans', 'Active', 'Draft', 'Edit Active']}
									fontDetails={'contentSmallDropdown'}
								/>
								<SingleDropDown
									className={classes.multiDropDown}
									options={plans
										.filter(plan =>
											plan.planName
												.toLowerCase()
												.includes(filterValue.toLowerCase()),
										)
										.map(plan => plan.planName)}
									value={[]}
									onChange={planNames => this.updatePlans(planNames)}
									placeholder={'Search plan names'}
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
									onClick={() => this.openPlan(undefined)}
								>
									<AddCircleOutlineIcon className={classes.addIcon} />
									<div className={clsx(classes.heading2, classes.noWrap)}>
										Add New Plan
									</div>
								</Tile>
							</div>

							<div className={classes.subHeaderStyling}>
								<div
									className={`${classes.heading2} ${
										classes.subHeaderIndentation
									}`}
								>
									Active&nbsp;Plans
								</div>
								<hr className={classes.horizonatlLine} />
							</div>
							<div className={classes.containerStyling}>
								{this.tileLoadCheck('Active') &&
									this.loadTiles(plans, PLAN_STATUS.ACTIVE)}
							</div>

							<div className={classes.subHeaderStyling}>
								<div
									className={`${classes.heading2} ${
										classes.subHeaderIndentation
									}`}
								>
									Draft&nbsp;Plans
								</div>
								<hr className={classes.horizonatlLine} />
							</div>
							<div className={classes.containerStyling}>
								{this.tileLoadCheck('Draft') &&
									this.loadTiles(plans, PLAN_STATUS.DRAFT)}
								{this.tileLoadCheck('Edit Published') &&
									this.loadTiles(plans, PLAN_STATUS.EDIT_ACTIVE)}
							</div>
						</div>
					</Layout>
				) : (
					<>
						<EditPlanContainer
							planID={planID}
							close={this.closeEdit}
							onPublish={id => this.onPublish(id)}
							populatePlans={this.populatePlans}
						/>
					</>
				)}
				{preview && <PlanPreview planID={preview} close={this.closePreview} />}
			</>
		);
	}
}

export default withStyles(styles)(Plan);
