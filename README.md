# vue_form 一款基于vue 的form 表单校验插件

<h3>引入组件并注册使用</h3>

``` bash

# 用法一
import Form from './form'
import FormItem from './form-item'

Vue.use(Form)
Vue.use(FormItem)

# 用法二
import Form from './form'
import FormItem from './form-item'

Vue.component('lm-form', Form);
Vue.component('lm-form-item', FormItem);


```

<h3>template中用法</h3>

``` bash

<lm-form ref="form" :model="formModel" :rules="rules" :messages="messages">
  <lm-form-item prop="names" :title="title">
  	<input type="text" name="names" id="names">
  </lm-form-item>
  <lm-form-item prop="key" title="keyTitle" :rules="demoRules">
    <input type="text" v-model="formModel.key" name="key" id="key">
  </lm-form-item>
  <button type="button" @click="submit()">提交</button>
</lm-form>


```
<h3>js 调用校验</h3>

``` bash

export default {
  data() {
    return {
      title: '标题',
      keyTitle: '关键'
      demoRules: {
        rules: {
          required: true,
          maxlength: 10
        },
        messages: {
          required: '请输入key',
          maxlength: '长度不能超过10'
        }
      },
      formModel: {
        names: '',
        key: '' 
      },
      rules: {
        names: {
          required: true
        }
      },
      messages: {
        names: {
          required: '请输入用户名'  
        },
        
      }
    } 
  },
  methods: {
  	/* 使用promise方式 */
  	submit() {
  	  
      this.$refs.form.validate().then((form) => {
        console.log(form)
      }).catch(err => {
        console.log(err, 'assets/')
      })
  	},
  	/* 使用回调函数的方式 */
  	submit2() {
  	  
      this.$refs.form.validate((form, errors) => {
        console.log(form, errors)
      })
  	}
  }
}

```

<h3>新增校验方法</h3>

``` bash

function checkPhone(value, param){
  var length = value.length;
  var mobile = /(?:0|86|\+86)?1[3456789]\d{9}/;
  return this.optional(value) || (length == 11 && mobile.test(value));  
}

# 方法一、
Vue.use(Form, {
  "test":{
  "method": checkPhone,
  "message":"请填写正确的电话号码"
  }
})
Vue.use(FormItem)

# 方法二、
Form.addMethod({
  "test":{
  "method": checkPhone,
  "message":"请填写正确的电话号码"
  }, 
})
Vue.component('l-form', Form);
Vue.component('l-form-item', FormItem);


```