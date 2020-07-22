import './index.scss'
import 'normalize.css'
import $ from "jquery";



const textEl = $('#textEl')
const getBtn = $('#getBtn')
const bdEl = $('#textHtml')
const copyPlan = $('#copyPlan')


getBtn.on('click', function () {
    let str = textEl.val();
    let a = str.replace(/className/g, 'class').replace(/[ | ]*\n/g,'\n')
    bdEl.append(a)
    let classObj =   getEl(bdEl[0])
    let classStr = getClassStr(classObj) || '暂无'
    copyPlan.html(classStr)
    bdEl.html('')
});

 function getEl(el){
    if(el.childNodes.length == 0){
        return {
            className:getOneClass(el.className,el),
            child:[]
        }
    }else{
        return {
            className:getOneClass(el.className,el),
            child: gg(el)
        }
    }
}

function getOneClass(className,el){
    
    if(className.includes(' ')){
        return className.split(' ')[0]
    }else{
        return className
    }

}


function gg(el){
    let arr = []
    for (let index = 0; index < el.childNodes.length; index++) {
        if(el.childNodes[index].nodeName != '#text' && el.childNodes[index].nodeName != '#comment'){
            arr.push(getEl(el.childNodes[index])) 
        }
    }
    return arr
}


function getClassStr(data){
    if(data.className == ""){
        if(data.child.length == 0){
            return ''
        }
        return `${getChildClass(data.child)}`
    }
    return `.${data.className}{${getChildClass(data.child)}}`
}

function getChildClass(arr){
    let str = ''
    if(arr.length == 0){
        return ''
    }
    for (const iterator of arr) {
        str +=  getClassStr(iterator)
    }
    return str
}
