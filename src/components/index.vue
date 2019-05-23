<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
        <img src="static/images/logo.png" class="logo"/>
    </div>
</template>
<script>
    import {Application, Container, Graphics,Sprite,ParticleContainer} from 'pixi.js';
    import {getAnimation, load, reateSprite} from '../loader';
    import $store from '../store/index.js';
    import START from "xes-start";
    import STEMTITLE from 'xes-subtitle';
    import GAME from "xes-game";
    import {AnswerInfo,Loading,Question} from 'xes-answer';
    const pixiSound = require('pixi-sound');

    import {Single} from './ui/Single.js';

    export default {
        name: "start",
        data() {
            return {
                isShow: false,
                number:0
            }
        },
        methods: {
            createApp() {
                return new Application({
                    width: 1920,
                    height: 1080,
                    autoSize: true,
                    transparent: true //背景是否设为透明
                })
            }
        },
        components: {},
        created() {
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
        },
        destroyed() {
            PIXI.sound.stopAll();
            app.destroy();
        },
        mounted() {
            PIXI.sound.stopAll();
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
            window.app = this.createApp();
            app.view.style.width = '19.2rem';
            app.view.style.height = '10.8rem';
            window.stage = app.stage;
            const self = this;
            self.$refs.canvas.appendChild(app.view);
            stage.interactive = true;
            load().then(res => {
                console.log("%c资源加载完啦✌️", "color:#FF323B;font-weight:bold;");
                console.log(res);
                window.question = res.question.data;
                store.state.question = res.question.data
                store.state.testNum = question.sources.length;
                //干掉Loading
                let loading = document.getElementsByClassName('page-loading')[0];
                loading.style.display = 'none';
                //创建答题接口实例
                let answer = new AnswerInfo();
                //loading接口
                Loading();
                //初始化每题的答题数据
                //*************type:0(完成类或单选) type:1(多选) type:2(填空) */
                answer.answerDefault({type:0})
                //每小题的答题数据，该题加载完成前调用此方法
                Question({id:'0',currentTotalOption:'1'})
                //游戏页
               let start = new START(question.one.start, res);
               let Singles = new Single();

                if(!window.question.one.start.show){
                    let game = new GAME(question.sources[0].bgImage, question.sources[0].stemImg, res);
                    let stemTitle = new STEMTITLE(question.sources[0].subTitle, res);
                    game.addChild(stemTitle);
                    stage.addChild(game);
                    Singles.exec();

                }else{
                    stage.addChild(start);
                    start.button(()=>{
                        let game = new GAME(question.sources[0].bgImage, question.sources[0].stemImg, res);
                        let stemTitle = new STEMTITLE(question.sources[0].subTitle, res);
                        game.addChild(stemTitle);
                        stage.removeChild(start);
                        stage.addChild(game);
                        console.log(stage,"stage");
                        stage.setChildIndex(game,0);
                        console.log(window.stage.getChildByName('gameBgSound'),"哈哈1");
                        Singles.exec();

                    });
                }
                console.log(stage,"stage");
                // 如何渲染精灵序列图
                // let sheetName = start.startBg.sprite.name;//配置文件sprit.name
                // let frame = res[sheetName].spritesheet;
                // let frameArray = [];
                // for (let i in frame.textures) {
                //     frameArray.push(frame.textures[i]);
                // }
                // console.log(frameArray);
                // this.movieClip = new PIXI.extras.AnimatedSprite(frameArray);
                // this.movieClip.x = start.startBg.sprite.x;
                // this.movieClip.y = start.startBg.sprite.y;
                // this.movieClip.loop = start.startBg.sprite.loop;
                // this.movieClip.scale.set(start.startBg.sprite.scale);
                // this.movieClip.animationSpeed = 1;//播放速度，默认是1
                // this.movieClip.play();
                // this.startCon.addChild(this.movieClip);
                //example code
                //  answer.init({type: 2, useranswer:["A","C"], answer:["A","B"], id:0, rightnum:1, wrongnum:0});
                //  store.dispatch('pushToPostArr', answer);
                //  store.dispatch('postAnswer');
            })
        }
    }
</script>
<style scoped>

    .canvas {
        width: 19.2rem;
        height: 10.8rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -9.6rem;
        margin-top: -5.4rem;
    }
    .logo {
        position: absolute;
        z-index: 999;
        left: .5rem;
        bottom: .3rem;
        width: 1.9rem;
    }
</style>