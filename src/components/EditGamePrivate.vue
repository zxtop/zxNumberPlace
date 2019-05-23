<template>
    <div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option')" ref="optionTitle"></i>
            <span @click="tabShow(index,'option')">
                拖拽配置
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option">

            <div class="game-title">
                <i :class="tabShowStatus[index].child.option1?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option1')" ref="option1Title"></i>
                <span @click="tabShow(index,'option1')">
                    拖拽物
                </span>
            </div>

            <div class="game-inner" v-show="tabShowStatus[index].child.option1" >

                <div style="color:#fff;margin-top:10px">拖拽物大小</div>
             
                <div style="width:100%;float:left;" ref="commonWH" class="commonWH">

                    <el-input style="width:40%;" placeholder="请输入内容" 
                    ref="commonWidth" class="commonWith"

                    @input="change(0,'width',$event)"
                    @change="change(0,'width',$event)"

                    @focus="focusWidth(0,$event)"
                    v-model="Fwidth[0].width" 
                    size="mini">
                        <template slot="prepend">W :</template>
                    </el-input>

                    <img class="imgsReleva" 
                    style="float:left;margin-left:10px;margin-top:15px;" 
                    v-if="lock[0].bool"
                    ref="lock"
                     @click="lockChange(0)"
                    :src = image_off alt="">

                    <img class="imgsReleva" 
                    style="float:left;margin-left:10px;margin-top:15px;" 
                    v-if="lockno[0].bool"
                    ref="lockno"
                     @click="lockN(0)"
                    :src = image_on alt="">

                    <el-input style="width:40%;" placeholder="请输入内容" 
                    ref="commonHeight"
                    v-model="Fheight[0].height" 
                    @input="change(0,'height',$event)"
                    @change="change(0,'height',$event)"
                    @focus="focusHeight(0,$event)"

                    size="mini">
                        <template slot="prepend">H :</template>
                    </el-input>

                </div>

                <div style="clear:both"></div>

                <div class="drags" v-for="(item_drag,index_drag) in gameData[index].drags.dragsOption" v-bind:key="index_drag">

                        <div class="game-title">
                            <i :class="item_drag ?'el-icon-arrow-down':'el-icon-arrow-right'"
                                @click="tabShow_child(index_drag)" ref="fishs" :data-off = "true"></i>
                            <span @click="tabShow_child(index_drag)">拖拽物{{index_drag+1}}</span>

                            <i @click="changeArr1('del',index_drag)" class="game-title-icon el-icon-delete"></i>
                            <i @click="changeArr1('copy',index_drag)" class="game-title-icon el-icon-tickets"></i>
                            <i @click="changeArr1('add',index_drag)" class="game-title-icon el-icon-plus"></i>
                        </div>
                        <div class="game-inner fish_item" ref="fish_item"  v-show="tabShowStatus[index].child.option" style="padding-left:0px;padding-right:0px;" >

                            <div class="upload">
                                <div class="img-box">
                                    <img  alt="" width="131" height="96" :src="resourceData[item_drag.image.name]">
                                </div>
                                <div class="upload-btn">
                                    <div class="upload-btn-file">
                                        <span>更改图片</span>
                                        <input type="file" @change="uploadImage(index,'drags',$event,index_drag)">
                                    </div>
                                </div>
                            </div>

                            <div style="width:100%;float:left;">
                                <el-input style="width:50%;" placeholder="请输入内容" 
                                @input="posX('x',$event)"
                                v-model="item_drag.image.x" size="mini">
                                    <template slot="prepend">X :</template>
                                </el-input>

                                <el-input style="width:50%;" placeholder="请输入内容" 
                                @input="posX('y',$event)"
                                v-model="item_drag.image.y" size="mini">
                                    <template slot="prepend">Y :</template>
                                </el-input>

                                <!-- <el-input style="width:100%;" placeholder="请输入内容" 
                                v-model="item_drag.image.text" size="mini" >
                                    <template slot="prepend">数值 :</template>
                                </el-input> -->

                            </div>

                            <div style="clear:both"></div>
                        </div>

                </div>

            </div>


            <div class="game-title">
                <i :class="tabShowStatus[index].child.option2?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option2')" ref="option2Title"></i>
                <span @click="tabShow(index,'option2')">
                    拖拽区
                </span>
            </div>

            <div class="game-inner" v-show="tabShowStatus[index].child.option2" style="padding-left:5px;padding-right:5px;">

                <div class="game-title">
                    <i :class="tabShowStatus[index].child.option3?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow(index,'option3')" ref="option3Title"></i>
                    <span @click="tabShow(index,'option3')">
                        拖拽区样式
                    </span>
                </div>

                <div class="game-inner" v-show="tabShowStatus[index].child.option3" >
                    <div style="color:#fff;margin-top:10px;">默认状态</div>
                    <div class="upload" style="margin-bottom:10px;">
                        <div class="img-box">
                            <img  alt="" width="131" height="96" :src="resourceData[item.targetArea.targetCommon.default.image.name]">
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadImage1(index,'targetArea',$event,'default')">
                            </div>
                        </div>
                    </div>

                    <div style="color:#fff;margin-top:30px;">触碰状态</div>
                    <div class="upload" style="margin-bottom:10px;">
                        <div class="img-box">
                            <img  alt="" width="131" height="96" :src="resourceData[item.targetArea.targetCommon.touch.image.name]">
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadImage1(index,'targetArea',$event,'touch')">
                            </div>
                        </div>
                    </div>
                    <div style="color:#fff;margin-top:30px;">错误状态</div>

                    <div class="upload" style="margin-bottom:10px;">
                        <div class="img-box">
                            <img  alt="" width="131" height="96" :src="resourceData[item.targetArea.targetCommon.error.image.name]">
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadImage1(index,'targetArea',$event,'error')">
                            </div>
                        </div>
                    </div>


                    <div style="width:100%;float:left;" ref="commonWH" class="commonWH">

                        <el-input style="width:40%;" placeholder="请输入内容" 
                        v-model="Fwidth[1].width" 
                        @input="change(1,'width',$event)"
                        @change="change(1,'width',$event)"
                        @focus="focusWidth(1,$event)"
                        :data-off = "false"
                        size="mini" ref="commonWidth" class="commonWith">
                            <template slot="prepend">W :</template>
                        </el-input>

                        <img class="imgsReleva" 
                        style="float:left;margin-left:10px;margin-top:15px;" 
                        v-if="lock[1].bool"
                        ref="lock"
                        @click="lockChange(1)"
                        :src = image_off alt="">

                        <img class="imgsReleva" 
                        style="float:left;margin-left:10px;margin-top:15px;" 
                        v-if="lockno[1].bool"
                        ref="lockno"
                        @click="lockN(1)"
                        :src = image_on alt="">

                        <el-input style="width:40%;" placeholder="请输入内容" 
                        v-model="Fheight[1].height" 
                        @input="change(1,'height',$event)"
                        @change="change(1,'height',$event)"
                        @focus="focusHeight(1,$event)"
                        :data-off = "false"
                        ref="commonHeight"
                      
                        size="mini">
                            <template slot="prepend">H :</template>
                        </el-input>

                    </div>
                </div>

                <div class="game-title">
                    <i :class="tabShowStatus[index].child.option4?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow(index,'option4')" ref="option4Title"></i>
                    <span @click="tabShow(index,'option4')">
                        正确答案样式
                    </span>

                    <div class="edit-switch" style="float:right;margin-top:5px">
                     
                        <el-switch
                                v-model="item.textStyle.show"
                                active-color="#77DC04"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>

                </div>
                <div class="game-inner" v-show="tabShowStatus[index].child.option4" style="padding-left:0px;padding-right:0px;">

                    <div style="width:100%;float:left;">
                        <el-input style="width:50%;" placeholder="请输入内容" v-model="item.textStyle.fontSize" size="mini">
                            <template slot="prepend">字号 :</template>
                        </el-input>
                        <div class="edit-select" style="vertical-align:middle;width:50%">
                        <span style="color:#fff">颜色：</span>
                        <el-color-picker v-model="item.textStyle.color"></el-color-picker>
                        </div>
                    </div>

                </div>

                <div class="targetarea" v-for="(item_target,index_target) in gameData[index].targetArea.targetOption" v-bind:key="index_target">
                    <div class="game-title">
                        <i :class="item_target?'el-icon-arrow-down':'el-icon-arrow-right'"
                        @click="tabShow_child1(index_target)" ref="yulous" :data-off = "true"></i>
                        <span @click="tabShow_child1(index_target)">
                            拖拽区{{index_target+1}}
                        </span>
                        <i @click="changeArr2('del',index_target)" class="game-title-icon el-icon-delete"></i>
                        <i @click="changeArr2('copy',index_target)" class="game-title-icon el-icon-tickets"></i>
                        <i @click="changeArr2('add',index_target)" class="game-title-icon el-icon-plus"></i>
                    </div>

                    <div class="yulou_out game-inner" ref="yulou_item">
                        <div style="width:100%;float:left;">
                            <el-input style="width:50%;" placeholder="请输入内容" 
                            @input="posX('x',$event)"
                            v-model="item_target.x" size="mini">
                                <template slot="prepend">X :</template>
                            </el-input>
                            <el-input style="width:50%;" placeholder="请输入内容" 
                            @input="posX('y',$event)"
                            v-model="item_target.y" size="mini">
                                <template slot="prepend">Y :</template>
                            </el-input>
                        </div>
                        <div style="clear:both"></div>

                        <div style="color:#fff;margin-top:10px;margin-bottom:10px">
                            正确答案：
                        </div>

                        <el-radio-group v-model="item_target.rightDrag" class="elradio">

                            <el-radio v-for="(drag_item,drag_index) in gameData[index].drags.dragsOption" 
                                :label="(drag_index+1).toString()" 
                                :key="drag_index" 
                                >
                                拖拽{{drag_index+1}}
                            </el-radio>
                               
                        </el-radio-group>

                   

                    </div>


                </div>


            </div>


           
        </div>


    </div>
</template>
<script>
    export default {
        name: "EditGamePrivate",
        data() {
            return {

                proportion:'',
                Fwidth:[
                    {
                        "width":0
                    },
                    {
                        "width":0
                    }
                ],
                Fheight:[
                    {
                        "height":0
                    },
                    {
                        "height":0
                    }
                ],
                lock:[

                    {"bool":true},
                    {"bool":true}
                ],
                lockno:[
                    {
                        "bool":false
                    },
                    {
                        "bool":false
                    }
        
                ],
                image_on:require('../../static/images/lock_on.png'),
                image_off:require('../../static/images/lock_off.png'),

                label: '1',
                testData:{
                    switch:true,
                    animateName:'animateName',
                    audioName:'audioName',
                    spriteName:'spriteName',
                    input:111,
                    select:16,
                    checked:true,
                    fontSize: [
                        {
                            label: '16px',
                            value: 16
                        },
                        {
                            label: '18px',
                            value: 18
                        },
                        {
                            label: '20px',
                            value: 20
                        },
                        {
                            label: '22px',
                            value: 22
                        },
                        {
                            label: '24px',
                            value: 24
                        },
                        {
                            label: '26px',
                            value: 26
                        },
                        {
                            label: '30px',
                            value: 30
                        },
                        {
                            label: '40px',
                            value: 40
                        },
                        {
                            label: '50px',
                            value: 50
                        }
                    ]
                }
            }
        },
   
        props: [
            "gameData",
            "resourceData",
            "item",
            "index",
            "tabShowStatus"
        ],
         created () {
            this.dragsOption = this.gameData[this.index].drags.dragsOption;
            this.targetOption = this.gameData[this.index].targetArea.targetOption;
        },
        watch:{
            Fwidth:{
                handler:function(){
                    this.item.drags.dragsCommon.width = this.Fwidth[0].width;
                    this.item.drags.dragsCommon.height = this.Fheight[0].height;
                  
                },deep:true
            },
            Fheight:{
                handler:function(){
                    this.item.targetArea.targetCommon.common.width = this.Fwidth[1].width;
                    this.item.targetArea.targetCommon.common.height = this.Fheight[1].height;
                },deep:true
            }
        },

        mounted() {
   

            this.Fwidth[0].width = Math.round(this.item.drags.dragsCommon.width);
            this.Fheight[0].height = Math.round(this.item.drags.dragsCommon.height);
      
            this.Fwidth[1].width = Math.round(this.item.targetArea.targetCommon.common.width);
            this.Fheight[1].height = Math.round(this.item.targetArea.targetCommon.common.height);

        },
        methods: {
             posX(name,e){
                //  console.log(name,e)
                if(name == 'x'){

                    if( parseInt(e)<0 || parseInt(e)>1920 ){
   
                        this.$alert('坐标范围:X(0-1920)', '提示', {
                        confirmButtonText: '确定',
                        // callback: action => {
                        //     this.$message({
                        //     type: 'info',
                        //     message: ''
                        //     });
                        // }
                        });
                    }

                }
                if(name == 'y'){

                    if( parseInt(e)<1 || parseInt(e)>1080 ){
   
                        this.$alert('坐标范围:Y(1-1080)', '提示', {
                        confirmButtonText: '确定',
                        // callback: action => {
                        //     this.$message({
                        //     type: 'info',
                        //     message: `action: ${ action }`
                        //     });
                        // }
                        });
                    }

                }
                
             },
            change(index,names,event){
                
                let value = event;

                
              
                if(names == 'width'){
             
                    this.Fwidth[index].width = value;
                    
                    if(this.lockno[index].bool == true){
                        this.Fheight[index].height = value *1 / this.proportion*1;
                        this.Fheight[index].height = Math.round(this.Fheight[index].height);
                        console.log("比例",this.proportion,index,this.Fheight[index].height)
                    }


                }else if(names == 'height'){

                  

                    this.Fheight[index].height = value;
                  
                    if(this.lockno[index].bool == true){
                        this.Fwidth[index].width = value*Number(this.proportion);
                        this.Fwidth[index].width = Math.round(this.Fwidth[index].width);
                    }
                }


            },
            focusWidth(index,ev){
               
                this.Fwidth[index].width = Math.round(ev.target.value);
             

                this.proportion = this.Fwidth[index].width / this.Fheight[index].height;
                this.proportion = Math.round(this.proportion*1000)/1000;
            },
            focusHeight(index,ev){
         
                this.Fheight[index].height = Math.round(ev.target.value);
               

                this.proportion = this.Fwidth[index].width / this.Fheight[index].height;
                this.proportion = Math.round(this.proportion*1000)/1000;
            },
            lockChange(index){
                this.lock[index].bool = false;
                this.lockno[index].bool = !this.lock[index].bool;
               
            },
            lockN(index){
                this.lockno[index].bool = false;
                this.lock[index].bool = !this.lockno[index].bool;
            },

            tabShow_child1(index){
                
                let title = this.$refs.yulous[index];
                let fish_item = this.$refs.yulou_item[index];
             
                if(title.getAttribute("data-off") == "true"){
                    title.className = 'el-icon-arrow-right';
                    fish_item.style.display = 'none';
                    title.setAttribute("data-off","false");
                }else{
                    title.className = 'el-icon-arrow-down';
                    fish_item.style.display = 'block';
                    title.setAttribute("data-off","true")
                   
                }
            },
            tabShow_child(index){
                
                let title = this.$refs.fishs[index];
                let fish_item = this.$refs.fish_item[index];
             
                if(title.getAttribute("data-off") == "true"){
                    title.className = 'el-icon-arrow-right';
                    fish_item.style.display = 'none';
                    title.setAttribute("data-off","false");
                }else{
                    title.className = 'el-icon-arrow-down';
                    fish_item.style.display = 'block';
                    title.setAttribute("data-off","true")
                   
                }
            },
            changeArr1(type, index) {
                let self = this;
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.dragsOption[0]));
                    resetArr(arr);
                    this.gameData[this.index].drags.dragsOption.push(arr);
                    this.$nextTick(function(){
                       // console.log(self.$refs.gamContent);
                    })
                }
                else if (type === 'copy') {
                    this.gameData[this.index].drags.dragsOption.push(JSON.parse(JSON.stringify(this.gameData[this.index].drags.dragsOption[index])));
                 
                }
                else if (type === 'del') {
                    // this.$message('成功删除一条小鱼');
                    if(this.gameData[this.index].drags.dragsOption.length>1){
                        
                        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //   console.log(this.gameData[this.index].option)
                            this.gameData[this.index].drags.dragsOption.splice(index,1)
                            // this.gameData[this.index].rightAnswer.splice(index, 1);
                        
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });


                    }
                }
            },

            changeArr2(type, index) {
                let self = this;
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.targetOption[0]));
                    resetArr(arr);
                    this.gameData[this.index].targetArea.targetOption.push(arr);
                    this.$nextTick(function(){
                      
                    })
                }
                else if (type === 'copy') {
                    this.gameData[this.index].targetArea.targetOption.push(JSON.parse(JSON.stringify(this.gameData[this.index].targetArea.targetOption[index])));
                 
                }
                else if (type === 'del') {
                   
                    if(this.gameData[this.index].targetArea.targetOption.length>1){
                        
                        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //   console.log(this.gameData[this.index].option)
                            this.gameData[this.index].targetArea.targetOption.splice(index,1)
                            // this.gameData[this.index].rightAnswer.splice(index, 1);
                        
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });


                    }
                }
            },

            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                if (name !== 'one') {
                    let nameTab = this.tabShowStatus[index].child[name];
                    if (nameTab) {
                        this.tabShowStatus[index].child[name] = false;
                        title.className = 'el-icon-arrow-right'
                    } else {
                        
                        this.tabShowStatus[index].child[name] = true;
                        title.className = 'el-icon-arrow-down'
                    }
                    console.log(nameTab,"nameTab");
                }
            },
            updateResourceData(){
                /*
                * 上传图片后请求资源列表
                * 获取图片链接显示图片
                * */
                this.$emit('updateResourceData')
            },
            uploadImage(index, name, e,index_drag) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0]
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    /*
                    * res.fieldName 图片原始name
                    * res.path 图片路径
                    * res.resourceName 资源name  需要更改gameData相应字段
                    * res.size 图片大小
                    * res.headers http headers
                    * */
                   console.log(res,'res');
                    this.Fwidth[0].width = res.width;
                    this.Fheight[0].height = res.height;
                    this.gameData[index][name].dragsOption[index_drag].image.name = res.resourceName;
                    this.updateResourceData();
                })
            },
            uploadImage1(index, name_out, e,names) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0]
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    /*
                    * res.fieldName 图片原始name
                    * res.path 图片路径
                    * res.resourceName 资源name  需要更改gameData相应字段
                    * res.size 图片大小
                    * res.headers http headers
                    * */
                   console.log(res,'res');
                    // this.gameData[index][name_out].targetCommon.common.width = res.width;
                    // this.gameData[index][name_out].targetCommon.common.height = res.height;
                    this.Fwidth[1].width = res.width;
                    this.Fheight[1].height = res.height;

                    this.gameData[index][name_out].targetCommon[names].image.name = res.resourceName;
                    this.updateResourceData();
                })
            },


            uploadAudio(index,name,e) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name].audio = res.resourceName;
                }
                )
            },
            uploadAnimation(index, name, e) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name].animate.animate_name = res.resourceName;
                })
            },
            uploadSprite(index,name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 2) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['sprite' + (index + 1)] = item;
                });
                console.log(object);
                this.$http.post('/uploadingSprite', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    e.target.value = '';
                    //this.gameData[index][name].sprite.name = res.resourceName;
                })
            },
            //删除接口
            changeArr(type, index) {
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }

                    let arr = JSON.parse(JSON.stringify(this.gameData[0]));
                    resetArr(arr);
                    this.gameData.push(arr);
                    this.tabShowStatus.push({
                        show: false,
                        child: JSON.parse(JSON.stringify(this.tabShowLists))
                    })
                }
                else if (type === 'copy') {
                    this.gameData.push(JSON.parse(JSON.stringify(this.gameData[index])));
                    this.tabShowStatus.push({
                        show: false,
                        child: JSON.parse(JSON.stringify(this.tabShowLists))
                    })
                }
                else if (type === 'del') {
                    if(this.gameData.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData.splice(index, 1);
                            this.tabShowStatus.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },
        }
       
    }
</script>
<style scoped lang="scss">

    .el-radio{margin-right: 10px;margin-bottom: 10px;}
    .elradio .el-radio+.el-radio{margin-left: 0px;}
    .option-item {
        border-top:1px solid #ccc;
        overflow: hidden;
        width: 100%;
        margin-top: 15px;
        float: left;
        &:nth-of-type(1){
            border: none;
        }
    }
    .game-icon {
        height: 40px;
        line-height: 40px;
        color: #fff;
        float: left;
        width: 100%;
    }
    .audio-title{
        margin-top: 15px;
        margin-bottom: 0;
        float: left;
        padding: 0 5px;
    }
    .option-animate{
        color: #eee;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
        padding-bottom: 10px;
        overflow: hidden;
        .option-animate-radio{
            >label{
                margin: 5px 0;
            }
        }
        .option-animate-title{
            margin-bottom: 15px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-animate-radio{
            margin: 5px 0;
            >label{
                width: 50%;
            }
        }
    }
    .option-audio{
        color: #eee;
        .option-audio-title{
            margin-bottom: 10px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-audio-inner{
            padding-left: 15px;
        }
    }
</style>