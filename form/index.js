import Form from './form'
import addMethodMap from '../validate'

Form.install = function(Vue, options) {
  Vue.component(Form.name, Form);
  addMethodMapHandle(options);
};

Form.addMethod = addMethodMapHandle;

function addMethodMapHandle(options) {
	let addMethods = options
	for(let key in addMethods){
	  if(addMethods[key] && typeof (addMethods[key].method) === 'function' && addMethods[key].message){
	    addMethodMap[key] = {
	      "name":key,
	      "method":addMethods[key].method,
	      "message":addMethods[key].message
	    };   
	  }
	} 
}
export default Form