import { Tooltip } from '@mui/material';

const HelperTooltip = ({ title, text, placement = "bottom", ...props }) => (
	<Tooltip
		className="cursor-help"
		title={<span className="text-accent">
			{title}
		</span>}
		followCursor
		placement={placement}
	>
		<span className="border-b-2 border-dotted border-accent/75 hover:border-accent transition-colors" {...props}>
			{text}
		</span>
	</Tooltip>
);

export default HelperTooltip;
