import fsaw from '@/services/fsaw'
// import repo from '@/services/repo'

const globalObject: any = (function (): any {
	if (typeof global !== 'undefined') {
		// global spec defines a reference to the global object called 'global'
		// https://github.com/tc39/proposal-global
		// `global` is also defined in NodeJS
		return global;
	}
	else if (typeof window !== 'undefined') {
		// window is defined in browsers
		return window;
	}
	else if (typeof self !== 'undefined') {
		// self is defined in WebWorkers
		return self;
	}
})();


self.addEventListener('message', async e => {
  const data = e.data.data
  // globalObject.postMessage(data[0])
  const weightsFuzzy = e.data.weightsFuzzy
  // globalObject.postMessage(weights)
  // const dataFoo = await repo.findAll('dataset', '')
	const result = await fsaw({ data, weightsFuzzy })
  globalObject.postMessage(result)
})

