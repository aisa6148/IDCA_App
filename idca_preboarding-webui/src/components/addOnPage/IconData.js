import React from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import TitleIcon from '@material-ui/icons/Title';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import LocalPhoneOutlinedIcon from '@material-ui/icons/LocalPhoneOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { ICON_DATA } from '../../config/addOnPageConstants';
import AccordianIcon from '../../containers/icons/AccordianIcon';
import TextIcon from '../../containers/icons/TextIcon';

export const leftItems = [
	{
		id: '1',
		icon: <RemoveIcon />,
		iconText: ICON_DATA.DIVIDER,
		itemType: ICON_DATA.DIVIDER,
	},
	{
		id: '2',
		icon: <TitleIcon />,
		iconText: ICON_DATA.TITLE,
		itemType: ICON_DATA.TITLE,
	},

	{
		id: '3',
		icon: <ImageSearchIcon />,
		iconText: ICON_DATA.IMAGE,
		itemType: ICON_DATA.IMAGE,
	},
	{
		id: '4',
		icon: <ViewDayOutlinedIcon />,
		iconText: ICON_DATA.CAROUSEL,
		itemType: ICON_DATA.CAROUSEL,
	},
	{
		id: '5',
		icon: <HelpOutlineIcon />,
		iconText: ICON_DATA.QUIZ,
		itemType: ICON_DATA.QUIZ,
	},
];

export const rightItems = [
	{
		id: '1',
		icon: <LinkOutlinedIcon />,
		iconText: ICON_DATA.LINK,
		itemType: ICON_DATA.URL,
	},
	{
		id: '2',
		icon: <TextIcon />,
		iconText: ICON_DATA.TEXT,
		itemType: ICON_DATA.SHORTTEXT,
	},
	{
		id: '3',
		icon: <VideoLibraryOutlinedIcon />,
		iconText: ICON_DATA.VIDEO,
		itemType: ICON_DATA.VIDEO,
	},
	{
		id: '4',
		icon: <AccordianIcon />,
		iconText: ICON_DATA.ACCORDIAN,
		itemType: ICON_DATA.ACCORDIAN,
	},
	{
		id: '5',
		icon: <LocalPhoneOutlinedIcon />,
		iconText: ICON_DATA.CONTACT,
		itemType: ICON_DATA.CONTACT,
	},
];
