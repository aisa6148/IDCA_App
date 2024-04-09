import React from 'react';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Visibility as VisibilityIcon,
} from '@material-ui/icons';
import { Divider, ListItemIcon, withStyles } from '@material-ui/core';

import Tile from '../common/Tile.component';
import Menu from '../materialui/Menu';
import MenuItem from '../materialui/MenuItem';
import { PAGE_STATUS } from '../../config/addOnPageConstants';

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
		const { classes, page } = this.props;
		return (
			<MenuItem
				onClick={event => {
					props.onClick && props.onClick(page.pageID);
					this.closeMenu();
					this.onContextMenu(event);
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
		const { page, onEdit, onDelete, previewPage } = this.props;
		const menuOptions = {
			preview: page && page.status === PAGE_STATUS.ACTIVE,
			edit:
				page &&
				(page.status === PAGE_STATUS.ACTIVE ||
					page.status === PAGE_STATUS.EDIT_ACTIVE ||
					page.status === PAGE_STATUS.DRAFT),
			duplicate: page && page.status !== PAGE_STATUS.EDIT_ACTIVE,
			delete: true,
		};

		return (
			<Tile className={classes.tileIndentation} onContextMenu={this.onContextMenu}>
				<div onClick={this.onClick}>
					<PreboardTileContent page={page} classes={classes} />
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
							onClick={previewPage}
							icon={<VisibilityIcon />}
						/>
					)}
					{menuOptions.preview && <Divider />}
					{menuOptions.edit && (
						<this.TileMenuItem title={'Edit'} onClick={onEdit} icon={<EditIcon />} />
					)}

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

const PreboardTileContent = ({ page, classes }) => {
	return (
		<>
			<div className={classes.tileLogo}>
				<div className={`${classes.heading2} ${classes.tileType}`}>{page.pageName}</div>
			</div>
			<div className={classes.contentVerySmall}>Created by {page.createdBy}</div>
			<div className={classes.contentVerySmall}>Edited on </div>
			{page && page.status === PAGE_STATUS.EDIT_ACTIVE && (
				<div className={'contentVerySmall'} style={styles.editingPublishedText}>
					<EditIcon className={classes.editIcon} />
					&nbsp;published
				</div>
			)}
		</>
	);
};
export default withStyles(styles)(ListTile);
