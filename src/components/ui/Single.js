import {Application,Container,Graphics,Sprite, Point} from 'pixi.js';
import { getAnimation, getSound, load, createSprite,  getTexture} from '../../loader';
import {TweenLite,TimeLine,TweenMax, TimelineMax, Power1} from 'gsap';
import {AnswerInfo,Loading,Question} from 'xes-answer';
import { Store} from 'vuex';
import STEMTITLE from 'xes-subtitle';
import GAME from "xes-game";
import Animate from 'xes-animate';

class Single{
    constructor(){

        this.pixiStage = null;
        this.currentTarget = null;
        this.targetArr = []; //拖拽区域存储
        this.dragArr = []; //拖拽物存储
        this.contentBox = null;
        this.currentArea = null;

        this.drag_width = null;
        this.drag_height = null;
        this.area_width = null;
        this.area_height = null;
        this.stemTarget = null;

        this.rightAnswer = [];//正确答案存放
        this.styleText = null;
        this.textContainer = null;
     
        this.nextBtn = null;
        this.submit = null;
      
        this.errorSpArr = [];
        this.errorContainer = null;

        this.mouse = null;
        this.complete = false;
    }

    exec(){
        this.pixiStage = stage.children[0];
        this.init(store.state.pageNum);
        
        stage.on('pointermove',this.moveTarget.bind(this))
        stage.on('pointerup',this.leaveMoveTarget.bind(this))
    }

    init(pageNum){

        console.log("开始初始化第"+pageNum+"页内容");
        let _that = this;
        

        
        if(pageNum!=0){
            console.log('页数是:',pageNum);

            stage.removeChild(_that.pixiStage);

            _that.pixiStage = new GAME(question.sources[pageNum].bgImage, question.sources[pageNum].stemImg, res);
            let stemTitle = new STEMTITLE(question.sources[pageNum].subTitle, res);
            _that.pixiStage.addChild(stemTitle);
            this.targetArr = []; 
            _that.contentBox = null;
            _that.contentBox = new Container();
            this.contentBox.texts = new Container();
            
            _that.pixiStage.addChild(_that.contentBox);
            
            stage.addChild(_that.pixiStage);
            stage.setChildIndex(_that.pixiStage,0)

        }else{

            this.contentBox = new Container();
            this.contentBox.texts = new Container();
            
            this.pixiStage.addChild(this.contentBox);
        }
        console.log('hhhh',stage);
        console.log(this.pixiStage);

        this.styleText = {
            fontFamily: 'Arial',
            fontSize: question.sources[store.state.pageNum].textStyle.fontSize+'px',
            fontWeight: 'normal',
            fill: question.sources[store.state.pageNum].textStyle.color,
        }


        this.drag_width = parseInt(question.sources[pageNum].drags.dragsCommon.width);
        this.drag_height = parseInt(question.sources[pageNum].drags.dragsCommon.height);
        this.area_width = parseInt(question.sources[pageNum].targetArea.targetCommon.common.width)
        this.area_height = parseInt(question.sources[pageNum].targetArea.targetCommon.common.height)

        //按钮
        this.nextBtn = new PIXI.Sprite.fromImage(res[question.one.comment.btnMap.nextBtn.name].url);
        this.submit = new PIXI.Sprite.fromImage(res[question.one.comment.btnMap.submitBtn.name].url);

        this.nextBtn.anchor.set(0.5);
        this.nextBtn.x = parseInt(question.one.comment.btnMap.nextBtn.x) + parseInt(question.one.comment.btnMap.nextBtn.width)/2;
        this.nextBtn.y = parseInt(question.one.comment.btnMap.nextBtn.y) + parseInt(question.one.comment.btnMap.nextBtn.height)/2;
        this.nextBtn.width = parseInt(question.one.comment.btnMap.nextBtn.width);
        this.nextBtn.height = parseInt(question.one.comment.btnMap.nextBtn.height);
        this.nextBtn.setWidth = parseInt(question.one.comment.btnMap.nextBtn.width);
        this.nextBtn.setHeight = parseInt(question.one.comment.btnMap.nextBtn.height);

        this.submit.anchor.set(0.5);
        this.submit.x = parseInt(question.one.comment.btnMap.submitBtn.x) + parseInt(question.one.comment.btnMap.submitBtn.width)/2;
        this.submit.y = parseInt(question.one.comment.btnMap.submitBtn.y) + parseInt(question.one.comment.btnMap.submitBtn.height)/2;
        this.submit.width = parseInt(question.one.comment.btnMap.submitBtn.width);
        this.submit.height = parseInt(question.one.comment.btnMap.submitBtn.height);
        this.submit.setWidth = parseInt(question.one.comment.btnMap.submitBtn.width);
        this.submit.setHeight = parseInt(question.one.comment.btnMap.submitBtn.height);

        _that.contentBox.addChild(this.nextBtn,this.submit);
        
        //判断按钮
        if(pageNum < question.sources.length -1){
            this.nextBtn.alpha = 1;
            this.submit.alpha = 0;   
            this.nextBtn.interactive = true;
            this.submit.interactive = false;

            this.nextBtn.on('pointerover',_that.overAndScale)
            this.nextBtn.on('pointerout',_that.outAndScale)
            this.nextBtn.on('pointerdown',_that.nextPage.bind(this))
        }else{
            this.nextBtn.alpha = 0;
            this.submit.alpha = 1;

            this.submit.interactive = true;
            this.nextBtn.interactive = false;

            this.submit.on('pointerover',_that.overAndScale)
            this.submit.on('pointerout',_that.outAndScale)
            this.submit.on('pointerdown',_that.submitAnswer.bind(this))
        }
        

        question.sources[pageNum].drags.dragsOption.map((item,index)=>{ //初始化拖拽物
            if(item.image.name == ''){
                // console.log("空空")
                return;
            }else{
                let drag = new PIXI.Sprite.fromImage(res[item.image.name].url);
                if(item.image.x == '' || item.image.y == ''){
                    drag.x = 0;
                    drag.y = 0;
                }else{
                    drag.anchor.set(0.5,0.5);
                    drag.name = item.image.name;
                    drag.width = _that.drag_width;
                    drag.height = _that.drag_height;
                    drag.text = String(index+1);
                    drag.x = parseInt(item.image.x) + _that.drag_width/2;
                    drag.y = parseInt(item.image.y) + _that.drag_height/2;

                    drag.setWidth = _that.drag_width;
                    drag.setHeight = _that.drag_height;

                    drag.downWidth = _that.area_width;
                    drag.downHeight = _that.area_height;

                    drag.startX = parseInt(item.image.x) + _that.drag_width/2;
                    drag.startY = parseInt(item.image.y) + _that.drag_height/2;

                    drag.disX = null;
                    drag.disY = null;
                    drag.downPosition = null;
                    drag.newPosition = null;
                   

                    drag.upX = null;
                    drag.upY = null;



                    drag.draging = false;
                    drag.over = false;
                    drag.stem = null;
                    drag.complete = false;
                    
                    drag.downX = null;
                    drag.downY = null;

                    drag.isover = null;
                    
                    if(question.one.comment.optionAn !== ''){
                        new Animate(drag,{
                            "type":question.one.comment.optionAn,
                            "delay":Math.random()*.3
                        });
                    }
                }
                _that.dragArr.push(drag);
                _that.contentBox.addChild(drag);

                drag.interactive = true;

              
     
                if(question.one.comment.dragAn == 'bomb'){
                
                    drag.on('pointerover',_that.overAndScale_bomb);
                }else{
                    drag.on('pointerover',_that.overAndScale);

                }
               
                drag.on('pointerout',_that.outAndScale);
                drag.on('pointerdown',_that.getCurrentTarget.bind(this));
            }
        });

        console.log("3333",question.sources[pageNum].targetArea.targetOption.length)
        question.sources[pageNum].targetArea.targetOption.map((item,index)=>{ //初始化目标区域

            if(question.sources[pageNum].targetArea.targetCommon.default.image.name){
                
                let targetSprit = new PIXI.Sprite.fromImage(res[question.sources[pageNum].targetArea.targetCommon.default.image.name].url);
                targetSprit.default = PIXI.Texture.fromImage(question.sources[pageNum].targetArea.targetCommon.default.image.name);
                targetSprit.touch = PIXI.Texture.fromImage(question.sources[pageNum].targetArea.targetCommon.touch.image.name);
                targetSprit.error = PIXI.Texture.fromImage(question.sources[pageNum].targetArea.targetCommon.error.image.name);
                
                targetSprit.anchor.set(0.5,0.5);

                targetSprit.width = _that.area_width;
                targetSprit.height = _that.area_height;

                targetSprit.x = parseInt(item.x) + _that.area_width/2;
                targetSprit.y = parseInt(item.y) + _that.area_height/2;
                targetSprit.haveStuas = false;
                targetSprit.stem = null;
                targetSprit.ids = index;
                targetSprit.isback = null;
                targetSprit.rightAnswer = item.rightDrag;

                
                // targetSprit.rightAsSprite = new PIXI.Text(item.rightDrag,_that.styleText);//标记答案
                // targetSprit.rightAsSprite.x = parseInt(item.x) + _that.area_width - targetSprit.rightAsSprite.width -10 ;
                // targetSprit.rightAsSprite.y = parseInt(item.y) + _that.area_height - targetSprit.rightAsSprite.height - 10;
                // targetSprit.rightAsSprite.alpha = 0;
                

                // targetSprit.errorSprite = new PIXI.Sprite.fromImage(res[question.sources[pageNum].targetArea.targetCommon.error.image.name].url);
                // targetSprit.errorSprite.anchor.set(0.5);

                // targetSprit.errorSprite.width = _that.area_width;
                // targetSprit.errorSprite.height = _that.area_height;

                // targetSprit.errorSprite.x = parseInt(item.x) + _that.area_width/2;
                // targetSprit.errorSprite.y = parseInt(item.y) + _that.area_height/2;
                // targetSprit.errorSprite.alpha = 0;
              
                
            
                // _that.errorContainer.addChild(targetSprit.errorSprite);
                // _that.contentBox.addChild(_that.errorContainer);
               
                // _that.textContainer.addChild(targetSprit.rightAsSprite);
                // _that.contentBox.addChild(_that.textContainer);
               
                _that.contentBox.addChild(targetSprit);
                _that.targetArr.push(targetSprit);

            }else{
                return;
            }

           
        })

    }

    overAndScale_bomb(ev){
        
        let target = ev.currentTarget;
        target.isover = new Animate(target,{
            "type":question.one.comment.dragAn,
            "delay":Math.random()*.1
        });
        target.type == 'btn' ? target.cursor = 'pointer':target.cursor = '-webkit-grab';
        // TweenLite.to(target,.3,{width:1.05*target.width,height:1.05*target.height,alpha:0.9})
    }


    overAndScale(ev){ //缩放对象
        let target = ev.currentTarget;
        target.type == 'btn'?target.cursor = 'pointer':target.cursor = '-webkit-grab';
        TweenLite.to(target,.3,{width:1.05*target.width,height:1.05*target.height,alpha:0.9})
    }

    outAndScale(ev){ //缩放对象
        let target = ev.currentTarget;
        if(target.over){
            TweenLite.to(target,.3,{width:target.downWidth,height:target.downHeight,alpha:1});
        }else{
            TweenLite.to(target,.3,{width:target.setWidth,height:target.setHeight,alpha:1});
        }
    }

    
    getCurrentTarget(ev){ //获取当前对象

        let _that = this;
        if(!_that.complete){

            _that.currentTarget = ev.currentTarget; //获取当前对象
            console.log("down");
            if(!_that.currentTarget.draging && _that.currentTarget){
    
                _that.currentTarget.downX = _that.currentTarget.x; //记录按下的坐标
                _that.currentTarget.downY = _that.currentTarget.y;
    
                _that.currentTarget.downPosition = ev.data.getLocalPosition(stage);
                _that.currentTarget.disX = _that.currentTarget.downPosition.x - _that.currentTarget.x;
                _that.currentTarget.disY = _that.currentTarget.downPosition.y - _that.currentTarget.y;
                
                
                // TweenLite.to(_that.currentTarget,.4,{width:_that.currentTarget.downWidth,height:_that.currentTarget.downHeight,alpha:0.9}) //点击恢复当前对象初始大小
              
    
                _that.currentTarget.draging = true;
                _that.complete = true;
            }
        }
    }

    moveTarget(ev){
        let _that = this;
    
        if(_that.currentTarget && _that.currentTarget.draging && _that.complete){
            _that.currentTarget.newPosition = ev.data.getLocalPosition(stage);
            
            if(_that.currentTarget.newPosition.x>10&&_that.currentTarget.newPosition.x<1910&&_that.currentTarget.newPosition.y>10&&_that.currentTarget.newPosition.y<1070){ //在当前可视范围内操作
                _that.currentTarget.cursor = '-webkit-grabbing';

                _that.currentTarget.x = _that.currentTarget.newPosition.x - _that.currentTarget.disX;
                _that.currentTarget.y = _that.currentTarget.newPosition.y - _that.currentTarget.disY;
                
                
                _that.contentBox.setChildIndex(_that.currentTarget,_that.contentBox.children.length-1);

                TweenLite.to(_that.currentTarget,.4,{width:_that.currentTarget.downWidth,height:_that.currentTarget.downHeight,alpha:0.9}) //点击恢复当前对象初始大小
                // _that.currentTarget.width = _that.currentTarget.downWidth;
                // _that.currentTarget.height = _that.currentTarget.downHeight;

                _that.stemTarget = null;
               
                _that.targetArr.map((item,index)=>{
                    if(_that.hitTarget(_that.currentTarget,item)){
                        console.log('碰到了');

                        // _that.currentTarget.width = _that.currentTarget.downWidth;
                        // _that.currentTarget.height = _that.currentTarget.downHeight;

                        item.texture = item.touch;
                        _that.stemTarget = item;
                        
                    }else{
                        console.log('没碰到');
                        item.texture = item.default;
                        // _that.currentTarget.width = _that.currentTarget.setWidth;
                        // _that.currentTarget.height = _that.currentTarget.setHeight;
                    }
                })

                
                
            }else{
                // _that.currentTarget.x = _that.currentTarget.startX;
                // _that.currentTarget.y = _that.currentTarget.startY;

                TweenLite.to(_that.currentTarget,.4,{x:_that.currentTarget.startX,y:_that.currentTarget.startY,alpha:1,onComplete:function(){
                    _that.currentTarget.width = _that.currentTarget.setWidth;
                    _that.currentTarget.height = _that.currentTarget.setHeight;

                    _that.currentTarget.draging = false;  
                    _that.complete = false;
                }});
            }
        }
    }

    leaveMoveTarget(ev){
        let _that = this;
        if(_that.currentTarget){

            _that.currentTarget.draging = false;  
            _that.currentTarget.upX = _that.currentTarget.x; //记录抬起的坐标
            _that.currentTarget.upY = _that.currentTarget.y;

            if(_that.stemTarget){ //碰到

                if(question.one.comment.audioSrc.show){

                    res[question.one.comment.audioSrc.name].sound.play(); //播放声音
                }

                if(_that.currentTarget.stem == null){ //判断拖拽物里的stem情况
                    if(_that.stemTarget.stem == null && !_that.stemTarget.haveStuas){
                        _that.currentTarget.width = _that.currentTarget.downWidth;
                        _that.currentTarget.height = _that.currentTarget.downHeight;

                        TweenLite.to(_that.currentTarget,.4,{x:_that.stemTarget.x,y:_that.stemTarget.y,alpha:1,onComplete:function(){
                            _that.complete = false;
                        }});
    
                        _that.copyDragSprite(); //复制新的元素
                                           
                        _that.stemTarget.stem = _that.currentTarget;
                        _that.currentTarget.stem = _that.stemTarget; 
                        _that.stemTarget.haveStuas = true;
    
                        _that.currentTarget.over = true;
                        _that.currentTarget = null;
                        _that.stemTarget = null;
                        
                    }else{
                        
                        console.log("rrrr",this.stemTarget.stem)
                        if(this.stemTarget.stem && (_that.currentTarget.text == _that.stemTarget.stem.text) ){
                            console.log('相同的，返回')
                        _that.currentTarget.width = _that.currentTarget.setWidth;
                        _that.currentTarget.height = _that.currentTarget.setHeight;

                            TweenLite.to(_that.currentTarget,.4,{x:_that.currentTarget.startX,y:_that.currentTarget.startY,alpha:1,onComplete:function(){
                                _that.currentTarget.width = _that.currentTarget.setWidth;
                                _that.currentTarget.height = _that.currentTarget.setHeight;

                                _that.complete = false;

                            }});
                            
                        }else{
                            _that.currentTarget.width = _that.currentTarget.downWidth;
                            _that.currentTarget.height = _that.currentTarget.downHeight;

                            _that.contentBox.removeChild(_that.stemTarget.stem);
                            TweenLite.to(_that.currentTarget,.4,{x:_that.stemTarget.x,y:_that.stemTarget.y,alpha:1,onComplete:function(){
                              _that.complete = false;

                            }});
        
                            _that.copyDragSprite(); //复制新的元素
        
                                               
                            _that.stemTarget.stem = _that.currentTarget;
                            _that.currentTarget.stem = _that.stemTarget; 
                            _that.stemTarget.haveStuas = true;
        
                            _that.currentTarget.over = true;
                            _that.currentTarget = null;
                            _that.stemTarget = null;
                        }

                    }
                    
                }else{

                    if(_that.currentTarget.downX == _that.currentTarget.upX && _that.currentTarget.downY == _that.currentTarget.upY){
                        console.log('没有移动');
                        _that.complete = false;
                    }else{
                        console.log('移动了')
                        if(_that.stemTarget.stem && _that.stemTarget.haveStuas){ //交换元素
                            console.log("交换");
                            _that.complete = false;
                            if(_that.currentTarget.stem){
                                _that.currentTarget.width = _that.currentTarget.downWidth;
                                _that.currentTarget.height = _that.currentTarget.downHeight;
                                //放置当前对象
                                TweenLite.to(_that.currentTarget,.4,{x:_that.stemTarget.x,y:_that.stemTarget.y,alpha:1,onComplete:function(){
                                    _that.complete = false;

                                }});
        
                                //移动空中的对象
                                TweenLite.to(_that.stemTarget.stem,.3,{x:_that.currentTarget.stem.x,y:_that.currentTarget.stem.y})
        
                                //更改绑定状态
                                
                                _that.stemTarget.stem.stem = _that.currentTarget.stem;
                                _that.currentTarget.stem.stem = _that.stemTarget.stem;
                                _that.currentTarget.stem.haveStuas = true;
                                _that.stemTarget.stem.over = true;
                                
        
                                _that.currentTarget.stem = _that.stemTarget;
                                _that.stemTarget.stem = _that.currentTarget;
                                _that.stemTarget.haveStuas = true;
                                _that.currentTarget.over = true;
                                _that.currentTarget = null;
                                _that.stemTarget = null;
    
                            }
    
                        }else{
                           
                            TweenLite.to(_that.currentTarget,.4,{x:_that.stemTarget.x,y:_that.stemTarget.y,alpha:1,onComplete:function(){
                                _that.complete = false;

                            }});
                            _that.currentTarget.stem.haveStuas = false;
                            _that.currentTarget.stem.stem = null;
    
                            _that.stemTarget.stem = _that.currentTarget;
                            _that.currentTarget.stem = _that.stemTarget; 
                            _that.stemTarget.haveStuas = true;
    
                            _that.currentTarget.over = true;
                            _that.currentTarget = null;
                            _that.stemTarget = null;
    
                        }
                    }
                  
                }
                
            }else{ //没有碰到返回
                
                // if(_that.currentTarget.stem){
                //     _that.contentBox.removeChild(_that.currentTarget);
                    
                //     // _that.currentTarget.stem.texture = _that.currentTarget.stem.default;
                // }
                console.log('返回');

                if(_that.currentTarget.downX == _that.currentTarget.upX && _that.currentTarget.downY == _that.currentTarget.upY){
                    console.log('没有移动');
                    
                    // TweenLite.to(_that.currentTarget,.4,{x:_that.currentTarget.startX,y:_that.currentTarget.startY,alpha:1,onComplete:function(){
                    //     _that.currentTarget.width = _that.currentTarget.setWidth;
                    //     _that.currentTarget.height = _that.currentTarget.setHeight;
                    //     _that.currentTarget.stem = null;
                    //     _that.currentTarget.over = false;
                    //     _that.currentTarget = null;
                    //     _that.stemTarget = null;

                    //     _that.complete = false;
                        
                    // }});
                    _that.complete = false;
                   

                }else{
                    console.log('移动了')
                    // _that.currentTarget.width = _that.currentTarget.setWidth;
                    // _that.currentTarget.height = _that.currentTarget.setHeight;

                    TweenLite.to(_that.currentTarget,.4,{x:_that.currentTarget.startX,y:_that.currentTarget.startY,alpha:1,onComplete:function(){
                        _that.currentTarget.width = _that.currentTarget.setWidth;
                        _that.currentTarget.height = _that.currentTarget.setHeight;
                        _that.currentTarget.stem = null;
                        _that.currentTarget.over = false;
                        _that.currentTarget = null;
                        _that.stemTarget = null;

                        _that.complete = false;
                        
                    }});

                    if(_that.currentTarget.stem){
                        // TweenLite.to(_that.currentTarget,.4,{x:_that.currentTarget.startX,y:_that.currentTarget.startY,alpha:1,onComplete:function(){
                        // }});
                        _that.currentTarget.stem.stem = null;
                        _that.contentBox.removeChild(_that.currentTarget);
                       
                    }
                    
                }


                
            }
            

        }
    }

    hitTarget(item,target){ //碰撞检测
  

        if(
            (item.newPosition.x + item.width-item.disX-item.width/2) < target.x ||
            (item.newPosition.x - item.disX - item.width/2) > target.x ||
            (item.newPosition.y + item.height-item.disY-item.height/2) < target.y  ||
           ( item.newPosition.y - item.disY - item.height/2) > target.y 
        ){
            return false;
        }else{
            return true;
        }
        
        // if(
        //     (item.newPosition.x) > target.x - target.width/2 &&
        //     (item.newPosition.x) < (target.x+target.width/2) &&
        //     (item.newPosition.y) > target.y - target.height/2 &&
        //     (item.newPosition.y) < target.y+target.height/2
        // ){
        //     return true;
        // }else{
        //     return false;
        // }
    }


    copyDragSprite(){
        console.log("复制新元素了...")
        let _that = this;
        let option = new PIXI.Sprite.fromImage(res[_that.currentTarget.name].url);
        option.name = _that.currentTarget.name;
        option.anchor.set(0.5,0.5);
        option.text = _that.currentTarget.text;
        option.width = _that.drag_width;
        option.height = _that.drag_height;

        option.x = _that.currentTarget.startX;
        option.y = _that.currentTarget.startY;
        console.log(option.x,option.y)

        option.setWidth = _that.drag_width;
        option.setHeight = _that.drag_height;

        option.downWidth = _that.area_width;
        option.downHeight = _that.area_height;

        option.startX = _that.currentTarget.startX;
        option.startY = _that.currentTarget.startY;

        option.disX = null;
        option.disY = null;
        option.downPosition = null;
        option.newPosition = null;
    

        option.upX = null;
        option.upY = null;

        option.draging = false;
        option.over = false;
        option.stem = null;
        option.complete = false;
        

        option.downX = null;
        option.downY = null;
        _that.contentBox.addChild(option);

        
        option.interactive = true;
        if(question.one.comment.dragAn == 'bomb'){
                
            option.on('pointerover',_that.overAndScale_bomb);
        }else{
            option.on('pointerover',_that.overAndScale);

        }
        option.on('pointerout',_that.outAndScale);
        option.on('pointerdown',_that.getCurrentTarget.bind(this));
    }


    nextPage(ev){
        let _that = this;
        let keyMap = false;
        let answer = new AnswerInfo();
   
       

        _that.targetArr.map((item,index)=>{ //判断正确

            let rightAsSprite = new PIXI.Text(item.rightAnswer,_that.styleText);//标记答案
            rightAsSprite.x = parseInt(item.x) + _that.area_width/2 - rightAsSprite.width -15 ;
            rightAsSprite.y = parseInt(item.y) + _that.area_height/2 - rightAsSprite.height - 15;

            _that.contentBox.texts.addChild(rightAsSprite);
            console.log(rightAsSprite,_that.contentBox.texts)

            if(item.stem && (item.rightAnswer == item.stem.text)){ //填了
                
                console.log("right");
                keyMap = true;
                _that.contentBox.texts.children[index].alpha = 0;

                
            }else{ //没有填
                if(question.sources[store.state.pageNum].targetArea.targetCommon.error.image.name){

                    let errorSprite = new PIXI.Sprite.fromImage(res[question.sources[store.state.pageNum].targetArea.targetCommon.error.image.name].url);
                    errorSprite.anchor.set(0.5);
    
                    errorSprite.width = _that.area_width;
                    errorSprite.height = _that.area_height;
    
                    errorSprite.x = parseInt(item.x) ;
                    errorSprite.y = parseInt(item.y) ;
                    _that.contentBox.addChild(errorSprite);
    
                    _that.blings(errorSprite); //闪烁
                }
                console.log("error");
                keyMap = false;

            }

        })

        

        if(question.sources[store.state.pageNum].textStyle.show){
            console.log('显示正确答案样式')
            _that.contentBox.addChild(_that.contentBox.texts)
            _that.contentBox.setChildIndex(_that.contentBox.texts,_that.contentBox.children.length-1)
            
        }
        if(keyMap){

            answer.init({   //提交本题答案
                type: 0,
                useranswer: '',
                answer: '',
                id: store.state.pageNum,
                rightnum: 1,
                wrongnum: 0
            })
            store.dispatch('pushToPostArr', answer);

        }else{

            answer.init({   //提交本题答案
                type: 0,
                useranswer: '',
                answer: '',
                id: store.state.pageNum,
                rightnum: 0,
                wrongnum: 1
            })
            store.dispatch('pushToPostArr', answer);
        }

       
        setTimeout(() => {
            store.state.pageNum++;
            _that.init(store.state.pageNum);
        }, 3000);
       

    }

    submitAnswer(ev){

        let _that = this;
        let keyMap = false;
        let answer = new AnswerInfo();
        
       
        _that.targetArr.map((item,index)=>{ //判断正确
            let rightAsSprite = new PIXI.Text(item.rightAnswer,_that.styleText);//标记答案
            rightAsSprite.x = parseInt(item.x) + _that.area_width/2 - rightAsSprite.width -10 ;
            rightAsSprite.y = parseInt(item.y) + _that.area_height/2 - rightAsSprite.height - 10;
            _that.contentBox.texts.addChild(rightAsSprite);

            if(item.stem && (item.rightAnswer == item.stem.text)){
                
                    console.log("right");
                    keyMap = true;
                    _that.contentBox.texts.children[index].alpha = 0;
            }else{
                    if(question.sources[store.state.pageNum].targetArea.targetCommon.error.image.name){
                        let errorSprite = new PIXI.Sprite.fromImage(res[question.sources[store.state.pageNum].targetArea.targetCommon.error.image.name].url);
                        errorSprite.anchor.set(0.5);
    
                        errorSprite.width = _that.area_width;
                        errorSprite.height = _that.area_height;
    
                        errorSprite.x = parseInt(item.x) ;
                        errorSprite.y = parseInt(item.y) ;
                        _that.contentBox.addChild(errorSprite);
    
                        _that.blings(errorSprite); //闪烁
                    }
                    console.log("error");   
                    keyMap = false;
                
            }

        })

     
        if(question.sources[store.state.pageNum].textStyle.show){
            console.log('显示正确答案样式')
            _that.contentBox.addChild(_that.contentBox.texts)
            _that.contentBox.setChildIndex(_that.contentBox.texts,_that.contentBox.children.length-1)
            

        }
        if(keyMap){

            answer.init({
                type: 0,
                useranswer: '',
                answer: '',
                id: store.state.pageNum,
                rightnum: 1,
                wrongnum: 0
            })
            store.dispatch('pushToPostArr', answer);
        }else{
            answer.init({
                type: 0,
                useranswer: '',
                answer: '',
                id: store.state.pageNum,
                rightnum: 0,
                wrongnum: 1
            })
            store.dispatch('pushToPostArr', answer);
        }

      


        
        setTimeout(() => {
            store.dispatch('postAnswer');
        }, 1500);
        
    }


    blings(obj){
        TweenLite.to(obj,.4,{
            alpha:1,
            onComplete:function(){
                TweenLite.to(
                    obj,
                    .3,
                    {
                        alpha:0,
                        onComplete:function(){
                            TweenLite.to(
                                obj,
                                .4,
                                {
                                    alpha:1,
                                    onComplete:function(){
                                        TweenLite.to(
                                            obj,
                                            .4,
                                            {alpha:0,
                                                onComplete:function(){
                                                    TweenLite.to(
                                                        obj,
                                                        0.4,
                                                        {alpha:1}
                                                    )
                                                }
                                            }
                                        )
                                    }
                                }
                            )
                        }
                    }
                )
            }
        })

    }
}
export {Single}