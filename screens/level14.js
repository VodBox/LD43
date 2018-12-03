window.level14 = {
    name: "level14",
    load: function() {
        this.level = new PIXI.Container();

        this.loadItems = 4;
        this.loadedItems = 0;

        let bg = new PIXI.Sprite.from("levels/level14BG.png");
        bg.width = w;
        bg.height = h;
        bg._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        bg._texture.baseTexture.screen = this;
        bg._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });

        let fg = new PIXI.Sprite.from("levels/level14FG.png");
        fg.width = w;
        fg.height = h;
        fg._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        fg._texture.baseTexture.screen = this;
        fg._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });

        let roof = new PIXI.Graphics();
        roof.beginFill(0x990000, 1);
        roof.drawRect(0, 0, w, h/10);
        roof.endFill();

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, 0, h/10, h);
        wall1.endFill();

        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(w-h/10, 0, h/10, h/2);
        wall2.endFill();

        let floor = new PIXI.Graphics();
        floor.beginFill(0x990000, 1);
        floor.drawRect(0, h*9/10, w, h/10);
        floor.endFill();

        this.doorTrigger = new PIXI.Graphics();
        this.doorTrigger.beginFill(0xFFAA00, 1);
        this.doorTrigger.drawRect(h*2/10, h*7/10, h/10, h/10);
        this.doorTrigger.endFill();

        this.collisionSurfaces = [
            roof,
            wall1,
            wall2,
            floor
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(roof);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(floor);
        this.level.addChild(this.doorTrigger);
        this.level.addChild(fg);

        this.adj = [
            {
                level: window.level13,
                box: [w-h/40, h/2, h/20, h/2],
                offset: [-w*37/40, -h/2+h/10]
            }
        ];

        this.level.interactive = true;
        this.level.click = function(e) {
            for(let i = 0, l = this.adj.length; i < l; ++i) {
                let adj = this.adj[i];
                if(e.data.global.x > adj.box[0]
                    && e.data.global.x < adj.box[0] + adj.box[2]
                    && e.data.global.y > adj.box[1]
                    && e.data.global.y < adj.box[1] + adj.box[3]) {
                    stage.loadScreen = levels[adj.level.name];
                }
            }
        };
        this.level.adj = this.adj;

        this.loaded = false;
        this.doorUnlocked = false;

        this.rope = createItem("rope.png", function(char) {
            climbables.push(this.ropeRepeat);
            stage.addChild(this.ropeRepeat);
            this.ropeRepeat.holder = char;

            this.ropeRepeat.screen = stage.activeScreen.name;
        }, function(char) {
            let hei = char.char.height;
            let inc = h/30;
            let cur = stage.activeScreen;
            let charDir = (char.char.dir ? char.char.width : -char.char.width);
            for(let y = 0; y < 32; ++y) {
                let con = false;
                for(let i = 0, l = cur.collisionSurfaces.length; i < l; ++i) {
                    let surf = cur.collisionSurfaces[i];
                    if(surf.containsPoint({x:char.char.x + charDir,y:char.char.y + hei + inc})
                        || surf.containsPoint({x:char.char.x + charDir * 2, y:char.char.y + hei + inc})) {
                        con = true;
                        break;
                    }
                }
                if(!con) {
                    hei += inc;
                } else {
                    break;
                }
            }
            this.ropeRepeat.x = char.char.x + (char.char.dir ? char.char.width : -char.char.width);
            this.ropeRepeat.y = char.char.y;
            this.ropeRepeat.height = hei;
            this.ropeRepeat._texture.orig.width = char.char.width;
            this.ropeRepeat._texture.orig.height = 64;
            this.ropeRepeat.width = char.char.width;
            this.ropeRepeat.vis = true;
            this.ropeRepeat.offScreen = stage.activeScreen.name;
        }, function(char) {
            climbables.splice(climbables.indexOf(this.ropeRepeat), 1);
            stage.removeChild(this.ropeRepeat);
            this.ropeRepeat.screen = stage.activeScreen.name;
        }, function() {
            this.screen.level.addChild(this.screen.rope);
            ++this.screen.loadedItems;

            let ropeRepeat = new PIXI.TilingSprite.from("ropeRepeat.png");
            ropeRepeat._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            ropeRepeat._texture.baseTexture.screen = this.screen;
            this.screen.rope.ropeRepeat = ropeRepeat;
            if(!ropeRepeat._texture.baseTexture.valid) {
                ropeRepeat._texture.baseTexture.on('loaded', function() {
                    this.screen.loadedItems++;
                    if(this.screen.loadedItems == this.screen.loadItems) {
                        this.screen.loaded = true;
                    }
                });
            } else {
                if(this.screen.loadedItems == this.screen.loadItems) {
                    this.screen.loaded = true;
                }
            }
        }, this);

        this.rope.x = 400;
        this.rope.y = 500;
        this.rope.width = w/10;
        this.rope.height = w/10;
        this.rope.t = 0;

        return this;
    },
    tick: function() {
        if(this.newGame) {
            this.newGame = false;
            this.startCutscene = true;
            for(let i = 0, l = characters.length; i < l; ++i) {
                characters[i].screen = "level7";
                characters[i].char.x = h*3*(i+1)/20;
                characters[i].char.y = h*7/10;
            }
        } else {
            let c = characters[parNum];
            let s = c.char;
            if(!this.doorUnlocked) {
                if(this.doorTrigger.containsPoint({x: s.x, y: s.y})
                    || this.doorTrigger.containsPoint({x: s.x + s.width, y: s.y})
                    || this.doorTrigger.containsPoint({x: s.x + s.width, y: s.y + s.height-3})
                    || this.doorTrigger.containsPoint({x: s.x, y: s.y + s.height-3})) {
                    this.doorUnlocked = true;

                    let l = levels['level8'];
                    l.level.removeChild(l.door);
                    l.collisionSurfaces.splice(l.collisionSurfaces.indexOf(l.door), 1);

                    this.doorTrigger.alpha = 0;
                }
            }
           if(this.rope) {
               this.rope.t++;
               this.rope.rotation = Math.sin(this.rope.t/60) * 0.2 + 0.1;
               let c = characters[parNum];
               let s = c.char;
               if(!c.holding) {
                   if(this.rope.containsPoint({x: s.x, y: s.y})
                       || this.rope.containsPoint({x: s.x + s.width, y: s.y})
                       || this.rope.containsPoint({x: s.x + s.width, y: s.y + s.height-3})
                       || this.rope.containsPoint({x: s.x, y: s.y + s.height-3})) {

                       this.level.removeChild(this.rope);
                       c.holding = this.rope;
                       this.rope = undefined;

                       itemSound.play();
                   }
               }
           }
        }
    }
};
