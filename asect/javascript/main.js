// 1. render songs
    // 2.Scrool top
    // 3.play/pause/seek
    // 4.CD rolate
    // 5. Next / prev 
    // 6.Random
    // 7. Next/ repeat when end
    // 8. Active song
    // 9. Scro Active song
    // 10. Play song when click 
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



// -------const--------
const  playList = $('.playList')
const playBtn = $('.center-content-control-item-main')
const audio = $('.audio')
const nameSong = $('.center-content-header-name');
const single = $('.center-content-header-single');
const imgBig = $('.center-content-header-img div')
const nextBtn = $('.next-btn')
const backBtn = $('.back-btn')
const randomBtn = $('.random-btn')
const returnBtn = $('.return-btn')
const currentTime = $('.progess-value_current-time')
const totalTime = $('.progess-value_song-durion')
const progess = $('.progess-item')
const songs = $$('.song')
const cdThumb = $('.cd-thumb')
const banner1 = $('.bannerList-item-1 div')
const banner2 = $('.bannerList-item-2 div')
const banner3 = $('.bannerList-item-3 div')
console.log(songs)

// -----appp-----
const app = {
    isRandom: false,
    isRepeat: false,
    isPlayer: false,
    currentIndex : 0,
    banners : [
        '/asect/banner/banner1.jpg',
         '/asect/banner/banner2.jpg',
         '/asect/banner/banner3.jpg',
         '/asect/banner/banner4.jpg',
         '/asect/banner/banner5.jpg',
       '/asect/banner/banner6.jpg',

    ],
    songs : [
        {
            name:'Nevada',
            Stringer: 'vicetone',
            path: '/asect/music/Nevada.mp3',
            img: '/asect/image/nevada.jpg'
        },
        {
            name:'Summertime',
            Stringer: 'K-391',
            path: '/asect/music/Summertime.mp3',
            img: '/asect/image/summertime.jpg'
        },
        {
            name:'Monody',
            Stringer: 'Thefatrat',
            path: '/asect/music/Monody.mp3',
            img: '/asect/image/monody.jpg'
        },
        {
            name:'The spectre ',
            Stringer: 'Alan walker',
            path: '/asect/music/TheSpectre.mp3',
            img: '/asect/image/thespectre.jpg'
        },
        {
            name:'Faded',
            Stringer: 'Alan walker',
            path: '/asect/music/Faded.mp3',
            img: '/asect/image/faded.jpg'
        },
        {
            name:'Dance monkey',
            Stringer: 'Tones and I',
            path: '/asect/music/DanceMonkey.mp3',
            img: '/asect/image/dancemonkey.jpg'
        },
        {
            name:'Alone',
            Stringer: 'Alan walker',
            path: '/asect/music/Alone.mp3',
            img: '/asect/image/alone.jpg'
        },
        {
            name:'Đế vương',
            Stringer: 'Đình dũng',
            path: '/asect/music/DeVuong.mp3',
            img: '/asect/image/devuong.jpg'
        }
        ],
    render:function(){
        var htmls = this.songs.map(function(song,index){
            return `<div class="song ${index === app.currentIndex ? 'active': ''} " " data-index="${index}">
            <div class="thumb" style="background-image: url('${song.img}')">
            </div>
            <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.Stringer}</p>
            </div>
            <div class="option">
            <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`
        })
        playList.innerHTML = htmls.join('');
        },
        
        defineProperty: function(){
            Object.defineProperty(this,'currentSong', {
                get: function(){
                    return this.songs[this.currentIndex];
                }
            })
        } ,
        handleEvent: function(){
            _this = this ;
            const cdThumbAnimate = cdThumb.animate([
                {
                    transform: 'rotate(360deg)'
                }
                
            ],{
                duration:10000,
                iterations:Infinity
            })
            cdThumbAnimate.pause();
            // ------Play song----
            playBtn.onclick = function(){
                _this.isPlayer= !_this.isPlayer
                if(_this.isPlayer){
                    audio.play();
                }else{
                    audio.pause();
                }
               
            }
            audio.onplay = function(){
                playBtn.classList.add('play');
                cdThumbAnimate.play();
            }
            audio.onpause = function(){
                playBtn.classList.remove('play');
                cdThumbAnimate.pause();
            }
            // -----next song----
            nextBtn.onclick = function(){
                _this.currentIndex++;
               
                if(_this.currentIndex > _this.songs.length -1){
                    _this.currentIndex =0;
                }
                if(_this.isRandom){
                    do{
                        _this.currentIndex= Math.floor(Math.random()*_this.songs.length)

                    }while(_this.currentIndex==_this.songs.currentIndex)
                }
                _this.loadCurrentsong();
                _this.render();
                audio.play();
                
            }
            backBtn.onclick = function(){
                _this.currentIndex--;
               
                if(_this.currentIndex < 0){
                    _this.currentIndex = _this.songs.length - 1;
                }
                if(_this.isRandom){
                    do{
                        _this.currentIndex= Math.floor(Math.random()*_this.songs.length)

                    }while(_this.currentIndex==_this.songs.currentIndex)

                }
                _this.loadCurrentsong();
                _this.render();
               
                audio.play();
            }
           
            // -------seek -----
            audio.ontimeupdate = function(){
                
                var a = Math.floor(audio.currentTime);
                var y = Math.floor(a / 60 )
                var x = a- 60*y;
                currentTime.innerHTML = `${y}: ${x}`
              
               var c = Math.floor(audio.duration)
               if(!c){
                   c=0;
               }
               totalTime.innerHTML = `${Math.floor(c/60)}: ${c-Math.floor(c/60)*60}`
               progess.value = a / c *100;
               progess.onchange = function(e){
                   audio.currentTime = Math.floor(e.target.value / 100 *c)
               }
            }
            randomBtn.onclick = function(){
                _this.isRandom=!_this.isRandom
                randomBtn.classList.toggle("active")
            }
            returnBtn.onclick = function(){
                _this.isRepeat = !_this.isRepeat
                returnBtn.classList.toggle("active")
            }
            audio.onended = function(){
                if(_this.isRepeat){
                    audio.play()
                }else{
                    nextBtn.click();
                }
            }
            // song.onclick= function(){
            //     console.log(song.getAttribute('data-index'))
            // }
            playList.onclick = function(e){
                const nodeSong = e.target.closest('.song:not(.active)');
                if(nodeSong || e.target.closest('.option')){
                    _this.currentIndex = Number(nodeSong.dataset.index);
                    _this.loadCurrentsong()
                    _this.render()
                    audio.play()
                }
            }
            // ------ set banner----

        },
        setbanner : function(){
            var x = 0;
            var y=1;
            var z = 2;
          
         
            setInterval(function(){
                banner1.style.backgroundImage = `url(${app.banners[x]})`
                banner2.style.backgroundImage = `url(${app.banners[y]})`
                banner3.style.backgroundImage = `url(${app.banners[z]})`
                x++;
                y++;
                z++;
                if(x>app.banners.length-1){
                    x=0
                }
                if(y>app.banners.length-1){
                    y=0
                }
                if(z>app.banners.length-1){
                    z=0
                }
            },3000)
        },
        loadCurrentsong: function(){
            nameSong.textContent = this.currentSong.name
            single.textContent = this.currentSong.Stringer
            audio.src = this.currentSong.path
            imgBig.style.backgroundImage = `url(${this.currentSong.img})`
            cdThumb.style.backgroundImage = `url(${this.currentSong.img})`
            
            var c = Math.floor(audio.duration)
            var d = Math.floor(c/60)
            
        },
        start: function(){
            this.render();
            this.handleEvent();
            this.defineProperty();
            this.loadCurrentsong();
            this.setbanner();
            progess.value=0;

        }
}
app.start();