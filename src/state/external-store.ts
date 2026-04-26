type Callback = () => void;

type Unsubscribe = Callback;

export type ExternalStore<T> = {
	subscribe: (onUpdated: Callback) => Unsubscribe;
	getSnapshot: () => T;
};

export const createExternalStore = <T>(getSnapshot: () => T): ExternalStore<T> => {
	const subscribers: Callback[] = [];

	const onSubscribe = (callback: Callback): Unsubscribe => {
		subscribers.push(callback);

		return () => {
			const index = subscribers.findIndex(subscriber => subscriber === callback);

			if (index === -1) {
				return;
			}

			subscribers.splice(index, 1);
		};
	};

	return {
		subscribe: onSubscribe,
		getSnapshot,
	};
};
