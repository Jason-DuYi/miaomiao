import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox = (function() {
    //设置默认配置
    var defalut = {
        title: '定位',
        position: '上海',
        cancel: '取消',
        ok: '切换城市',
        handToCancel: null,
        handToOk: null
    }
    var Component = Vue.extend(MessageBox)

    return function(pos) {
        for (const attr in pos) {
            defalut[attr] = pos[attr]
        }

        var vm = new Component({
            el: document.createElement("div"),
            data: {
                title: defalut.title,
                position: defalut.position,
                cancel: defalut.cancel,
                ok: defalut.ok,
            },
            methods: {
                handToCancel() {
                    defalut.handToCancel && defalut.handToCancel.call(this)
                    document.body.removeChild(vm.$el)
                },
                handToOk() {
                    defalut.handToOk && defalut.handToOk.call(this)
                    document.body.removeChild(vm.$el)
                }
            }

        })
        document.body.appendChild(vm.$el)

    }
})()