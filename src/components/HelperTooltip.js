import { Tooltip } from '@mui/material';

const HelperTooltip = ({ className, title, text, ...props }) => (
	<Tooltip
		className="cursor-help"
		title={<span className="text-accent">
			{title}
		</span>}
		followCursor
		{...props}
		classes={{ popper: className }}
	>
		<span className="border-b-2 border-dotted border-accent/75 hover:border-accent transition-colors">
			{text}
		</span>
	</Tooltip>
);

export default HelperTooltip;
