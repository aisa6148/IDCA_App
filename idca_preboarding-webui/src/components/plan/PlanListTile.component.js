import React from 'react';
import {
	Delete as DeleteIcon,
	FileCopy as DuplicateIcon,
	Edit as EditIcon,
	Visibility as VisibilityIcon,
} from '@material-ui/icons';
import { Divider, ListItemIcon, withStyles } from '@material-ui/core';

import Tile from '../common/Tile.component';
import Menu from '../materialui/Menu';
import MenuItem from '../materialui/MenuItem';
import { PLAN_STATUS } from '../../config/planConstants';

const styles = theme => ({
	tileLogo: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	tileType: {
		marginLeft: 0,
	},
	tileIndentation: {
		boxShadow: '0 2px 10px 0 rgba(205, 209, 226, 0.3)',
		backgroundColor: '#ffffff',
		// margin: '20px 10px',
		margin: '20px 20px 0 0',
	},
	icon: {
		minWidth: 24,
		minHeight: 24,
		color: '#adb0cb',
		marginRight: 13,
	},
	techTrngIcon: {
		color: '#06f27b',
	},
	nonTechTrngIcon: {
		color: '#041f41',
	},

	bulletListIcon: {
		color: '#041f41',
	},
	menu: {
		minWidth: 220,
	},
	editingPublishedText: {
		color: '#008741',
		alignItems: 'center',
		display: 'flex',
		fontSize: 12,
	},
	editIcon: {
		fontSize: 12,
	},
	heading2: {
		...theme.custom.heading2,
	},
	contentSmall: {
		...theme.custom.contentSmall,
	},
	contentVerySmall: {
		...theme.custom.contentVerySmall,
	},
	contentSmallBold: {
		...theme.custom.contentSmallBold,
	},
});

class ListTile extends React.Component {
	state = {
		anchorEl: null,
	};

	onContextMenu = event => {
		event.preventDefault();
		if (this.state.anchorEl === null) {
			this.setState({
				anchorEl: event.currentTarget,
			});
		}
	};

	onClick = event => {
		this.setState({
			anchorEl: event.currentTarget,
		});
	};

	closeMenu = () => {
		this.setState({
			anchorEl: null,
		});
	};

	TileMenuItem = React.forwardRef((props, ref) => {
		const { classes, plan } = this.props;
		return (
			<MenuItem
				onClick={event => {
					props.onClick && props.onClick(plan.planID);
					this.closeMenu();
					// this.onContextMenu(event);
				}}
				ref={ref}
			>
				<ListItemIcon className={classes.icon}>{props.icon}</ListItemIcon>
				<div className={classes.contentSmallBold}>{props.title}</div>
			</MenuItem>
		);
	});

	render() {
		const { classes } = this.props;
		const { plan, onEdit, onDuplicate, onDelete, previewPlan } = this.props;
		const menuOptions = {
			preview: plan && plan.status === PLAN_STATUS.ACTIVE,
			edit:
				plan &&
				(plan.status === PLAN_STATUS.ACTIVE ||
					plan.status === PLAN_STATUS.EDIT_ACTIVE ||
					plan.status === PLAN_STATUS.DRAFT),
			duplicate: plan && plan.status !== PLAN_STATUS.EDIT_ACTIVE,
			delete: true,
		};

		return (
			<Tile className={classes.tileIndentation} onContextMenu={this.onContextMenu}>
				<div onClick={this.onClick}>
					<PreboardTileContent plan={plan} classes={classes} />
				</div>
				<Menu
					id="customized-menu2"
					anchorEl={this.state.anchorEl}
					open={Boolean(this.state.anchorEl)}
					keepMounted
					onClose={this.closeMenu}
				>
					{menuOptions.preview && (
						<this.TileMenuItem
							title={'Preview'}
							onClick={previewPlan}
							icon={<VisibilityIcon />}
						/>
					)}
					{menuOptions.preview && <Divider />}
					{menuOptions.edit && (
						<this.TileMenuItem title={'Edit'} onClick={onEdit} icon={<EditIcon />} />
					)}
					{/* {menuOptions.edit && <Divider />}
					{menuOptions.duplicate && (
						<this.TileMenuItem
							title={'Duplicate'}
							onClick={onDuplicate}
							icon={<DuplicateIcon />}
						/>
					)} */}
					{menuOptions.duplicate && <Divider />}
					{menuOptions.delete && (
						<this.TileMenuItem
							title={'Delete'}
							onClick={onDelete}
							icon={<DeleteIcon />}
						/>
					)}
					{menuOptions.delete && <Divider />}
				</Menu>
			</Tile>
		);
	}
}

const PreboardTileContent = ({ plan, classes }) => {
	return (
		<>
			<div className={classes.tileLogo}>
				<span className={classes.contentSmall}>{plan.count} tasks added</span>
				{/* <BulletListIcon className={classes.bulletListIcon} /> */}
			</div>
			<div className={`${classes.heading2} ${classes.tileType}`}>{plan.planName}</div>
			<div className={classes.contentSmall}>Due in {plan.count} days</div>
			<div className={classes.contentVerySmall}>Created by {plan.createdBy}</div>
			{plan && plan.status === PLAN_STATUS.EDIT_ACTIVE && (
				<div className={'contentVerySmall'} style={styles.editingPublishedText}>
					<EditIcon className={classes.editIcon} />
					&nbsp;published
				</div>
			)}
		</>
	);
};
export default withStyles(styles)(ListTile);
