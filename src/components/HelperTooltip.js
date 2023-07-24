import { Tooltip } from '@mui/material';

/* TODO: remove text - unify the component input */
const HelperTooltip = ({ title, text, placement = 'bottom', children, ...props }) => (
	<Tooltip className="cursor-help" title={<span className="text-accent">{title}</span>} followCursor placement={placement}>
		<span className="border-b-2 border-dotted border-accent/75 transition-colors hover:border-accent" {...props}>
			{children}
			{text}
		</span>
	</Tooltip>
);

export default HelperTooltip;
