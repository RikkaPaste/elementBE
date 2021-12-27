import { getItem } from "@/util/localStorage.js";
import myConfig from '@/util/config.js';
/*富文本编辑图片上传配置*/
let uploadConfig = {
    action: myConfig.uploadFileHost,  // 必填参数 图片上传地址
    methods: 'POST',  // 必填参数 图片上传方式
    token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'file',  // 必填参数 文件的参数名
    size: 2048,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
};
import { quillEditor, Quill } from 'vue-quill-editor'
const Delta = Quill.import('delta')
// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image']
];
const handlers = {
    image: function image() {
        var self = this;
        var fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput === null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('multiple', 'multiple');
            fileInput.setAttribute('accept', 'image/*');
            // 设置图片参数名
            if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.accept);
            fileInput.classList.add('ql-image');
            // 监听选择文件
            fileInput.addEventListener('change', function () {
                if (fileInput.files !== null) {
                    //const files = Array.from(fileInput.files).reverse()
                    const files = Array.from(fileInput.files);
                    //利用es6迭代器异步顺序上传图片，保证图片插入顺序正常
                    const it = files[Symbol.iterator]();
                    uploadFile();
                    function uploadFile() {
                        const { done, value: _file } = it.next()
                        if (done) return
                        let reader = new FileReader()
                        reader.onload = (event) => {
                            // 创建formData
                            var formData = new FormData();
                            formData.append(uploadConfig.name, _file);
                            formData.append('object', 'product');
                            formData.append("folder", getItem("quillUploadFolder"));
                            formData.append("onlyWidth", 1);//1.等宽缩放，这里为1，isResize就要是2
                            formData.append("isResize", 2);//超出后端默认宽高会裁剪,2表示不需要
                            // 如果需要token且存在token
                            if (uploadConfig.token) {
                                formData.append('token', uploadConfig.token)
                            }
                            // 图片上传
                            var xhr = new XMLHttpRequest();
                            xhr.open(uploadConfig.methods, uploadConfig.action, true);
                            xhr.setRequestHeader('Authorization', "Bearer " + getItem("token"));
                            // 上传数据成功，会触发
                            xhr.onload = function (e) {
                                if (xhr.status === 200) {
                                    var res = JSON.parse(xhr.responseText);
                                    // let length = self.quill.getSelection(true).index;
                                    // console.log(res.data.path);
                                    // //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。            
                                    // self.quill.insertEmbed(length, 'image', 
                                    // myConfig.imgHost+"/upload/"+getItem("quillUploadFolder")+"/"+res.data.path);
                                    // self.quill.setSelection(length + 1)
                                    const range = self.quill.getSelection(true)
                                    self.quill.updateContents(
                                        new Delta()
                                            .retain(range.index)
                                            .delete(range.length)
                                            .insert({ image: myConfig.imgHost + "/upload/" + getItem("quillUploadFolder") + "/" + res.data.path })
                                    )
                                }
                                uploadFile();
                                fileInput.value = ''
                            };
                            // 开始上传数据
                            xhr.upload.onloadstart = function (e) {
                                fileInput.value = ''
                            };
                            // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
                            xhr.upload.onerror = function (e) {
                            };
                            // 上传数据完成（成功或者失败）时会触发
                            xhr.upload.onloadend = function (e) {
                                // console.log('上传结束')
                            };
                            xhr.send(formData);
                        }
                        reader.readAsDataURL(_file);
                    }
                }
            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    }
};

export default {
    placeholder: '请输入文字',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: handlers  // 事件重写
        }
    }
};