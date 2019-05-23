<template>
    <div class="game" v-if="showStatus">

        <div v-for="(item,index) in gameData" :key="index">
            <div class="game-title" style="background: #383838;padding-left: 8px">
                <i :class="tabShowStatus[index].show?'el-icon-arrow-down':'el-icon-arrow-right'"
                   @click="tabShow(index,'one')" ref="oneTitle"></i>
                <span @click="tabShow(index,'one')">
                内容页{{index+1}}
                </span>
                <i @click="changeArr('del',index)" class="game-title-icon el-icon-delete"></i>
                <i @click="changeArr('copy',index)" class="game-title-icon el-icon-tickets"></i>
                <i @click="changeArr('add',index)" class="game-title-icon el-icon-plus"></i>
            </div>

            <div v-show="tabShowStatus[index].show">
                <EditGamePublic :gameData="gameData" :item="item" :index="index" :resourceData="resourceData"
                                :tabShowStatus="tabShowStatus"
                                @updateResourceData="updateResourceData">
                </EditGamePublic>
                <EditGamePrivate :gameData="gameData" :item="item" :index="index" :resourceData="resourceData"
                                 :tabShowStatus="tabShowStatus" :tabShowLists="tabShowLists"
                                 @updateResourceData="updateResourceData">
                </EditGamePrivate>

                
            </div>
        </div>


        <div class="commentConfig">

            <div class="game-title" style="background: #383838;padding-left: 8px">
                <i :class="comment.index0?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabCommentShow('index0')"></i>
                <span @click="tabCommentShow('index0')">
                公共部分
                </span>
            </div>

            <div class="game-inner" v-show="comment.index0">
                <!-- 拖拽物入场动画-->
                <div class="game-title" style="background: #555;padding-left: 8px;margin-top:10px;width:100%;">
                    <i :class="comment.index1?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabCommentShow('index1')"></i>
                    <span @click="tabCommentShow('index1')">
                    交互效果
                    </span>
                </div>

                <div class="game-inner" v-show="comment.index1" style="background: #383838;margin-top:10px">
                    <div style="color:#fff;margin-top:10px;margin-bottom:10px;">拖拽物入场效果</div>
                    <div class="option-animate">
                        <div class="option-animate-radio">
                            <el-radio v-model="allData.one.comment.optionAn" 
                            style="width:100px;margin-left:10px;margin-bottom:10px;" 
                            :label="item2.label" 
                            :key="item2.label" 
                            v-for="(item2,index2) in enterAnimate">
                            {{item2.name}}
                            </el-radio>
                        </div>
                    </div>


                    <div style="color:#fff;margin-top:10px;margin-bottom:10px;">鼠标效果</div>
                    <div class="option-animate">
                        <div class="option-animate-radio">
                            <el-radio v-model="allData.one.comment.dragAn" 
                            style="width:100px;margin-left:10px;margin-bottom:10px;" 
                            :label="item2.label" 
                            :key="item2.label" 
                            v-for="(item2,index2) in mouseEnterAnimate">
                            {{item2.name}}
                            </el-radio>
                        </div>
                    </div>
                        
                    
               
                </div>

                <div class="game-title" style="background: #555;padding-left: 8px;margin-top:10px;width:100%;">
                    <i :class="comment.index2?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabCommentShow('index2')"></i>
                    <span @click="tabCommentShow('index2')">
                    按钮
                    </span>
                </div>

                <div class="game-inner" v-show="comment.index2" style="background: #383838;margin-top:10px">
                    <div style="color:#fff;margin-top:10px;margin-bottom:10px;">下一题</div>
                    <div class="upload">
                        <div class="img-box">
                            <img :src="resourceData[allData.one.comment.btnMap.nextBtn.name]" alt="" width="131" height="96">
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadCommentImage('btnMap','nextBtn',$event)">
                            </div>
                        </div>
                    </div>
                    
                    <div style="width:100%;float:left;" ref="commonWH" class="commonWH">
                    <el-input placeholder="" style="width:40%;"
                        v-model="Fwidth[0].width" 
                        @input="change(0,'width',$event)"
                        @change="change(0,'width',$event)"
                        @focus="focusWidth(0,$event)"

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

                    <el-input placeholder="" style="width:40%;"
                     

                         v-model="Fheight[0].height" 
                        @input="change(0,'height',$event)"
                        @change="change(0,'height',$event)"
                        @focus="focusHeight(0,$event)"
                        size="mini">
                        <template slot="prepend">H :</template>
                    </el-input>
                    </div>

                    <el-input placeholder="" v-model="allData.one.comment.btnMap.nextBtn.x" 
                    @input="posX('x',$event)"
                    size="mini">
                        <template slot="prepend">X :</template>
                    </el-input>
                    <el-input placeholder="" v-model="allData.one.comment.btnMap.nextBtn.y" 
                    @input="posX('y',$event)"
                    size="mini">
                        <template slot="prepend">Y :</template>
                    </el-input>                    

                    <div style="clear:both;width:100%;height:20px;"></div>

                    <div style="color:#fff;margin-top:10px;margin-bottom:10px;">按钮</div>
                    <div class="upload" >
                        <div class="img-box">
                            <img :src="resourceData[allData.one.comment.btnMap.submitBtn.name]" alt="" width="131" height="96">
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadCommentImage('btnMap','submitBtn',$event)">
                            </div>
                        </div>
                    </div>
                    
                    <div style="width:100%;float:left;" ref="commonWH" class="commonWH">
                    <el-input placeholder="" 
                    style="width:40%;"
                        v-model="Fwidth[1].width" 
                        @input="change(1,'width',$event)"
                        @change="change(1,'width',$event)"
                        @focus="focusWidth(1,$event)"
                        size="mini">

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



                    <el-input placeholder="" 
                    style="width:40%;"
                    v-model="Fheight[1].height" 
                        @input="change(1,'height',$event)"
                        @change="change(1,'height',$event)"
                        @focus="focusHeight(1,$event)"
                    
                    size="mini">
                        <template slot="prepend">H :</template>
                    </el-input>

                    </div>
                    <el-input placeholder="" v-model="allData.one.comment.btnMap.submitBtn.x" 
                    @input="posX('x',$event)"
                    size="mini">
                        <template slot="prepend">X :</template>
                    </el-input>
                    <el-input placeholder="" v-model="allData.one.comment.btnMap.submitBtn.y" 
                    @input="posX('y',$event)"
                    size="mini">
                        <template slot="prepend">Y :</template>
                    </el-input>  



                </div>


                <div class="game-title" style="background: #555;padding-left: 8px;margin-top:10px;width:100%;">
                    <i :class="comment.index3?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabCommentShow('index3')"></i>
                    <span @click="tabCommentShow('index3')">
                    放置音效
                    </span>
                    <el-switch style="float:right;margin-top:13px;"
                        v-model="allData.one.comment.audioSrc.show"
                        active-color="#77DC04"
                        inactive-color="#ff4949">
                    </el-switch>
                </div>

                <div class="game-inner" v-show="comment.index3" style="background: #383838;margin-top:10px">
                    <div class="upload">
                        <span class="file-title">音频文件：</span>
                        <div class="animate-box" style="width:30%;">
                            <span v-text="allData.one.comment.audioSrc.name"></span>
                        </div>
                        <div class="upload-btn" style="float:left;">
                            <div class="upload-btn-file">
                                <span>更改音频</span>
                                <input type="file" @change="uploadCommentAudio('audioSrc',$event)">
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>

    </div>
    
</template>
<script>
    import EditGamePublic from './EditGamePublic'
    import EditGamePrivate from '@/components/EditGamePrivate'
    import {enterAnimate,rightAnimate,wrongAnimate,mouseEnterAnimate,outAnimate} from '@/components/libs/publicData'

    export default {
        name: "EditGame",
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

                gameData: null,
                showStatus: false,
                tabShowStatus: [],
                resourceData: null,
                comment:{
                    index0:false,
                    index1:false,
                    index2:false,
                    index3:false,
                    index4:false,
                    index5:false
                },
                enterAnimate:enterAnimate,
                mouseEnterAnimate:mouseEnterAnimate,
                tabShowLists: {
                    bgImage: false,
                    stemImg: false,
                    subTitle: false,
                    option: false,
                    option1: false,
                    option2: false,
                    option3: false,
                    option4: false,
                    option5: false,
                    option6: false,
                    option7: false,
                    option8: false,
                    option9: false,
                    option10: false
                }
            }
        },
        props:['allData'],
        watch:{
            Fwidth:{
                handler:function(){
                    this.allData.one.comment.btnMap.nextBtn.width = this.Fwidth[0].width;
                    this.allData.one.comment.btnMap.nextBtn.height = this.Fheight[0].height;
                  
                },deep:true
            },
            Fheight:{
                handler:function(){
                    this.allData.one.comment.btnMap.submitBtn.width = this.Fwidth[1].width;
                    this.allData.one.comment.btnMap.submitBtn.height = this.Fheight[1].height;
                },deep:true
            }
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
                console.log(value,this.proportion)
                if(names == 'width'){
                    
                    this.Fwidth[index].width = value;
                    console.log("1111111",this.Fwidth,'2222222',this.Fheight)

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




            uploadCommentImage( key, name, e){
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
                    this.allData.one.comment[key][name].name = res.resourceName;
                    
                    this.allData.one.comment[key][name].width = res.width;
                    this.allData.one.comment[key][name].height = res.height;
                    this.updateResourceData();
                })
            },
            uploadCommentAudio(key,e) {
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
                    this.allData.one.comment[key].name = res.resourceName;
                }
                )
            },
            tabCommentShow(name){
                this.comment[name] = !this.comment[name];
            },

            getJSON() {
                this.getResourceData(() => {
                    this.showStatus = true;
                });
                this.gameData = this.allData.sources;
                this.tabShowStatus = [];
                this.gameData.forEach((item, index) => {
                    this.tabShowStatus.push({
                        show: false,
                        child: JSON.parse(JSON.stringify(this.tabShowLists))
                    })
                });
            },
            getResourceData(callback) {
                this.$http.get('/getResourceJSON', {params: {}}).then((res) => {
                    this.resourceData = res;
                    if (callback) {
                        callback();
                    }
                })
            },
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
            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                let nameTab = this.tabShowStatus[index].show;
                Object.keys(this.tabShowStatus[index].child).forEach((item,index1)=>{
                    this.tabShowStatus[index].child[item] = false
                })
                if (nameTab) {
                    this.tabShowStatus[index].show = false;
                    title.className = 'el-icon-arrow-right'
                } else {
                    this.tabShowStatus.forEach((item,index1)=>{
                        this.tabShowStatus[index1].show = false
                    });
                    this.tabShowStatus[index].show = true;
                    title.className = 'el-icon-arrow-down'
                }
            },
            updateResourceData() {
                this.getResourceData();
            }
        },
        mounted() {
            this.getJSON();

            this.Fwidth[0].width = Math.round(this.allData.one.comment.btnMap.nextBtn.width);
            this.Fheight[0].height = Math.round(this.allData.one.comment.btnMap.nextBtn.height);
      
            this.Fwidth[1].width = Math.round(this.allData.one.comment.btnMap.submitBtn.width);
            this.Fheight[1].height = Math.round(this.allData.one.comment.btnMap.submitBtn.height);

        },
        components: {
            EditGamePublic: EditGamePublic,
            EditGamePrivate: EditGamePrivate,
        }
    }
</script>
<style lang="scss">
    .game-title {
        height: 40px;
        line-height: 40px;
        background: #555555;
        margin-top: 15px;
        padding-left: 15px;
        color: #fff;
        padding-right: 8px;
        i, span {
            cursor: pointer;
        }
    }
    .game-title-icon {
        float: right;
        font-size: 18px;
        margin: 10px 4px;
        cursor: pointer;
    }
    .game-inner {
        padding: 15px;
        padding-top: 0;
        overflow: hidden;
    }

</style>