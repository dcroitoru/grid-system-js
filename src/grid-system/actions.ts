import { writable } from 'svelte/store';

export const actions = {
	startSelection: 'startSelection',
	stopSelection: 'stopSelection',
	cancel: 'cancel',
	setCurrent: 'setCurrent',
	clear: 'clear'
};

export const setCurrent = (payload) => ({ type: actions.setCurrent, payload });

export type Action = {
	type: string;
	payload?: any;
};

const createChannel = () => {
	const { subscribe, update } = writable();
	const middleware: Function[] = [];
	const dispatch = (type: string, payload?: any) => {
		const action: Action = { type, payload };
		middleware.forEach((fn) => fn(action));
		update(() => action);
	};

	return { subscribe, dispatch, middleware };
};

export const channel = createChannel();
export const dispatch = channel.dispatch;

const logAction = ({ type, payload }) => console.log('Action ::', type, '==>', payload);

channel.middleware.push(logAction);

// dispatch('test');

// channel.subscribe((a) => console.log('should display smth', a));
