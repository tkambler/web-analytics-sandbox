/**
 * This component takes care of all of the up-front setup / initializing steps that are required by the
 * app (e.g. loading default stylesheets, fetching session data, etc...). Just wrap your child nodes up in
 * Setup, and you should be good to go.
 */
import { withRouter } from './Router';
import { withTheme } from './Theme';
import { withToast } from './Toast';
import { withGrowthBook } from './GrowthBook';
import { withSetupEvents } from './SetupEvents';
import { withState } from './State';
import { compose } from 'lodash/fp';
export { useToast } from './Toast';
export { useExperiment, useFeature } from './GrowthBook';
export { actions, useAppState } from './State';
import './msw';
import './styles.scss';

export const Setup = compose(
  withRouter,
  withTheme,
  withToast,
  withState,
  withGrowthBook,
  withSetupEvents,
)((props) => props.children);

export default Setup;
