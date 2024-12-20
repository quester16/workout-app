import { createTimeModel, useTimeModel } from 'react-compound-timer'

// Create model, provide your own options object if needed
const stopwatch = createTimeModel();

const Stopwatch = () => {
	// Use this model in any components with useTimeModel hook
	const { value } = useTimeModel(stopwatch);
	
	return <div>{value.s} seconds {value.ms} milliseconds</div>;
};
 
 export default Stopwatch;